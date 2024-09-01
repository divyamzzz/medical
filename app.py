from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import traceback
import os
from PIL import Image
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

def predict(values, dic):
    # diabetes
    if len(values) == 8:
        dic2 = {
            'NewBMI_Obesity 1': 0, 'NewBMI_Obesity 2': 0, 'NewBMI_Obesity 3': 0,
            'NewBMI_Overweight': 0, 'NewBMI_Underweight': 0, 'NewInsulinScore_Normal': 0,
            'NewGlucose_Low': 0, 'NewGlucose_Normal': 0, 'NewGlucose_Overweight': 0,
            'NewGlucose_Secret': 0
        }
        dic = {key: float(value) for key, value in dic.items()}
        if dic['BMI'] <= 18.5:
            dic2['NewBMI_Underweight'] = 1
        elif 18.5 < dic['BMI'] <= 24.9:
            pass
        elif 24.9 < dic['BMI'] <= 29.9:
            dic2['NewBMI_Overweight'] = 1
        elif 29.9 < dic['BMI'] <= 34.9:
            dic2['NewBMI_Obesity 1'] = 1
        elif 34.9 < dic['BMI'] <= 39.9:
            dic2['NewBMI_Obesity 2'] = 1
        elif dic['BMI'] > 39.9:
            dic2['NewBMI_Obesity 3'] = 1

        if 16 <= dic['Insulin'] <= 166:
            dic2['NewInsulinScore_Normal'] = 1

        if dic['Glucose'] <= 70:
            dic2['NewGlucose_Low'] = 1
        elif 70 < dic['Glucose'] <= 99:
            dic2['NewGlucose_Normal'] = 1
        elif 99 < dic['Glucose'] <= 126:
            dic2['NewGlucose_Overweight'] = 1
        elif dic['Glucose'] > 126:
            dic2['NewGlucose_Secret'] = 1

        dic.update(dic2)
        values2 = list(map(float, list(dic.values())))

        model = pickle.load(open('diabetes.pkl', 'rb'))
        values = np.asarray(values2)
        return model.predict(values.reshape(1, -1))[0]
    
    elif len(values) == 22:
        model = pickle.load(open('models/breast_cancer.pkl','rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]

    # heart disease
    elif len(values) == 13:
        model = pickle.load(open('models/heart.pkl','rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]

    # kidney disease
    elif len(values) == 24:
        model = pickle.load(open('models/kidney.pkl','rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]

    # liver disease
    elif len(values) == 10:
        model = pickle.load(open('models/liver.pkl','rb'))
        values = np.asarray(values)
        return model.predict(values.reshape(1, -1))[0]

@app.route('/api/diabetese', methods=['POST'])
def predict_route():
    try:
        data = request.get_json(force=True)

        # Debug: Print incoming data
        print("Received data:", data)

        # Extract input values from the request
        input_values = [
            data.get('Pregnancies', 0),
            data.get('Glucose', 0),
            data.get('BloodPressure', 0),
            data.get('SkinThickness', 0),
            data.get('Insulin', 0),
            data.get('BMI', 0),
            data.get('DiabetesPedigreeFunction', 0),
            data.get('Age', 0)
        ]

        # Debug: Print extracted values
        print("Input values:", input_values)

        # Ensure all necessary fields are in the dictionary
        dic = {
            'Pregnancies': input_values[0],
            'Glucose': input_values[1],
            'BloodPressure': input_values[2],
            'SkinThickness': input_values[3],
            'Insulin': input_values[4],
            'BMI': input_values[5],
            'DiabetesPedigreeFunction': input_values[6],
            'Age': input_values[7]
        }

        # Call the predict function
        prediction = predict(input_values, dic)

        return jsonify({'prediction': int(prediction)})

    except Exception as e:
        # Print the stack trace for debugging
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/breastcancer', methods=['POST'])
def predict_breast_cancer():
    data = request.json

    # Validate data (all necessary fields are present)
    required_fields = [
        'texture_mean', 'smoothness_mean', 'compactness_mean', 'concave_points_mean', 
        'symmetry_mean', 'fractal_dimension_mean', 'texture_se', 'area_se', 'smoothness_se', 
        'compactness_se', 'concavity_se', 'concave_points_se', 'symmetry_se', 'fractal_dimension_se', 
        'texture_worst', 'area_worst', 'smoothness_worst', 'compactness_worst', 
        'concavity_worst', 'concave_points_worst', 'symmetry_worst', 'fractal_dimension_worst'
    ]
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Invalid data'}), 400

    try:
        # Convert incoming JSON data to the required format (floats)
        formatted_data = {key: float(value) for key, value in data.items()}
        to_predict_list = list(formatted_data.values())
        pred = predict(to_predict_list, formatted_data)
        
        return jsonify({'prediction': int(pred)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/heartdisease', methods=['POST'])
def predict_heart_disease():
    data = request.json

    required_fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
                       'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Invalid data'}), 400

    try:
        formatted_data = {key: float(value) for key, value in data.items()}
        to_predict_list = list(formatted_data.values())
        pred = predict(to_predict_list, formatted_data)
        
        return jsonify({'prediction': int(pred)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/kidneydisease', methods=['POST'])
def predict_kidney_disease():
    data = request.json

    required_fields = [
        'age', 'blood_pressure', 'specific_gravity', 'albumin', 'sugar', 
        'red_blood_cells', 'pus_cell', 'pus_cell_clumps', 'bacteria', 
        'blood_glucose_random', 'blood_urea', 'serum_creatinine', 'sodium', 
        'potassium', 'haemoglobin', 'packed_cell_volume', 
        'white_blood_cell_count', 'red_blood_cell_count', 'hypertension', 
        'diabetes_mellitus', 'coronary_artery_disease', 'appetite', 
        'peda_edema', 'aanemia'
    ]

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Invalid data'}), 400

    try:
        formatted_data = {key: float(value) for key, value in data.items()}
        to_predict_list = list(formatted_data.values())
        pred = predict(to_predict_list, formatted_data)
        
        return jsonify({'prediction': int(pred)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/liverdisease', methods=['POST'])
def predict_liver_disease():
    data = request.json

    required_fields = [
        'Age', 'Gender', 'Total_Bilirubin', 'Direct_Bilirubin', 
        'Alkaline_Phosphotase', 'Alamine_Aminotransferase', 
        'Aspartate_Aminotransferase', 'Total_Protiens', 
        'Albumin', 'Albumin_and_Globulin_Ratio'
    ]

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Invalid data'}), 400

    try:
        formatted_data = {key: float(value) for key, value in data.items()}
        to_predict_list = list(formatted_data.values())
        pred = predict(to_predict_list, formatted_data)
        
        return jsonify({'prediction': int(pred)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/malariapredict', methods=['POST'])
def malariapredictPage():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided.'}), 400

        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({'error': 'No image selected for uploading.'}), 400

        img = Image.open(image_file)
        img.save("uploads/image.jpg")
        img_path = os.path.join(os.path.dirname(__file__), 'uploads/image.jpg')
        
        if os.path.isfile(img_path):
            # Preprocess the image
            img = tf.keras.utils.load_img(img_path, target_size=(128, 128))
            img = tf.keras.utils.img_to_array(img)
            img = np.expand_dims(img, axis=0)

            # Load the model and make predictions
            model = tf.keras.models.load_model("models/malaria.keras")
            pred = np.argmax(model.predict(img))
            return jsonify({'prediction': int(pred)})

        else:
            return jsonify({'error': 'Image file could not be found.'}), 400

    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}. Please upload a valid image."}), 500
    
@app.route('/api/pneumoniapredict', methods=['POST'])
def pneumoniapredictPage():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided.'}), 400

        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({'error': 'No image selected for uploading.'}), 400

        img = Image.open(image_file).convert('L')
        img.save("uploads/image.jpg")
        img_path = os.path.join(os.path.dirname(__file__), 'uploads/image.jpg')

        if os.path.isfile(img_path):
            # Preprocess the image
            img = tf.keras.utils.load_img(img_path, target_size=(128, 128))
            img = tf.keras.utils.img_to_array(img)
            img = np.expand_dims(img, axis=0)

            # Load the model and make predictions
            model = tf.keras.models.load_model("models/pneumonia.keras")
            pred = np.argmax(model.predict(img))
            return jsonify({'prediction': int(pred)})

        else:
            return jsonify({'error': 'Image file could not be found.'}), 400

    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}. Please upload a valid image."}), 500

if __name__ == "__main__":
    app.run(debug=True)
