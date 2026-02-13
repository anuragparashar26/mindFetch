from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
from rag import create_vector_store, ask_question

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
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    create_vector_store(file_path)
    return {"message": "File processed successfully"}


@app.post("/ask")
async def ask(data: dict):
    question = data["question"]
    answer, docs = ask_question(question)

    sources = [doc.metadata for doc in docs]

    return {
        "answer": answer,
        "sources": sources
    }
