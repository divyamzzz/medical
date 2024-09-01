import React, { useState } from 'react';
import axios from 'axios';

function DiabetesPredictor() {
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
        axios.post('http://127.0.0.1:5000/api/diabetese', formData)
            .then(res => {
                setResult(res.data.prediction);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('An error occurred while making the prediction.');
            });
    };

    const renderResult = () => {
        if (result === 1) {
            return (
                <div className="treatment-plan">
                    <h2 style={{ color: 'black' }}>Treatment Plan for Diabetes</h2>
                    <ul>
                        <li>Maintain a healthy diet with low sugar and low carbs.</li>
                        <li>Engage in regular physical activity.</li>
                        <li>Monitor your blood sugar levels regularly.</li>
                        <li>Take prescribed medications as directed by your doctor.</li>
                        <li>Regularly consult with your healthcare provider.</li>
                    </ul>
                </div>
            );
        } else if (result === 0) {
            return <div className="no-disease">You do not have diabetes.</div>;
        }
    };
    return (
        <div className="container">
            <h1>Diabetes Predictor</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map(key => (
                    <div key={key} className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            name={key} 
                            placeholder={key.replace(/_/g, ' ')} 
                            value={formData[key]} 
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Predict</button>
            </form>
            {result !== null && renderResult()}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default DiabetesPredictor;
