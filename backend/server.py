from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib


app = Flask(__name__)
CORS(app) 
model = joblib.load("graduate_admission_model.joblib")  

@app.route("/")
def home():
    return "Server is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    gre = data["gre"]
    toefl = data["toefl"]
    uniRating = data["uni_rating"]
    lor = data["lor"]
    sop = data["sop"]
    cgpa = data["cgpa"]
    research = data["research"]

    features = [[gre, toefl, uniRating, sop, lor, cgpa, research]]

    prediction = model.predict(features)  
    return jsonify({"admission_chance": float(prediction[0])})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)



