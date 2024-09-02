import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/image2.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {

  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Know Before It Shows: Early Insights into Your Health
        </h1>
        <p className="primary-text">
          Our model leverages advanced machine learning algorithms to deliver accurate and timely disease diagnoses. Designed for both medical professionals and patients, it simplifies the diagnostic process, offering reliable insights based on vast datasets and clinical expertise.
        </p>
        <p className="primary-text">
          By integrating cutting-edge technology with healthcare, our model aims to enhance patient care and improve health outcomes globally.
        </p>
        <div className="about-buttons-container">
        </div>
      </div>
    </div>
  );
};

export default About;
