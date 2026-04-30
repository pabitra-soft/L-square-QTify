import React from 'react';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Logo />
        <SearchBar />
        <Button>Give Feedback</Button>
      </div>
    </nav>
  );
};

export default Navbar;