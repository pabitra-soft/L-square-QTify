import React from 'react';
import logo from '../../assets/qtify-logo.png';

const Logo = () => {
  return (
    <img 
      src={logo} 
      alt="QTify Logo" 
      style={{ height: '40px', cursor: 'pointer' }}
    />
  );
};

export default Logo;