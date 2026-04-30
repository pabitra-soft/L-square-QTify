import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';   // ← This was missing!
import Card from '../Card/Card';
import styles from './Section.module.css';

const Section = () => {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://qtify-backend.labs.crio.do/albums/top');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchAlbums();
  }, []);

  const displayedAlbums = collapsed ? albums.slice(0, 4) : albums;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          Top Albums
        </Typography>
        <button 
          className={styles.collapseButton}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? 'Show All' : 'Collapse'}
        </button>
      </div>

      <div className={styles.grid}>
        {displayedAlbums.map((album) => (
          <Card
            key={album.id}
            image={album.image}
            title={album.title}
            follows={album.follows}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;