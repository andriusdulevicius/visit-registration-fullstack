import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCostumers, cancelCostumerVisit } from '../../apis/fetch';
import css from './BookingScreen.module.css';
import AnimatedCard from './AnimatedCard';
import { RiUser3Fill, RiUser3Line, RiUserVoiceFill } from 'react-icons/ri';

const availableConsultants = 1;

const BookingScreen = () => {
  const [peopleInLine, setPeopleInLine] = useState(0);
  const [registeredPersonsRef, setRegisteredPersonsRef] = useState('');
  const [registeredPersonsId, setRegisteredPersonsId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const existingCostumers = await getCostumers();
      if (existingCostumers) {
        setPeopleInLine(existingCostumers.length - 1);
      }
    })();
    setPersonalInfo();
  }, []);

  async function setPersonalInfo() {
    const costumersArr = await getCostumers();
    if (costumersArr) {
      const sortedCostumersArr = costumersArr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      const latestPersonsRef = sortedCostumersArr[0].reference;
      const latestPersonsId = sortedCostumersArr[0]._id;
      setRegisteredPersonsRef(latestPersonsRef);
      setRegisteredPersonsId(latestPersonsId);
    }
  }

  async function handleCancelation() {
    await cancelCostumerVisit(registeredPersonsId);
    navigate('/');
  }

  const averageWaitingTime = Math.round((peopleInLine / availableConsultants) * 5);

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
            approximately {availableConsultants > peopleInLine ? 0 : averageWaitingTime} minutes at the moment. You will
            be invited to your appointment shortly...
          </h4>
          <h4 className={css.reference}>
            Your booking reference number is <strong>{registeredPersonsRef}</strong>
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
