import React, { useState, useEffect } from 'react';
import styles from './SisipanSection.module.css';
import StarBackground from '../StarBackground';

const SisipanSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const textLines = ['DESIGNER', 'DEVELOPER'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseTime = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentLine = loopNum % textLines.length;
      const fullText = textLines[currentLine];

      if (!isDeleting) {
        // Typing phase
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Pause at the end of typing
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayText(fullText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Move to next line after deleting
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setCurrentIndex(0);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, textLines]);

  return (
    <section className={styles.sisipanSection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.typewriterContainer}>
            <span className={styles.staticText}>I AM A</span>
            <span className={styles.typewriterText}>
              {displayText}
              <span className={styles.cursor}>|</span>
            </span>
          </div>
          
          <div className={styles.fullText}>
            <span className={styles.designerText}>DESIGNER</span>
            <span className={styles.andText}> AND </span>
            <span className={styles.developerText}>DEVELOPER</span>
          </div>

          <p className={styles.description}>

            <span className={styles.highlight}>  </span>
            
            <span className={styles.highlight}> </span>
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.glowCircle1}></div>
          <div className={styles.glowCircle2}></div>
          <div className={styles.glowCircle3}></div>
        </div>
      </div>
    </section>
  );
};

export default SisipanSection;