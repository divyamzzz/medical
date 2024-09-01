import React, { useState } from 'react';
import axios from 'axios';

function LiverDiseasePredictor() {
    const [formData, setFormData] = useState({
        Age: '',
        Gender: '',
        Total_Bilirubin: '',
        Direct_Bilirubin: '',
        Alkaline_Phosphotase: '',
        Alamine_Aminotransferase: '',
        Aspartate_Aminotransferase: '',
        Total_Protiens: '',
        Albumin: '',
        Albumin_and_Globulin_Ratio: ''
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
        axios.post('http://127.0.0.1:5000/api/liverdisease', formData)
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
                    <li>Consult with a healthcare provider for a comprehensive evaluation and treatment plan.</li>
                    <li>Medication may be prescribed depending on the specific liver condition.</li>
                    <li>Adopt a healthy diet and avoid alcohol to support liver health.</li>
                    <li>Regular monitoring of liver function through follow-up tests is essential.</li>
                    <li>In some cases, additional imaging or biopsy may be needed for further assessment.</li>
                </ul>
            </div>
        );
    };

    const getNoDiseaseMessage = () => {
        return (
            <div className="no-disease">
                <h4>No liver disease detected.</h4>
                <p>Maintain a healthy lifestyle and schedule regular health check-ups to ensure ongoing liver health.</p>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="row" style={{ marginBottom: '180px' }}>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <center><h1>Liver Disease Predictor</h1></center>
                    <div className="card card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Age"
                                            placeholder="Age (in years)"
                                            value={formData.Age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Gender"
                                            placeholder="Gender (0: Male; 1: Female)"
                                            value={formData.Gender}
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
                                            name="Total_Bilirubin"
                                            placeholder="Total Bilirubin (in mg/dL)"
                                            value={formData.Total_Bilirubin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Direct_Bilirubin"
                                            placeholder="Conjugated Bilirubin (in mg/dL)"
                                            value={formData.Direct_Bilirubin}
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
                                            name="Alkaline_Phosphotase"
                                            placeholder="Alkaline Phosphatase (in IU/L)"
                                            value={formData.Alkaline_Phosphotase}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Alamine_Aminotransferase"
                                            placeholder="Alamine Aminotransferase (in IU/L)"
                                            value={formData.Alamine_Aminotransferase}
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
                                            name="Aspartate_Aminotransferase"
                                            placeholder="Aspartate Aminotransferase (in IU/L)"
                                            value={formData.Aspartate_Aminotransferase}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Total_Protiens"
                                            placeholder="Total Proteins (in g/dL)"
                                            value={formData.Total_Protiens}
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
                                            name="Albumin"
                                            placeholder="Albumin (in g/dL)"
                                            value={formData.Albumin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Albumin_and_Globulin_Ratio"
                                            placeholder="Albumin and Globulin Ratio"
                                            value={formData.Albumin_and_Globulin_Ratio}
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
                                {result === "positive" ? getTreatmentPlan() : getNoDiseaseMessage()}
                            </div>
                        )}
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}

export default LiverDiseasePredictor;
