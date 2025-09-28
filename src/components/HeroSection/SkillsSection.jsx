// src/components/SkillsSection/SkillsSection.jsx
import React, { useState, useRef } from "react";
import styles from "./SkillsSection.module.css";
import StarBackground from "../StarBackground";
 
const skillsRow1 = [
  { icon: "🎨", name: "UI Design", level: "Advanced" },
  { icon: "💻", name: "Web Development", level: "Advanced" },
  { icon: "📱", name: "Mobile Development", level: "Intermediate" },
  { icon: "🔧", name: "Prototyping", level: "Intermediate" },
  { icon: "🧩", name: "Design Thinking", level: "Advanced" },
  { icon: "🔎", name: "UX Research", level: "Advanced" },
];

const skillsRow2 = [
  { icon: "🖌️", name: "Figma", level: "Advanced" },
  { icon: "🧑‍🚀", name: "Postman", level: "Intermediate" },
  { icon: "📊", name: "Miro", level: "Intermediate" },
  { icon: "🛠️", name: "Git & GitHub", level: "Advanced" },
  { icon: "☁️", name: "Firebase", level: "Intermediate" },
  { icon: "🧑‍💻", name: "VS Code", level: "Advanced" },
];


const SkillsSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(30);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (track1Ref.current && track2Ref.current) {
      track1Ref.current.style.animationPlayState = isPlaying ? "paused" : "running";
      track2Ref.current.style.animationPlayState = isPlaying ? "paused" : "running";
    }
  };

  const speedUp = () => {
    const newSpeed = Math.max(10, speed - 5);
    setSpeed(newSpeed);
    if (track1Ref.current) track1Ref.current.style.animationDuration = `${newSpeed}s`;
    if (track2Ref.current) track2Ref.current.style.animationDuration = `${newSpeed}s`;
  };

  const slowDown = () => {
    const newSpeed = Math.min(60, speed + 5);
    setSpeed(newSpeed);
    if (track1Ref.current) track1Ref.current.style.animationDuration = `${newSpeed}s`;
    if (track2Ref.current) track2Ref.current.style.animationDuration = `${newSpeed}s`;
  };

  // helper buat render item + duplikasi supaya infinite
  const renderSkills = (skills) =>
    [...skills, ...skills].map((skill, index) => (
      <div key={index} className={styles.skillItem}>
        <div className={styles.skillIcon}>{skill.icon}</div>
        <h3 className={styles.skillName}>{skill.name}</h3>
        <span className={styles.skillLevel}>{skill.level}</span>
      </div>
    ));

  return (
    <section id="skills" className={styles.skillsSection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
            <h2 className={`text-gradient-animate ${styles.title}`}>
                Skills & Tools
            </h2>
            <p className={` ${styles.subtitle}`}>
                Hover to pause the carousel
            </p>
        </div>


        {/* Carousel 1 */}
        <div className={styles.skillsCarousel}>
          <div
            ref={track1Ref}
            className={styles.skillsTrack}
            style={{
              animationDuration: `${speed}s`,
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {renderSkills(skillsRow1)}
          </div>
        </div>

        {/* Carousel 2 (reverse arah) */}
        <div className={styles.skillsCarousel}>
          <div
            ref={track2Ref}
            className={`${styles.skillsTrack} ${styles.reverse}`}
            style={{
              animationDuration: `${speed}s`,
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {renderSkills(skillsRow2)}
          </div>
        </div>

        {/* Controls */}
        <div className={styles.carouselControls}>
          <button className={styles.controlBtn} onClick={slowDown}>⏪</button>
          <button className={styles.controlBtn} onClick={togglePlay}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button className={styles.controlBtn} onClick={speedUp}>⏩</button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
