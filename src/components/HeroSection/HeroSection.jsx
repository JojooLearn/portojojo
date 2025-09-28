import React from "react";
import styles from "./HeroSection.module.css";
import profileImage from "../../assets/HeroImage.png";
import HeroToggle from "../HeroToggle/HeroToggle"; // ⬅️ import baru
import StarBackground from '../StarBackground';

const HeroSection = () => {
  return (
    <section id="hero" className={styles.hero}>
            <StarBackground />
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Text Content */}
          <div className={styles.textContent}>
            <div className={styles.textContent}>
              <div className={styles.subtitle}>
                I'm <span className="text-gradient-animate">Johan Dwiyanto</span>
              </div>
              
              <h1 className="text-gradient-animate">
                UI/UX Designer<br />& Developer
              </h1>
            </div>
           
            <div className={styles.location}>
              From Indonesia 🟥⬜
            </div>
            
            <p className={styles.description}>
              Passionate about creating intuitive, aesthetic, and functional digital 
              experiences. Combining creative design with clean code to deliver 
              exceptional user experiences.
            </p>
            
            {/* Toggle Switch CTA */}
            <HeroToggle />
          </div>
          
          {/* Image Content */}
          <div className={styles.imageContent}>
            <div className={styles.imageContainer}>
              <div className={styles.helloLabel}>
                Hello!!
              </div>
              <img 
                src={profileImage} 
                alt="Johan Dwiyanto - UI/UX Designer & Developer"
                className={styles.profileImage}
              />
              <div className={styles.gradientFrame}></div>
              <div className={styles.doodleAccent}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
