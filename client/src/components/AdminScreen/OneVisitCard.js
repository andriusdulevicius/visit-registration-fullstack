import React from 'react';
import { cancelVisit, editVisitStatus } from '../../apis/fetch';
import { useSelector, useDispatch } from 'react-redux';
import { visitsActions } from '../../store/visitsActions';
import css from './AdminScreen.module.css';

const OneVisitCard = ({ reference, createdAt, id, active }) => {
  const dispatch = useDispatch();
  const allVisits = useSelector((state) => state.visits.allVisits);

  async function setActiveVisit(id) {
    if (allVisits.find((c) => c.active === true)) return;
    await editVisitStatus(id, { active: true });
    const newAllVisits = allVisits.map((c) => (c._id === id ? { ...c, active: true } : c));
    dispatch(visitsActions.getAllVisits(newAllVisits));
  }

  async function handleCancelVisit(id) {
    await cancelVisit(id);
    const newAllVisits = allVisits.filter((v) => v._id !== id);
    dispatch(visitsActions.getAllVisits(newAllVisits));
  }

  return (
    <tr>
      <td className={css.ref}>{reference}</td>
      <td className={css.created}>{createdAt}</td>
      <td className={css.buttons}>
        <button className={css.invite} disabled={active} onClick={() => setActiveVisit(id)}>
          Invite client
        </button>
        <button className={css.end} disabled={!active} onClick={() => handleCancelVisit(id)}>
          End of visit
        </button>
        <button className={css.cancel} onClick={() => handleCancelVisit(id)}>
          Cancel visit
        </button>
      </td>
    </tr>
  );
};

export default OneVisitCard;
