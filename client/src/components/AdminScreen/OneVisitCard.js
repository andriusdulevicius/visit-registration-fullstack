import React, { useState, useEffect } from 'react';
import css from './AdminScreen.module.css';
import { cancelVisitor, editVisitorStatus } from '../../apis/fetch';
import { consultantActions } from '../../store';

const OneVisitCard = ({ reference, createdAt, allVisits, id, active }) => {
  const [visitors, setVisitors] = useState(allVisits);
  const [isActive, setIsActive] = useState(active);
  console.log('$$$ visitors', visitors);

  async function setActiveVisit(reference) {
    const isThereActiveVisits = visitors.find((v) => v.active);
    console.log('$$$ isThereActiveVisits', isThereActiveVisits);
    if (!isThereActiveVisits) {
      setIsActive(true);
      await editVisitorStatus(reference, { active: true });
    }
  }

  async function handleCancelVisit(reference) {
    const newVisitors = visitors.filter((v) => v !== id);
    console.log('$$$ newVisitors', newVisitors);
    setVisitors(newVisitors);
    await cancelVisitor(reference);
  }

  useEffect(() => {
    setVisitors(allVisits);
    setIsActive(active);
  }, [allVisits, active]);

  return (
    <tr>
      <td className={css.ref}>{reference}</td>
      <td className={css.created}>{createdAt}</td>
      <td className={css.buttons}>
        <button
          className={css.invite}
          disabled={isActive}
          onClick={() => {
            setActiveVisit(reference);
          }}
        >
          Invite client
        </button>
        <button
          className={css.end}
          disabled={!isActive}
          onClick={() => {
            handleCancelVisit(reference);
          }}
        >
          End of visit
        </button>
        <button
          className={css.cancel}
          onClick={() => {
            handleCancelVisit(reference);
          }}
        >
          Cancel visit
        </button>
      </td>
    </tr>
  );
};

export default OneVisitCard;
