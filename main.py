from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from bs4 import BeautifulSoup


class Connection:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

        self.translator = pipeline("translation", model="Helsinki-NLP/opus-mt-en-cs")

    def scrape(self):
        @self.app.route("/scrape", methods=["GET"])
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

    # Translation route to translate the given text
    def translation(self):
        @self.app.route("/translate", methods=["POST"])
        def translation_conn():
            # Get the JSON data from the POST request
            data = request.get_json()
            text = data.get("text", "")

            # Check if text was provided
            if not text:
                return jsonify({"error": "No text provided."}), 400

            try:
                # Perform the translation using the translator pipeline
                translated_text = self.translator(text, max_length=400)[0]["translation_text"]
                return jsonify({"translated_text": translated_text})
            except Exception as e:
                return jsonify({"error": str(e)}), 500

        # def url_proccess(self):
        #     @self.app.route("/url_proccess", methods=["POST"])
        #     def get_url_website():
        #         data = request.get_json()  # Parse JSON data sent by React
        #         url = data.get("text")     # Extract the "text" field from the JSON body
        #         if not url:
        #             return jsonify({"error": "No URL provided"}), 400
                
        #         # Process the URL (here we just return it as an example)
        #         return jsonify({"processed_url": url})

    # Run the Flask application
    def run(self):
        self.app.run(debug=True)


if __name__ == "__main__":
    app = Connection()
    app.scrape()
    app.translation() 
    app.run()


