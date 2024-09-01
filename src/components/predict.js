import React, { useState } from 'react';
import axios from 'axios';
import Result from './Result';

function PredictForm() {
    const [formData, setFormData] = useState({
        Pregnancies: '',
        Glucose: '',
        BloodPressure: '',
        SkinThickness: '',
        Insulin: '',
        BMI: '',
        DiabetesPedigreeFunction: '',
        Age: ''
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert form data to the correct types
        const formattedData = {
            Pregnancies: parseFloat(formData.Pregnancies) || 0,
            Glucose: parseFloat(formData.Glucose) || 0,
            BloodPressure: parseFloat(formData.BloodPressure) || 0,
            SkinThickness: parseFloat(formData.SkinThickness) || 0,
            Insulin: parseFloat(formData.Insulin) || 0,
            BMI: parseFloat(formData.BMI) || 0,
            DiabetesPedigreeFunction: parseFloat(formData.DiabetesPedigreeFunction) || 0,
            Age: parseInt(formData.Age) || 0
        };

        axios.post('http://127.0.0.1:5000/api/predict', formattedData)
            .then(res => {
                setResult(res.data.prediction);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('An error occurred while making the prediction.');
            });
    };

    return (
        <div>
            <h1>Diabetes Predictor</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map(key => (
                    <div key={key}>
                        <input
                            type="text"
                            name={key}
                            placeholder={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Predict</button>
            </form>

            {/* Display the result or error message */}
            {result !== null && <Result result={result} />}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default PredictForm;
