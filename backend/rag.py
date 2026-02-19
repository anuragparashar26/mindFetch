import os
import shutil
from typing import List

import google.generativeai as genai
import numpy as np
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.embeddings import Embeddings
from langchain_core.documents import Document

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
GEMINI_EMBED_MODEL = os.getenv("GEMINI_EMBED_MODEL", "models/gemini-embedding-001")
FAISS_INDEX_BASE = "faiss_index"


def _configure_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set")
    genai.configure(api_key=api_key)


class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        _configure_gemini()
        vectors = []
        for text in texts:
            response = genai.embed_content(
                model=GEMINI_EMBED_MODEL,
                content=text,
                task_type="retrieval_document",
            )
            arr = np.array(response["embedding"], dtype=np.float32)
            vectors.append(arr)
        return vectors

    def embed_query(self, text: str) -> List[float]:
        _configure_gemini()
        response = genai.embed_content(
            model=GEMINI_EMBED_MODEL,
            content=text,
            task_type="retrieval_query",
        )
        return np.array(response["embedding"], dtype=np.float32)


embeddings = GeminiEmbeddings()

def _get_gemini_model():
    _configure_gemini()
    return genai.GenerativeModel(GEMINI_MODEL)

def _index_path(session_id: str) -> str:
    """Return the directory path for a session's FAISS index."""
    return os.path.join(FAISS_INDEX_BASE, session_id)

def create_vector_store(file_path: str, session_id: str):
    loader = PyPDFLoader(file_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = splitter.split_documents(docs)

    vectorstore = FAISS.from_documents(chunks, embeddings)
    index_dir = _index_path(session_id)
    os.makedirs(index_dir, exist_ok=True)
    vectorstore.save_local(index_dir)
    return vectorstore


def create_vector_store_from_text(text: str, metadata: dict = None, session_id: str = None):
    """Create a vector store from plain text content (e.g., blog article)."""
    if metadata is None:
        metadata = {}
    if not session_id:
        raise ValueError("session_id is required")

    doc = Document(page_content=text, metadata=metadata)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = splitter.split_documents([doc])

    vectorstore = FAISS.from_documents(chunks, embeddings)
    index_dir = _index_path(session_id)
    os.makedirs(index_dir, exist_ok=True)
    vectorstore.save_local(index_dir)
    return vectorstore


def load_vector_store(session_id: str):
    index_dir = _index_path(session_id)
    if not os.path.exists(index_dir):
        return None
    return FAISS.load_local(index_dir, embeddings, allow_dangerous_deserialization=True)


def delete_vector_store(session_id: str):
    """Remove the FAISS index directory for a session."""
    index_dir = _index_path(session_id)
    if os.path.exists(index_dir):
        import shutil
        shutil.rmtree(index_dir)


def ask_question(question: str, session_id: str):
    vectorstore = load_vector_store(session_id)

    if vectorstore is None:
        return (
            "No document has been uploaded for this chat session. "
            "Please upload a document first.",
            [],
        )

    retriever = vectorstore.as_retriever()
    docs = retriever.invoke(question)

    context = "\n\n".join([doc.page_content for doc in docs])

    if not context.strip():
        return "I don't have enough information to answer that question.", []

    prompt = f"""
    Answer based only on this context:
    {context}

    Question: {question}
    """

    model = _get_gemini_model()
    response = model.generate_content(prompt)
    answer = response.text if getattr(response, "text", None) else "No answer generated."
    return answer, docs
