import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './AdminScreen.module.css';
import { cancelVisitor, editVisitorStatus } from '../../apis/fetch';
import { visitorActions } from '../../store';

const OneVisitCard = ({ reference, createdAt, id, active }) => {
  const dispatch = useDispatch();

  async function setActiveVisit(id) {
    // if (allVisits.find((c) => c.active === true)) return;
    await editVisitorStatus(id, { active: true });
    // const newAllVisits = allVisits.map((c) => (c._id === id ? { ...c, active: true } : c));
    // dispatch(visitorActions.setAllVisits(newAllVisits));
  }

  async function handleCancelVisit(id) {
    // await cancelVisitor(id);
    // const newAllVisits = allVisits.filter((v) => v._id !== id);
    // dispatch(visitorActions.setAllVisits(newAllVisits));
  }

  return (
    <tr>
      <td className={css.ref}>{reference}</td>
      <td className={css.created}>{createdAt}</td>
      <td className={css.buttons}>
        <button className={css.invite} disabled={active} onClick={() => {}}>
          Invite client
        </button>
        <button className={css.end} disabled={!active} onClick={() => {}}>
          End of visit
        </button>
        <button className={css.cancel} onClick={() => {}}>
          Cancel visit
        </button>
      </td>
    </tr>
  );
};

export default OneVisitCard;
