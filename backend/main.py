from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
from rag import create_vector_store, create_vector_store_from_text, ask_question

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    import os
    upload_dir = "/tmp"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, f"temp_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    create_vector_store(file_path)
    return {"message": "File processed successfully"}


@app.post("/upload-article")
async def upload_article(data: dict):
    """Accept article content from blog for RAG processing"""
    article_text = data.get("content", "")
    article_title = data.get("title", "Untitled Article")
    article_slug = data.get("slug", "")
    
    if not article_text:
        return {"error": "No content provided"}, 400
    
    metadata = {
        "source": "blog_article",
        "title": article_title,
        "slug": article_slug
    }
    
    create_vector_store_from_text(article_text, metadata)
    return {
        "message": "Article processed successfully",
        "title": article_title
    }


@app.post("/ask")
async def ask(data: dict):
    question = data["question"]
    answer, docs = ask_question(question)

    sources = [doc.metadata for doc in docs]

    return {
        "answer": answer,
        "sources": sources
    }
