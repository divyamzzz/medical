import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BreastCancerPredictor from './components/BreastCancerPredictor';
import DiabetesPredictor from './components/DiabetesPredictor';
import HeartDiseasePredictor from './components/HeartPredictor';
import KidneyDiseasePredictor from './components/KidneyPredictor';
import LiverDiseasePredictor from './components/LiverPredictor';
import MalariaPredictor from './components/MalariaPredictor';
import PneumoniaPredictor from './components/PneumoniaPredictor';
import './styles.css';
function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/diabetes">Diabetes Predictor</Link></li>
                        <li><Link to="/breast-cancer">Breast Cancer Predictor</Link></li>
                        <li><Link to="/heart-disease">Heart Disease Predictor</Link></li>
                        <li><Link to="/kidney-disease">Kidney Disease Predictor</Link></li>
                        <li><Link to="/liver-disease">Liver Disease Predictor</Link></li>
                        <li><Link to="/malaria-predictor">Malaria Predictor</Link></li>
                        <li><Link to="/pneumonia-predictor">Pneumonia Predictor</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/diabetes" element={<DiabetesPredictor />} />
                    <Route path="/breast-cancer" element={<BreastCancerPredictor />} />
                    <Route path="/heart-disease" element={<HeartDiseasePredictor />} />
                    <Route path="/kidney-disease" element={<KidneyDiseasePredictor />} />
                    <Route path="/liver-disease" element={<LiverDiseasePredictor />} />
                    <Route path="/malaria-predictor" element={<MalariaPredictor />} />
                    <Route path="/pneumonia-predictor" element={<PneumoniaPredictor />} />
                    <Route path="/" element={
                        <div>
                            <h1>Welcome to the Health Predictor App</h1>
                            <p>Select a predictor from the links above.</p>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
