import React from 'react';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { visitsActions } from '../../store/visitsActions';
import { addNewVisit, getVisits } from '../../apis/fetch';
import css from './PublicScreen.module.css';
import { Link } from 'react-router-dom';

const PublicScreen = () => {
  const dispatch = useDispatch();

  async function handleNewBooking() {
    const randomRef = uuid().slice(0, 5);
    const newVisit = { reference: randomRef, active: false };
    const newAllVisits = await addNewVisit(newVisit);
    console.log({ newAllVisits });

    dispatch(visitsActions.setAllVisits(newAllVisits));
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
    </div>
  );
};

export default PublicScreen;
