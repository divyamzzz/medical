from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import traceback

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

@app.route('/api/predict', methods=['POST'])
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

        # Debug: Print the dictionary before prediction
        print("Dictionary for prediction:", dic)

        # Call the predict function
        prediction = predict(input_values, dic)

        # Debug: Print the prediction result
        print("Prediction:", prediction)

        return jsonify({'prediction': int(prediction)})

    except Exception as e:
        # Print the stack trace for debugging
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
