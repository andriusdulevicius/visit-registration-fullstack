import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './AdminScreen.module.css';
import OneVisitCard from './OneVisitCard';
import config from '../../config';
import { authActions, consultantActions } from '../../store';
import { getConsultant } from '../../apis/fetch';

const AdminScreen = () => {
  const dispatch = useDispatch();

  const [consultant, setConsultant] = useState(undefined);
  const consultantVisitors = consultant?.visitors;
  const consultantEmail = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getConsultantData = () => {
      getConsultant(consultantEmail)
        .then((consultant) => {
          setConsultant(consultant);
          dispatch(consultantActions.setConsultant(consultant));
        })
        .catch((err) => console.log(err));
    };

    const interval = setInterval(() => {
      getConsultantData();
    }, config.dataUptadeRate);
    getConsultantData();

    return () => clearInterval(interval);
  }, [consultantEmail]);

  function handleLogout() {
    dispatch(authActions.logout());
  }

  return (
    <div className='container'>
      <h2 className={css.title}>Client visit management system</h2>
      {!consultantVisitors && <span>There are no clients waiting at the moment, please wait... </span>}
      {consultantVisitors?.length > 0 ? (
        <table className={css.table}>
          <thead>
            <tr>
              <td>Client reference:</td>
              <td>Registered at:</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {consultantVisitors
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .slice(0, 6)
              .map(({ reference, createdAt, _id, active }) => (
                <OneVisitCard
                  key={_id}
                  id={_id}
                  active={active}
                  reference={reference}
                  createdAt={createdAt.slice(11, 16)}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <div className={css.noVisitors}>Currently there are no visitors in the queue</div>
      )}

      {/* <button className={css.logout} onClick={handleLogout}>
        Logout
      </button> */}
    </div>
  );
};

export default AdminScreen;
