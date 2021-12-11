import React from 'react';
import uuid from 'react-uuid';
import { addNewCostumer } from '../../apis/fetch';

import css from './PublicScreen.module.css';
import { Link } from 'react-router-dom';

const PublicScreen = () => {
  function handleNewBooking() {
    addNewCostumer({ reference: uuid().slice(0, 5), active: false });
  }

  return (
    <div className={`container ${css.public}`}>
      <h2 className={css.main}>
        Welcome to our booking page! To join our live waiting line for an appointment with one of our consultants please
        press the button below.
      </h2>
      <div className={css.button}>
        <Link to='/booking' onClick={handleNewBooking}>
          Join waiting line
        </Link>
      </div>
      {/* <p className={css.caption}>
        Current waiting time is around XXX minutes. Already registered an appointment?{' '}
        <Link to='/booking' className={css.booking}>
          Go back to waiting page
        </Link>
      </p> */}
    </div>
  );
};

export default PublicScreen;
