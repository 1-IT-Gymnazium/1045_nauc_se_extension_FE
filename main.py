from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from bs4 import BeautifulSoup
import requests
from db.database import Database

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

db_conn = Database()
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-en-cs")


@app.route("/scrape", methods=["GET"])
def scrape_website():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        text = soup.get_text()
        return jsonify({"text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided."}), 400

    try:
        translated_text = translator(text, max_length=256)[0]["translation_text"]
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/loginuser", methods=["POST"])
def login_user():
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")
    if not name or not password:
        return jsonify({"error": "Username and password required."}), 400
    
    user_exists = db_conn.loginUser(name, password)
    if user_exists:
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid username or password."}), 401

if __name__ == "__main__":
    app.run(debug=True)
