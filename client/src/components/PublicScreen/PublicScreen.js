import React from 'react';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import css from './PublicScreen.module.css';
import { visitorActions } from '../../store';
import { addNewVisitor } from '../../apis/fetch';

const PublicScreen = () => {
  const dispatch = useDispatch();

  async function handleNewBooking() {
    const ref = uuid().slice(0, 6).toUpperCase();
    const params = { reference: ref, active: false };
    const { consultant, reference, _id } = await addNewVisitor(params);
    dispatch(visitorActions.setVisitor({ consultant, reference, _id }));
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
