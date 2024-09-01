import React, { useState } from 'react';
import axios from 'axios';

function HeartDiseasePredictor() {
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: ''
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
        axios.post('http://127.0.0.1:5000/api/heartdisease', formData)
            .then(res => {
                setResult(res.data.prediction);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('An error occurred while making the prediction.');
            });
    };

    const getTreatmentPlan = () => {
        return (
            <div className="treatment-plan">
                <h4>Treatment Plan:</h4>
                <ul>
                    <li>Consult with a cardiologist for a detailed evaluation.</li>
                    <li>Consider lifestyle changes such as a balanced diet, regular exercise, and quitting smoking.</li>
                    <li>Medications may be prescribed to manage blood pressure, cholesterol levels, and other risk factors.</li>
                    <li>Follow up with regular check-ups to monitor heart health.</li>
                </ul>
            </div>
        );
    };

    const getNoDiseaseMessage = () => {
        return (
            <div className="no-disease">
                <h4>No disease detected.</h4>
                <p>Keep up with a healthy lifestyle and regular check-ups to maintain good health.</p>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="row" style={{ marginBottom: '72px' }}>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <center><h1>Heart Disease Predictor</h1></center>
                    <div className="card card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="age"
                                            placeholder="Age (in years)"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="sex"
                                            placeholder="Sex (1 = Male; 0 = Female)"
                                            value={formData.sex}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="cp"
                                            placeholder="Chest Pain Type"
                                            value={formData.cp}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="trestbps"
                                            placeholder="Resting Blood Pressure (in mm Hg)"
                                            value={formData.trestbps}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="chol"
                                            placeholder="Serum Cholesterol (in mg/dl)"
                                            value={formData.chol}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="fbs"
                                            placeholder="Fasting Blood Sugar > 120 mg/dl (1 = True; 0 = False)"
                                            value={formData.fbs}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="restecg"
                                            placeholder="Resting Electrocardiograph Results"
                                            value={formData.restecg}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="thalach"
                                            placeholder="Maximum Heart Rate Achieved"
                                            value={formData.thalach}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="exang"
                                            placeholder="Exercise Induced Angina (1 = Yes; 0 = No)"
                                            value={formData.exang}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="oldpeak"
                                            placeholder="ST Depression Induced by Exercise Relative to Rest"
                                            value={formData.oldpeak}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="slope"
                                            placeholder="The Slope of the Peak Exercise ST Segment"
                                            value={formData.slope}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="ca"
                                            placeholder="Number of Major Vessels (0-3) Colored by Fluoroscopy"
                                            value={formData.ca}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="thal"
                                            placeholder="Thal: 1 = Normal; 2 = Fixed Defect; 3 = Reversible Defect"
                                            value={formData.thal}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <input type="submit" className="btn btn-info btn-block" value="Predict" />
                        </form>
                        {result !== null && (
                            <div className="result">
                                <h3>Prediction: {result}</h3>
                                {result === 1 ? getTreatmentPlan() : getNoDiseaseMessage()}
                            </div>
                        )}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}

export default HeartDiseasePredictor;
