import React, { useState } from 'react';
import axios from 'axios';

function PneumoniaPredictor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('http://127.0.0.1:5000/api/pneumoniapredict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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
                    <li>Consult with a healthcare provider for a detailed evaluation and treatment plan.</li>
                    <li>Antibiotics or antiviral medications may be prescribed based on the cause of pneumonia.</li>
                    <li>Rest and hydration are crucial for recovery.</li>
                    <li>Follow up with a healthcare provider to monitor recovery progress.</li>
                    <li>Consider vaccination to prevent future cases, if applicable.</li>
                </ul>
            </div>
        );
    };

    const getNoDiseaseMessage = () => {
        return (
            <div className="no-disease">
                <h4>No pneumonia detected.</h4>
                <p>Continue to maintain good respiratory health and follow regular check-ups.</p>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="row" style={{ marginBottom: '300px' }}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <center><h1>Pneumonia Predictor</h1></center>
                    <div className="card card-body">
                        <center><h3>Please upload the X-Ray of the person</h3></center>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <center>
                                <input
                                    type="file"
                                    id="fileInput"
                                    name="image"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="fileInput">Upload Image</label>
                                <br />
                                <br />
                                {imagePreview && (
                                    <img
                                        className="img-fluid"
                                        id="blah"
                                        src={imagePreview}
                                        alt="Uploaded image will appear here"
                                        style={{ width: '500px', height: '500px' }}
                                    />
                                )}
                                <br />
                                <br />
                                <input
                                    className="btn btn-info"
                                    type="submit"
                                    value="Predict"
                                />
                            </center>
                        </form>
                        {result !== null && (
                            <div className="result">
                                <h3>Prediction: {result}</h3>
                                {result === "positive" ? getTreatmentPlan() : getNoDiseaseMessage()}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default PneumoniaPredictor;
