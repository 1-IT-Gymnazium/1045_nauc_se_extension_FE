from flask import Flask, request, jsonify
from transformers import pipeline

class Connection:

    def __init__(self):
        self.app = Flask(__name__)
        self.translator = pipeline("translation", model="Helsinki-NLP/opus-mt-en-cs")

    def translation(self):
        @self.app.route("/translate", methods=["POST"])
        def translationConn():
            data = request.get_json()
            text = data.get('text', '')

            if not text:
                return jsonify({"error": "No text provided."}), 400

            translated_text = self.translator(text, max_length=400)[0]['translation_text']
            return jsonify({"translated_text": translated_text})

    def run(self):
        self.app.run(debug=True)


if __name__ == '__main__':
    app = Connection()
    app.translation()
    app.run()

