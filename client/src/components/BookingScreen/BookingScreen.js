import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiUser3Fill, RiUser3Line, RiUserVoiceFill, RiUser5Line } from 'react-icons/ri';
import css from './BookingScreen.module.css';
import AnimatedCard from './AnimatedCard';
import config from '../../config';
import { visitorActions } from '../../store';
import { cancelVisitor, getVisitor } from '../../apis/fetch';

const BookingScreen = () => {
  const dispatch = useDispatch();

  const [peopleInLine, setPeopleInLine] = useState(0);
  const [timeToWait, setTimeToWait] = useState(0);
  const [sessionIsOver, setSessionIsOver] = useState(false);
  const [visitStarted, setVisitStarted] = useState(false);
  const visitor = useSelector((state) => state.visitor);
  const { consultant, _id, reference: ref } = visitor;

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
  }, [visitor]);

  useEffect(() => {
    const interval = setInterval(() => {
      getVisitor(ref)
        .then((data) => {
          if (data.length === 0) {
            setSessionIsOver(true);
          }
          if (data.length > 0) {
            const { consultant, reference, _id, active } = data[0];
            setVisitStarted(active);
            dispatch(visitorActions.setVisitor({ consultant, reference, _id, active }));
          }
        })

        .catch((err) => console.error(err));
    }, config.dataUptadeRate);

    return () => clearInterval(interval);
  }, [ref]);

  return (
    <div className='container'>
      <h3 className={css.main}>Thank you for booking through our system. This helps to monitor live waiting times.</h3>
      {!sessionIsOver && !visitStarted && (
        <>
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

          <button className={css.cancel} onClick={handleCancelation}>
            Cancel your booking
          </button>
        </>
      )}
      {peopleInLine < 0 && <p className={css.error}>Sorry, error connecting to a server, please try again.</p>}
      {visitStarted && !sessionIsOver && (
        <div className={css.visualisation}>
          <AnimatedCard color='green'>
            <RiUser5Line size={100} />
          </AnimatedCard>
          <h2 className={css.info}>
            Your visit is about to begin, the consultant will invite you by the reference number provided!
          </h2>
          <h2 className={css.reference}>
            Your booking reference number is <strong>{ref}</strong>
          </h2>
        </div>
      )}
      {sessionIsOver && (
        <div className={css.visualisation}>
          <AnimatedCard color='red'>
            <RiUser5Line size={100} />
          </AnimatedCard>
          <h2 className={css.info}>
            Your booking session is over. Thank you for using our services. If you need any more support, please book
            another visit at "Book Your Visit" section.
          </h2>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;
