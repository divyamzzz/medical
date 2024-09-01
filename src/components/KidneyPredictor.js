import React, { useState } from 'react';
import axios from 'axios';

function KidneyDiseasePredictor() {
    const [formData, setFormData] = useState({
        age: '',
        blood_pressure: '',
        specific_gravity: '',
        albumin: '',
        sugar: '',
        red_blood_cells: '',
        pus_cell: '',
        pus_cell_clumps: '',
        bacteria: '',
        blood_glucose_random: '',
        blood_urea: '',
        serum_creatinine: '',
        sodium: '',
        potassium: '',
        haemoglobin: '',
        packed_cell_volume: '',
        white_blood_cell_count: '',
        red_blood_cell_count: '',
        hypertension: '',
        diabetes_mellitus: '',
        coronary_artery_disease: '',
        appetite: '',
        peda_edema: '',
        aanemia: ''
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
        axios.post('http://127.0.0.1:5000/api/kidneydisease', formData)
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
                    <center><h1>Kidney Disease Predictor</h1></center>
                    <div className="card card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-4">
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
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="blood_pressure"
                                            placeholder="Blood Pressure (in mm/Hg)"
                                            value={formData.blood_pressure}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="specific_gravity"
                                            placeholder="Specific Gravity"
                                            value={formData.specific_gravity}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="albumin"
                                            placeholder="Albumin (0, 1, 2, 3, 4, 5)"
                                            value={formData.albumin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="sugar"
                                            placeholder="Sugar (0, 1, 2, 3, 4, 5)"
                                            value={formData.sugar}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="red_blood_cells"
                                            placeholder="Red Blood Cells (0: Abnormal; 1: Normal)"
                                            value={formData.red_blood_cells}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="pus_cell"
                                            placeholder="Pus Cell (0: Abnormal; 1: Normal)"
                                            value={formData.pus_cell}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="pus_cell_clumps"
                                            placeholder="Pus Cell Clumps (0: Not Present; 1: Present)"
                                            value={formData.pus_cell_clumps}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="bacteria"
                                            placeholder="Bacteria (0: Not Present; 1: Present)"
                                            value={formData.bacteria}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="blood_glucose_random"
                                            placeholder="Blood Glucose Random (in mgs/dl)"
                                            value={formData.blood_glucose_random}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="blood_urea"
                                            placeholder="Blood Urea (in mgs/dl)"
                                            value={formData.blood_urea}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="serum_creatinine"
                                            placeholder="Serum Creatinine (in mgs/dl)"
                                            value={formData.serum_creatinine}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="sodium"
                                            placeholder="Sodium (in mEq/L)"
                                            value={formData.sodium}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="potassium"
                                            placeholder="Potassium (in mEq/L)"
                                            value={formData.potassium}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="haemoglobin"
                                            placeholder="Haemoglobin (in gms)"
                                            value={formData.haemoglobin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="packed_cell_volume"
                                            placeholder="Packed Cell Volume"
                                            value={formData.packed_cell_volume}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="white_blood_cell_count"
                                            placeholder="White Blood Cell Count (in cells/cumm)"
                                            value={formData.white_blood_cell_count}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="red_blood_cell_count"
                                            placeholder="Red Blood Cell Count (in millions/cmm)"
                                            value={formData.red_blood_cell_count}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="hypertension"
                                            placeholder="Hypertension (0: No; 1: Yes)"
                                            value={formData.hypertension}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="diabetes_mellitus"
                                            placeholder="Diabetes Mellitus (0: No; 1: Yes)"
                                            value={formData.diabetes_mellitus}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="coronary_artery_disease"
                                            placeholder="Coronary Artery Disease (0: No; 1: Yes)"
                                            value={formData.coronary_artery_disease}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="appetite"
                                            placeholder="Appetite (0: Good; 1: Poor)"
                                            value={formData.appetite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="peda_edema"
                                            placeholder="Pedal Edema (0: No; 1: Yes)"
                                            value={formData.peda_edema}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="aanemia"
                                            placeholder="Anemia (0: No; 1: Yes)"
                                            value={formData.aanemia}
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

export default KidneyDiseasePredictor;
