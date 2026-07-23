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

Due to GitHub file size limits (> 50 MB), the raw dataset and trained model are excluded from the repository.

* 📊 **Dataset Source:** You can download the original dataset from [Kaggle - House Price Dataset](https://www.kaggle.com/datasets/juhibhojani/house-price).
* 🤖 **Model File:** You can regenerate the trained `house_price.pkl` model file by running the Jupyter notebook inside the `notebooks/` directory.