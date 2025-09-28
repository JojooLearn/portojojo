// src/components/HeroToggle/HeroToggle.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroToggle.module.css';

export default function HeroToggle(){
  const [selected, setSelected] = useState('portfolio'); // 'portfolio' | 'hire'
  const [animating, setAnimating] = useState(false);
  const indicatorRef = useRef(null);
  const nav = useNavigate();
  const fallbackRef = useRef(null);

  // cleanup fallback timers
  useEffect(() => {
    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    }
  }, []);

  function triggerSelect(target){
    // ignore repeated clicks while animating
    if(animating) return;

    // if same option clicked -> still animate small pulse and navigate
    setSelected(target);
    setAnimating(true);
  }

  // listen for transitionend on indicator, then navigate
  useEffect(() => {
    if (!animating) return;

    const indicator = indicatorRef.current;
    let finished = false;

    function onEnd(e){
      // accept left or transform property end
      if (e.propertyName === 'left' || e.propertyName === 'transform') {
        finished = true;
        setAnimating(false);
        const route = selected === 'portfolio' ? '/projects' : '/contact';
        nav(route);
      }
    }

    if (indicator) {
      indicator.addEventListener('transitionend', onEnd);
    }

    // fallback in case transitionend not fired (e.g. tab not visible)
    fallbackRef.current = setTimeout(() => {
      if (!finished) {
        setAnimating(false);
        const route = selected === 'portfolio' ? '/projects' : '/contact';
        nav(route);
      }
    }, 700); // slightly longer than CSS transition

    return () => {
      if (indicator) indicator.removeEventListener('transitionend', onEnd);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    }
  }, [animating, selected, nav]);

  const onKey = (e, target) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerSelect(target);
    }
  };

  return (
    <div className={styles.toggleWrapper}>
      <div className={`${styles.toggle} ${animating ? styles.animating : ''}`} role="tablist" aria-label="Hero CTA Switch">
        <div
          ref={indicatorRef}
          className={`${styles.indicator} ${selected === 'hire' ? styles.right : ''} ${animating ? ' ' + styles.play : ''}`}
          aria-hidden="true"
        />
        <button
          className={`${styles.option} ${selected === 'portfolio' ? styles.active : ''}`}
          onClick={() => triggerSelect('portfolio')}
          onKeyDown={(e) => onKey(e, 'portfolio')}
          aria-pressed={selected === 'portfolio'}
          aria-label="Go to Portfolio"
        >
          Portfolio
        </button>

        <button
          className={`${styles.option} ${selected === 'hire' ? styles.active : ''}`}
          onClick={() => triggerSelect('hire')}
          onKeyDown={(e) => onKey(e, 'hire')}
          aria-pressed={selected === 'hire'}
          aria-label="Hire me - contact page"
        >
          Hire me
        </button>
      </div>
    </div>
  );
}
