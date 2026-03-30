from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid
from rag import create_vector_store, create_vector_store_from_text, ask_question, delete_vector_store

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
def root():
    return {"message": "Backend is running"}

@app.post("/upload")                                                                                        
async def upload_file(file: UploadFile = File(...), session_id: str = Form(...)):
    import os
    upload_dir = "/tmp"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, f"temp_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    create_vector_store(file_path, session_id)
    return {"message": "File processed successfully", "session_id": session_id}


@app.post("/upload-article")
async def upload_article(data: dict):
    """Accept article content from blog for RAG processing"""
    article_text = data.get("content", "")
    article_title = data.get("title", "Untitled Article")
    article_slug = data.get("slug", "")
    session_id = data.get("session_id") or uuid.uuid4().hex

    if not article_text.strip():
        raise HTTPException(status_code=400, detail="No content provided")

    metadata = {
        "source": "blog_article",
        "title": article_title,
        "slug": article_slug
    }

    create_vector_store_from_text(article_text, metadata, session_id)
    return {
        "message": "Article processed successfully",
        "title": article_title,
        "session_id": session_id,
    }


@app.post("/ask")
async def ask(data: dict):
    question = data.get("question", "").strip()
    session_id = data.get("session_id")

    if not question:
        raise HTTPException(status_code=400, detail="question is required")

    if not session_id:
        return {"answer": "No session provided. Please upload a document first.", "sources": []}

    answer, docs = ask_question(question, session_id)
    sources = [doc.metadata for doc in docs]

    return {
        "answer": answer,
        "sources": sources,
    }


@app.delete("/session/{session_id}")
async def delete_session(session_id: str):
    """Delete the FAISS index for a given session."""
    delete_vector_store(session_id)
    return {"message": f"Session {session_id} deleted"}
