import React from 'react';
import css from './BookingScreen.module.css';

const AnimatedCard = ({ color, children }) => {
  return <div className={css.card + ' ' + css[color]}>{children}</div>;
};

export default AnimatedCard;
