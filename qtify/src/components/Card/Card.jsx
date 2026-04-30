import React from 'react';
import { Card as MuiCard, CardMedia, Typography, Chip, Box } from '@mui/material';
import styles from './Card.module.css';

const Card = ({ image, title, follows, likes, isSong = false }) => {
  const count = isSong ? likes : follows;
  const label = isSong ? `${count} Likes` : `${count} Follows`;

  return (
    <MuiCard className={styles.card}>
      <Box className={styles.imageContainer}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          className={styles.cardImage}
        />
        <Chip
          label={label}
          className={styles.followChip}
          sx={{
            backgroundColor: '#121212',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            position: 'absolute',
            bottom: '12px',
            left: '12px',
          }}
        />
      </Box>
      <Box className={styles.cardContent}>
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </Box>
    </MuiCard>
  );
};

export default Card;