import os
import base64
from datetime import datetime
from io import BytesIO
from PIL import Image

from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

app = Flask(__name__)
CORS(app)

IMAGES_DIR = "./images"


@app.route("/generate", methods=["POST"])
def generate_images():
    try:
        # Retrieve prompt from request
        data = request.json
        prompt = data["prompt"]

        # Simulate image generation using client API
        image = client.images.generate(
            model="dall-e-3", prompt=prompt, response_format="b64_json"
        )
        revised_prompt = image.data[0].revised_prompt

        # print(f"Revised: {revised_prompt}")

        # Generate a unique filename for the image
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        prompt_snippet = "".join(
            filter(str.isalnum, prompt[-10:])
        )  # clean and truncate prompt
        filename = f"{timestamp}_{prompt_snippet}.png"
        image_url = os.path.join(IMAGES_DIR, filename)

        # Decode the base64 string to binary data
        image_data = base64.b64decode(image.data[0].b64_json)

        # Use BytesIO to handle the binary stream
        image_stream = BytesIO(image_data)

        # Open the image
        image = Image.open(image_stream)

        # Save the image to disk
        image.save(image_url)

        # Return the URL to the image and the revised_prompt
        return jsonify({"image_url": image_url, "revised_prompt": revised_prompt}), 200

    except Exception as e:
        # Handle exceptions such as JSON errors, decoding failures, etc.
        print(str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
