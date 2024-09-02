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
            <div className="App" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
                <nav style={{ backgroundColor: '#FF6600', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'center' }}>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/diabetes" style={navLinkStyle}>Diabetes Predictor</Link>
                        </li>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/breast-cancer" style={navLinkStyle}>Breast Cancer Predictor</Link>
                        </li>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/heart-disease" style={navLinkStyle}>Heart Disease Predictor</Link>
                        </li>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/kidney-disease" style={navLinkStyle}>Kidney Disease Predictor</Link>
                        </li>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/liver-disease" style={navLinkStyle}>Liver Disease Predictor</Link>
                        </li>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/malaria-predictor" style={navLinkStyle}>Malaria Predictor</Link>
                        </li>
                        <li style={{ margin: '0 20px' }}>
                            <Link to="/pneumonia-predictor" style={navLinkStyle}>Pneumonia Predictor</Link>
                        </li>
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
                        <div style={{ textAlign: 'center', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
                            <h1 style={{
                                fontSize: '4rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #FFCC00, #FF6600)', // Gradient color
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                textShadow: '0 0 5px #FFCC00, 0 0 6px #FFCC00, 0 0 5px #FF6600, 0 0 1px #FF6600', // Enhanced glowing effect
                                margin: '1rem 0'
                            }}>
                                Health Predictor App
                            </h1>
                            <p style={{
                                color: '#FF6600',
                                fontSize: '1.5rem',
                                margin: '0.5rem 0'
                            }}>
                            </p>
                            <img src="https://hellofuture.orange.com/app/uploads/2020/05/4_deeplearning_780.gif" alt="Health GIF" style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: -1
                            }} />
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

// Inline styles for navigation links
const navLinkStyle = {
    color: '#FFCC00',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
    padding: '10px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease'
};

export default App;
