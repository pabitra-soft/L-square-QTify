import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        placeholder="Search a song, artist or album..." 
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;