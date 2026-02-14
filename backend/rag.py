import os
from typing import List

import google.generativeai as genai
import numpy as np
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.embeddings import Embeddings

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")
GEMINI_EMBED_MODEL = os.getenv("GEMINI_EMBED_MODEL", "models/gemini-embedding-001")


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

def create_vector_store(file_path):
    loader = PyPDFLoader(file_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = splitter.split_documents(docs)

    vectorstore = FAISS.from_documents(chunks, embeddings)
    vectorstore.save_local("faiss_index")
    return vectorstore


def load_vector_store():
    return FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)


def ask_question(question):
    vectorstore = load_vector_store()
    retriever = vectorstore.as_retriever()

    # NEW API
    docs = retriever.invoke(question)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
    Answer based only on this context:
    {context}

    Question: {question}
    """

    model = _get_gemini_model()
    response = model.generate_content(prompt)
    answer = response.text if getattr(response, "text", None) else "No answer generated."
    return answer, docs

