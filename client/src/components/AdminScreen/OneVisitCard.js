import React, { useState } from 'react';
import css from './AdminScreen.module.css';
import { cancelVisitor, editVisitorStatus } from '../../api/fetch';
import { consultantActions } from '../../store';
import { useDispatch } from 'react-redux';

const OneVisitCard = ({ reference, createdAt, allVisits, id, active, setVisitors }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(active);

  const setActiveVisit = async (reference) => {
    const visitorAlreadyCalled = allVisits.find((v) => v.active);
    if (!visitorAlreadyCalled) {
      await editVisitorStatus(reference, { active: true });
      setIsActive(true);
    }
  };

  const cancelVisit = async (reference) => {
    const newVisitors = allVisits.filter((v) => v._id !== id);
    setVisitors(newVisitors);
    dispatch(consultantActions.updateVisitors(newVisitors));
    await cancelVisitor(reference);
  };

  return (
    <tr>
      <td className={css.ref}>{reference}</td>
      <td className={css.created}>{createdAt}</td>
      <td className={css.buttons}>
        <button
          className={`${css.invite} ${css.button}`}
          disabled={isActive}
          onClick={() => {
            setActiveVisit(reference);
          }}
        >
          Invite client
        </button>
        <button
          className={`${css.end} ${css.button}`}
          disabled={!isActive}
          onClick={() => {
            cancelVisit(reference);
          }}
        >
          End of visit
        </button>
        <button
          className={`${css.cancel} ${css.button}`}
          onClick={() => {
            cancelVisit(reference);
          }}
        >
          Cancel visit
        </button>
      </td>
    </tr>
  );
};

export default OneVisitCard;
