import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';   // ← This was missing!
import styles from './Section.module.css';

const Section = ({ title, fetchUrl }) => {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchAlbums();
  }, [fetchUrl]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          {title}
        </Typography>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 'Show All' : 'Collapse'}
        </button>
      </div>

      {isCollapsed ? (
        <Carousel>
          {albums.map((album) => (
            <SwiperSlide key={album.id}>
              <Card
                image={album.image}
                title={album.title}
                follows={album.follows}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className={styles.grid}>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;