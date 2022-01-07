import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import css from './PublicScreen.module.css';
import { visitorActions } from '../../store';
import { addNewVisitor, getActiveConsultantsCount } from '../../api/fetch';
import { activeConsultantsActions } from '../../store';
import config from '../../config';

const PublicScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasActiveConsultants, setHasActiveConsultants] = useState(false);

  const getAllConsultantCount = async () => {
    try {
      const activeConsultants = await getActiveConsultantsCount();
      setHasActiveConsultants(activeConsultants !== 0);
      dispatch(activeConsultantsActions.setActiveConsultants(activeConsultants));
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewBooking = async () => {
    const conusltantCount = await getActiveConsultantsCount();
    if (conusltantCount > 0) {
      const ref = uuid().slice(0, 6).toUpperCase();
      const params = { reference: ref, active: false };
      const { consultant, reference, _id } = await addNewVisitor(params);
      dispatch(visitorActions.setVisitor({ consultant, reference, _id }));
      navigate('/booking');
    }
  };

  // Timer to get most recent data
  useEffect(() => {
    const interval = setInterval(async () => {
      await getAllConsultantCount();
    }, config.dataUptadeRate);
    getAllConsultantCount();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`container ${css.public}`}>
      {hasActiveConsultants ? (
        <>
          <h2 className={css.main}>
            Welcome to our booking page! To join our live waiting line for an appointment with one of our consultants
            please press the button below.
          </h2>
          <div className={css.button} onClick={handleNewBooking}>
            Join waiting line
          </div>
        </>
      ) : (
        <h2 className={css.main}>There are currently no consultants available. Please wait a few minutes.</h2>
      )}
    </div>
  );
};

export default PublicScreen;
