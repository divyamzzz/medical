import React, { useState } from 'react';
import axios from 'axios';

function BreastCancerPredictor() {
    const [formData, setFormData] = useState({
        texture_mean: '',
        smoothness_mean: '',
        compactness_mean: '',
        concave_points_mean: '',
        symmetry_mean: '',
        fractal_dimension_mean: '',
        texture_se: '',
        area_se: '',
        smoothness_se: '',
        compactness_se: '',
        concavity_se: '',
        concave_points_se: '',
        symmetry_se: '',
        fractal_dimension_se: '',
        texture_worst: '',
        area_worst: '',
        smoothness_worst: '',
        compactness_worst: '',
        concavity_worst: '',
        concave_points_worst: '',
        symmetry_worst: '',
        fractal_dimension_worst: ''
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
        axios.post('http://127.0.0.1:5000/api/breastcancer', formData)
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
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <center><h1>Breast Cancer Predictor</h1></center>
                    <div className="card card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Form fields */}
                            <div className="row">
                                {Object.keys(formData).slice(0, 6).map(key => (
                                    <div className="col-md-4" key={key}>
                                        <div className="form-group">
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name={key} 
                                                placeholder={key.replace(/_/g, ' ')} 
                                                value={formData[key]} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                {Object.keys(formData).slice(6, 12).map(key => (
                                    <div className="col-md-4" key={key}>
                                        <div className="form-group">
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name={key} 
                                                placeholder={key.replace(/_/g, ' ')} 
                                                value={formData[key]} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                {Object.keys(formData).slice(12, 18).map(key => (
                                    <div className="col-md-4" key={key}>
                                        <div className="form-group">
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name={key} 
                                                placeholder={key.replace(/_/g, ' ')} 
                                                value={formData[key]} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                {Object.keys(formData).slice(18, 21).map(key => (
                                    <div className="col-md-4" key={key}>
                                        <div className="form-group">
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name={key} 
                                                placeholder={key.replace(/_/g, ' ')} 
                                                value={formData[key]} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            name="fractal_dimension_worst" 
                                            placeholder="Fractal Dimension Worst" 
                                            value={formData['fractal_dimension_worst']} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <input type="submit" className="btn btn-info btn-block" value="Predict" />
                        </form>
                        {result !== null && (
                            <div className="result">
                                {result === 1 ? (
                                    <div>
                                        <h3>Prediction: Positive for Breast Cancer</h3>
                                        <p>Treatment Plan: You may need to consult with an oncologist for further evaluation and treatment options, which could include surgery, radiation, chemotherapy, or other targeted therapies.</p>
                                    </div>
                                ) : (
                                    <h3>Prediction: You do not have the disease</h3>
                                )}
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

export default BreastCancerPredictor;
