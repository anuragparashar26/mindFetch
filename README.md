# mindFetch

mindFetch is your personal AI-powered knowledge base. Instantly search your documents and get intelligent answers with privacy and security at the core. Built with a modern React frontend and a Python backend using RAG (Retrieval-Augmented Generation) and FAISS for fast vector search.

---

## Features

- ⚡ **Lightning Fast Search:** Get instant answers from your uploaded documents.
- 🔒 **Secure & Private:** Your data is processed securely and never shared.
- 🤖 **AI-Powered Answers:** Uses advanced language models for high-quality, contextual responses.
- 🆓 **Completely Free Forever:** No credit card or sign up required.
- 🖇️ **No Vendor Lock-in:** Works with your own files, no proprietary formats.

---

## Project Structure

```
knowledge-base/
├── backend/
│   ├── main.py           # FastAPI backend server
│   ├── rag.py            # RAG logic and Gemini API integration
│   ├── requirements.txt  # Python dependencies
│   └── faiss_index/      # FAISS vector index files
├── frontend/
│   ├── package.json      # React app dependencies
│   ├── public/           # Static assets (logos, manifest, etc.)
│   └── src/              # React source code
│       ├── App.js        # Main app and routing
│       ├── pages/        # About, Contact, Privacy, Terms, Security pages
│       └── ...           # Components, styles, tests
└── README.md             # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- Python 3.9+

### 1. Clone the Repository
```bash
git clone https://github.com/anuragparashar26/mindFetch.git
cd mindFetch
```

### 2. Setup the Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Set your Gemini API key
export GEMINI_API_KEY=your_gemini_api_key
python3 main.py
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:8000](http://localhost:8000).

---

## Environment Variables

- `GEMINI_API_KEY` (backend): Your Google Gemini API key for AI-powered answers.

---

## Usage

1. **Upload Documents:** Drag and drop or select files in the workspace.
2. **Ask Questions:** Type natural language questions and get instant answers.
3. **Explore:** Use the About, Contact, Privacy, Terms, and Security pages for more info.

---

## Tech Stack

- **Frontend:** React, CSS Modules
- **Backend:** Python, FastAPI, FAISS, Gemini API
- **Vector Search:** FAISS for fast similarity search
- **AI Model:** Google Gemini (configurable)

---

## License

This project is licensed under the MIT License.

---

## Contact

- Email: anuragp5025@gmail.com 
- Website: [mindFetch](https://index.anuragparashar.tech)
