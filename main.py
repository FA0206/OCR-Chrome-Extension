from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import pytesseract
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/items")
def read_item(q: str = None):
    return {"q": q}

@app.post("/uploadfiles/")
async def upload_files(files: List[UploadFile] = File(...)):
    return {"file_names": [file.filename for file in files]}

@app.post("/ocr/")
async def ocr(file: UploadFile = File(...)):
    content = await file.read()
    image = Image.open(io.BytesIO(content))
    text = pytesseract.image_to_string(image)
    return {"text": text}



