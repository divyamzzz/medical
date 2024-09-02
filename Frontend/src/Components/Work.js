import React from "react";
import PickMeals from "../Assets/diab3.jpg";
import ChooseMeals from "../Assets/bcancer.jpg";
import heart from '../Assets/heart.png';
import liver from '../Assets/liver.png';
import kidney from '../Assets/kidney.jpg';

const Work = () => {
  const handleButtonClick = () => {
    window.location.href = "http://localhost:3001"; // Change the URL as needed
  };

  const workInfoData = [
    {
      image: PickMeals,
      title: "Diabetes Detector",
    },
    {
      image: ChooseMeals,
      title: "Breast Cancer Detector",
    },
    {
      image: heart,
      title: "Heart Disease Detector",
    },
    {
      image: liver,
      title: "Liver Disease Detector",
    },
    {
      image: kidney,
      title: "Kidney Disease Detector",
    },
  ];

  // Inline CSS styles
  const buttonStyle = {
    padding: "1rem 2.5rem",
    backgroundColor: "#fe9e0d",
    outline: "none",
    border: "none",
    borderRadius: "5rem",
    fontSize: "1.1rem",
    cursor: "pointer",
    fontWeight: "600",
    color: "white",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    margin: "1rem",
    display: "inline-block",
    textAlign: "center",
  };

  const buttonHoverStyle = {
    backgroundColor: "#e48f0f",
    transform: "translateY(-3px)",
  };

  const buttonActiveStyle = {
    backgroundColor: "#d27b0e",
    transform: "translateY(0)",
  };

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Simply enter your lab reports, and our AI model provides accurate disease insights, helping you understand your health better.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
          </div>
        ))}
      </div>
      {/* Separate section for the button */}
      <div className="button-section" style={{ textAlign: "center", marginTop: "2rem" }}>
        <button 
          style={buttonStyle}
          onClick={handleButtonClick}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = buttonActiveStyle.backgroundColor}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        >
          Test & Analyze
        </button>
      </div>
    </div>
  );
};

export default Work;
