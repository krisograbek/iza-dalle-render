# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()


app = Flask(__name__)
CORS(app)


@app.route("/generate", methods=["POST"])
def generate_images():
    data = request.json
    prompt = data["prompt"]
    print(f"received {prompt}")
    # Here you will integrate with OpenAI API or any other image generation logic.
    # For now, we will just echo back the data received.
    response = {"status": "success", "data": data}
    image = client.images.generate(
        model="dall-e-3", prompt=prompt, n=1, size="1024x1024"
    )
    print(f"Image: {image}")
    return jsonify(image), 200


if __name__ == "__main__":
    app.run(debug=True)
