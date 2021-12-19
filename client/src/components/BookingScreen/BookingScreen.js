import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelVisit, getConsultant } from '../../apis/fetch';
import { useSelector } from 'react-redux';
import css from './BookingScreen.module.css';
import AnimatedCard from './AnimatedCard';
import { RiUser3Fill, RiUser3Line, RiUserVoiceFill } from 'react-icons/ri';

const BookingScreen = () => {
  const [peopleInLine, setPeopleInLine] = useState(0);
  const [registeredVisitsRef, setRegisteredVisitsRef] = useState('');
  const [registeredVisitsId, setRegisteredVisitsId] = useState('');
  const navigate = useNavigate();
  const consultantVisits = useSelector((state) => state.auth.users)?.length;
  const allVisits = useSelector((state) => state.visits.allVisits);

  useEffect(() => {
    (async () => {
      const currentConsultant = await getConsultant();
    })();
    // if (allVisits && allVisits.length > 0) {
    //   setPeopleInLine(allVisits.length - 1);
    //   const sortedVisits = [...allVisits].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    //   setRegisteredVisitsRef(sortedVisits[0].reference);
    //   setRegisteredVisitsId(sortedVisits[0]._id);
    // }
  }, [allVisits]);

  async function handleCancelation() {
    await cancelVisit(registeredVisitsId);
    navigate('/');
  }

  const averageWaitingTime = Math.round((peopleInLine / consultantVisits) * 5);

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
            approximately {averageWaitingTime} minutes at the moment. You will be invited to your appointment shortly...
          </h4>
          <h4 className={css.reference}>
            Your booking reference number is <strong>{registeredVisitsRef}</strong>
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
