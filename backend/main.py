from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import json

app = FastAPI(title="House Price Prediction API")

# السماح للفرونت إند بالاتصال بالسيرفر (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# تحميل الموديل والمناطق عند بداية التشغيل
model = joblib.load("house_price.pkl")
with open("locations.json", "r") as f:
    allowed_locations = json.load(f)


# تحديد شكل البيانات المستقبلة
class PropertyInput(BaseModel):
    carpet_area_sqft: float
    floor_num: float
    bathroom: float
    balcony: float
    location_grouped: str
    Furnishing: str = "Unfurnished"
    Transaction: str = "Resale"
    Ownership: str = "Freehold"
    facing: str = "East"


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/locations")
def get_locations():
    return {"locations": allowed_locations}


@app.post("/predict")
def predict_price(data: PropertyInput):
    try:
        # تحويل البيانات القادمة إلى DataFrame
        input_data = pd.DataFrame([data.dict()])

        # التوقع
        prediction = model.predict(input_data)[0]

        return {"predicted_price": round(float(prediction), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
