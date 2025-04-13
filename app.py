from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import numpy as np
from tensorflow import keras
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

model = keras.models.load_model('model.h5')

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    prediction = model.predict(img_array)[0][0]

    print(f"[DEBUG] Nilai prediksi (probabilitas): {prediction:.4f}")

    label = "Judol" if prediction < 0.4 else "Bukan Judol"
    return label, float(prediction)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files.get('image')
        if file:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            result, threshold = predict_image(filepath)
            return render_template(
                'index.html',
                result=result,
                threshold=threshold,
                image_url=filename if result == "Bukan Judol" else None
            )

    return render_template('index.html', result=None)

if __name__ == '__main__':
    app.run(debug=True)
