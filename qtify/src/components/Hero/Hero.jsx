import React from 'react';
import heroImage from '../../assets/hero-headphones.png';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          100 Thousand Songs, ad-free
        </h1>
        <h1 className={styles.title}>
          Over thousands podcast episodes
        </h1>
        <button className={styles.ctaButton}>GET STARTED</button>
      </div>
      <img src={heroImage} alt="Headphones" className={styles.heroImage} />
    </div>
  );
};

export default Hero;