import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Tabs, Tab } from '@mui/material';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import styles from './Section.module.css';

const Section = ({ title, fetchUrl, isSongsSection = false }) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showCarousel, setShowCarousel] = useState(false);   // ← Changed name for clarity

  // Fetch albums/songs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(fetchUrl);
        setData(res.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [fetchUrl]);

  // Fetch genres only for Songs
  useEffect(() => {
    if (isSongsSection) {
      const fetchGenres = async () => {
        try {
          const res = await axios.get('https://qtify-backend.labs.crio.do/genres');
          setGenres(res.data.data || res.data);
        } catch (err) {
          console.error('Error fetching genres:', err);
        }
      };
      fetchGenres();
    }
  }, [isSongsSection]);

  // Filter songs by genre
  const filteredData = isSongsSection
    ? data.filter((song) =>
        selectedGenre === 'all' || song.genre?.key === selectedGenre
      )
    : data;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          {title}
        </Typography>

        {/* Toggle button ONLY for Albums (Top & New) */}
        {!isSongsSection && (
          <button
            className={styles.toggleButton}
            onClick={() => setShowCarousel(!showCarousel)}
          >
            {showCarousel ? 'Collapse' : 'Show All'}
          </button>
        )}
      </div>

      {/* Genre Tabs - ONLY for Songs section */}
      {isSongsSection && (
        <Tabs
          value={selectedGenre}
          onChange={(e, newValue) => setSelectedGenre(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            marginBottom: '24px',
            '& .MuiTab-root': {
              color: '#fff',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1rem',
              fontWeight: 500,
              minWidth: 'auto',
              padding: '12px 24px',
            },
            '& .Mui-selected': {
              color: '#34C94B !important',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#34C94B',
              height: '4px',
              borderRadius: '2px',
            },
          }}
        >
          <Tab label="All" value="all" />
          {genres.map((genre) => (
            <Tab
              key={genre.key}
              label={genre.label}
              value={genre.key}
            />
          ))}
        </Tabs>
      )}

      {/* Content: Grid or Carousel */}
      {showCarousel && !isSongsSection ? (
        <Carousel>
          {filteredData.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                image={item.image}
                title={item.title}
                follows={item.follows}
                likes={item.likes}
                isSong={isSongsSection}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className={styles.grid}>
          {filteredData.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={item.follows}
              likes={item.likes}
              isSong={isSongsSection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;