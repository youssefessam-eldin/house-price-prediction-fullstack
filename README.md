# 🏡 House Price Prediction - Full Stack ML Application

A full-stack Machine Learning web application designed to predict house prices based on various structural and locational features.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, JavaScript
- **Backend:** FastAPI, Python, Uvicorn, Pydantic
- **Machine Learning:** Scikit-Learn, Pandas, Joblib (Random Forest Model)

## 📁 Project Structure

```text
project/
├── backend/            # FastAPI server & ML Model
│   ├── main.py
│   ├── house_price.pkl
│   ├── locations.json
│   └── requirements.txt
│
└── frontend/           # React App (Vite UI)
    └── src/
        └── App.jsx

## 💾 Dataset & Model File
Due to GitHub file size limits (> 50 MB), the raw dataset (`house_prices.csv`) and model (`house_price.pkl`) are not committed. 
- You can generate the `.pkl` file by running the Jupyter notebook inside `notebooks/`.