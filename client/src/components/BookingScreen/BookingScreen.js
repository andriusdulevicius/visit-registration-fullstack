import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiUser3Fill, RiUser3Line, RiUserVoiceFill } from 'react-icons/ri';
import css from './BookingScreen.module.css';
import AnimatedCard from './AnimatedCard';
import config from '../../config';
import { visitorActions } from '../../store';
import { cancelVisitor, getVisitor } from '../../apis/fetch';

const BookingScreen = () => {
  const dispatch = useDispatch();

  const [peopleInLine, setPeopleInLine] = useState(0);
  const [timeToWait, setTimeToWait] = useState(0);
  const { consultant, _id, reference: ref } = useSelector((state) => state.visitor);

  const navigate = useNavigate();

  const handleCancelation = async () => {
    await cancelVisitor(ref);
    navigate('/');
  };

  useEffect(() => {
    if (consultant) {
      const { visitors } = consultant;
      const waitPerPerson = 5;
      const peopleInFront = visitors.indexOf(_id);
      const waitTime = peopleInFront * waitPerPerson;
      setPeopleInLine(peopleInFront);
      setTimeToWait(waitTime);
    }
  }, [consultant]);

  useEffect(() => {
    const interval = setInterval(() => {
      getVisitor(ref)
        .then((data) => {
          const { consultant, reference, _id } = data[0];
          dispatch(visitorActions.setVisitor({ consultant, reference, _id }));
        })
        .catch((err) => console.error(err));
    }, config.dataUptadeRate);

    return () => clearInterval(interval);
  }, [ref]);

  return (
    <div className='container'>
      <h3 className={css.main}>
        Thank you for booking through our system. This helps everyone to be more aware of live waiting line progress.
      </h3>
      <div className={css.visualisation}>
        <AnimatedCard color='green'>
          <RiUser3Fill size={50} />
        </AnimatedCard>
        {peopleInLine > 0 &&
          [...Array(peopleInLine)].map((_, index) => (
            <AnimatedCard color='gray' key={index}>
              <RiUser3Line size={50} />
            </AnimatedCard>
          ))}
        <AnimatedCard color='yellow'>
          <RiUserVoiceFill size={50} />
          <RiUser3Fill size={50} />
        </AnimatedCard>
      </div>
      {peopleInLine >= 0 && (
        <>
          <h4 className={css.info}>
            You have {peopleInLine} {peopleInLine !== 1 ? 'people' : 'person'} in front of you. The waiting time is
            approximately {timeToWait} minutes at the moment. You will be invited to your appointment shortly...
          </h4>
          <h4 className={css.reference}>
            Your booking reference number is <strong>{ref}</strong>
          </h4>
        </>
      )}
      {peopleInLine < 0 && <p className={css.error}>Sorry, error connecting to a server, please try again.</p>}
      <button className={css.cancel} onClick={handleCancelation}>
        Cancel your booking
      </button>
    </div>
  );
};

export default BookingScreen;
