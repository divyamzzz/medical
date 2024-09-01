import React, { useState } from 'react';
import axios from 'axios';

function MalariaPredictor() {
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

        axios.post('http://127.0.0.1:5000/api/malariapredict', formData, {
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

    const renderResult = () => {
        if (result === 1) {
            return (
                <div className="treatment-plan">
                    <h3 style={{ color: 'black' }}>Treatment Plan for Malaria</h3>
                    <ul>
                        <li>Consult a healthcare provider immediately for proper diagnosis and treatment.</li>
                        <li>Antimalarial medications such as chloroquine, artemisinin-based combination therapies (ACTs), or other prescribed drugs should be taken as directed.</li>
                        <li>Stay hydrated and rest to help the body recover.</li>
                        <li>Monitor symptoms and report any worsening conditions to your healthcare provider.</li>
                        <li>Prevent mosquito bites by using mosquito nets, repellents, and staying in screened or air-conditioned areas.</li>
                    </ul>
                </div>
            );
        } else if (result === 0) {
            return <div className="no-disease"><h3>You do not have malaria.</h3></div>;
        }
    };

    return (
        <div className="container">
            <div className="row" style={{ marginBottom: '300px' }}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <center><h1>Malaria Predictor</h1></center>
                    <div className="card card-body">
                        <center><h3>Please upload the cell image</h3></center>
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
                        {result !== null && renderResult()}
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default MalariaPredictor;
