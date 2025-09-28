import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

const StarBackground = () => {
  const { isDarkMode } = useTheme();
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [comets, setComets] = useState([]);

  const generateStars = useCallback(() => {
    if (!isDarkMode) return;
    
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const newStars = [];
    
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: Math.random() * 6 + 4,
        animationDelay: Math.random() * 5,
        twinkle: Math.random() > 0.7,
      });
    }
    setStars(newStars);
  }, [isDarkMode]);

  const generateMeteors = useCallback(() => {
    if (!isDarkMode) return;
    
    const numberOfMeteors = 5;
    const newMeteors = [];
    
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 1.5 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 30,
        delay: Math.random() * 20,
        animationDuration: Math.random() * 2 + 2,
        length: Math.random() * 100 + 50,
        angle: Math.random() * 30 - 15,
      });
    }
    setMeteors(newMeteors);
  }, [isDarkMode]);

  const generateComets = useCallback(() => {
    if (!isDarkMode) return;
    
    const numberOfComets = 2;
    const newComets = [];
    
    for (let i = 0; i < numberOfComets; i++) {
      newComets.push({
        id: i,
        size: Math.random() * 3 + 2,
        x: Math.random() * 100,
        y: Math.random() * 40,
        delay: Math.random() * 30 + 10,
        animationDuration: Math.random() * 8 + 6,
        tailLength: Math.random() * 200 + 100,
      });
    }
    setComets(newComets);
  }, [isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      generateStars();
      generateMeteors();
      generateComets();

      const handleResize = () => {
        generateStars();
        generateMeteors();
        generateComets();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isDarkMode, generateStars, generateMeteors, generateComets]);

  // Reset animations when theme changes
  useEffect(() => {
    if (!isDarkMode) {
      setStars([]);
      setMeteors([]);
      setComets([]);
    }
  }, [isDarkMode]);

  if (!isDarkMode) {
    return null;
  }

  return (
    <div className={cn(
      "star-background",
      "fixed inset-0 pointer-events-none",
      "overflow-hidden",
      "z-0"
    )}>
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={cn(
            "star",
            "absolute rounded-full",
            "bg-white",
            star.twinkle && "twinkle-star",
            "animate-pulse"
          )}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className={cn(
            "meteor",
            "absolute",
            "bg-gradient-to-r from-transparent via-white to-transparent",
            "animate-meteor"
          )}
          style={{
            width: `${meteor.length}px`,
            height: `${meteor.size}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
            transform: `rotate(${meteor.angle}deg)`,
            opacity: 0.8,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Comets */}
      {comets.map((comet) => (
        <div
          key={comet.id}
          className={cn(
            "comet",
            "absolute",
            "bg-gradient-to-r from-transparent via-blue-200 to-transparent",
            "animate-comet"
          )}
          style={{
            width: `${comet.tailLength}px`,
            height: `${comet.size}px`,
            left: `${comet.x}%`,
            top: `${comet.y}%`,
            animationDelay: `${comet.delay}s`,
            animationDuration: `${comet.animationDuration}s`,
            transform: 'rotate(-45deg)',
            opacity: 0.6,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Subtle gradient overlay */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-b from-transparent to-dark-bg/50",
        "pointer-events-none"
      )} />
      
    </div>
  );
};

export default StarBackground;