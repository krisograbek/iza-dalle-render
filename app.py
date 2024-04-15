import os
import json
import base64
from datetime import datetime, date
from io import BytesIO
from PIL import Image

from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

app = Flask(__name__)
CORS(app)

IMAGES_DIR = "images"
DATA_DIR = "data"

DYNAMIC_FOLDER = os.path.join(os.getcwd(), IMAGES_DIR)
DYNAMIC_FOLDER_DATA = os.path.join(os.getcwd(), DATA_DIR)


def save_prompt_and_url_to_json(revised_prompt, image_url):
    # Define the file path for storing JSON data
    file_name = f"{date.today().isoformat()}_images_prompts.json"
    file_path = os.path.join(DYNAMIC_FOLDER_DATA, file_name)

    data = {"revised_prompt": revised_prompt, "image_url": image_url}

    # Check if the file for today already exists and load its content if it does
    if os.path.exists(file_path):
        with open(file_path, "r+") as file:
            try:
                existing_data = json.load(file)
                # Append new data to the existing list
                existing_data.append(data)
                # Seek to the start of the file to overwrite
                file.seek(0)
                json.dump(existing_data, file, indent=4)
                file.truncate()  # Truncate file to the current position
            except json.JSONDecodeError:
                # If the file is empty or corrupted, start fresh
                file.seek(0)
                json.dump([data], file, indent=4)
                file.truncate()
    else:
        # Create a new file and write the initial data
        with open(file_path, "w") as file:
            json.dump([data], file, indent=4)


@app.route("/images/<filename>")
def dynamic_image(filename):
    return send_from_directory(DYNAMIC_FOLDER, filename)


@app.route("/generate", methods=["POST"])
def generate_images():
    try:
        # Retrieve prompt from request
        data = request.json
        prompt = data["prompt"]
        quality = "hd" if data["hd"] else "standard"
        aspect_ratio = data["ar"]

        if aspect_ratio == "square":
            image_size = "1024x1024"
        elif aspect_ratio == "vertical":
            image_size = "1024x1792"
        elif aspect_ratio == "horizontal":
            image_size = "1792x1024"
        else:
            image_size = "1024x1024"

        print(f"Prompt: {prompt}")

        # Simulate image generation using client API
        image = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            response_format="b64_json",
            quality=quality,
            size=image_size,
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

        # Update the response to use the new URL
        dynamic_image_url = url_for("dynamic_image", filename=filename)
        # Decode the base64 string to binary data
        image_data = base64.b64decode(image.data[0].b64_json)
        # Use BytesIO to handle the binary stream
        image_stream = BytesIO(image_data)
        # Open the image
        image = Image.open(image_stream)
        # Save the image to disk
        image.save(image_url)

        save_prompt_and_url_to_json(revised_prompt, dynamic_image_url)

        # Return the URL to the image and the revised_prompt
        return (
            jsonify({"url": dynamic_image_url, "revisedPrompt": revised_prompt}),
            200,
        )

    except Exception as e:
        # Handle exceptions such as JSON errors, decoding failures, etc.
        print(str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
