import React, { useEffect } from 'react';
import css from './AdminScreen.module.css';
import OneVisitCard from './OneVisitCard';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/authActions';
import { visitsActions } from '../../store/visitsActions';
import { getVisits } from '../../apis/fetch';

const AdminScreen = () => {
  const dispatch = useDispatch();
  const allVisits = useSelector((state) => state.visits.allVisits);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const presentVisits = await getVisits();
        dispatch(visitsActions.getAllVisits(presentVisits));
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(() => {
      fetchData(); // invoke in interval callback
    }, 5000);

    fetchData(); //invoke on mount

    return () => clearInterval(interval);
  });

  function handleLogout() {
    dispatch(authActions.logout());
  }

  return (
    <div className='container'>
      <h2 className={css.title}>Client visit management system</h2>
      {!allVisits && <span>There are no clients waiting at the moment, please wait... </span>}
      {allVisits && (
        <table className={css.table}>
          <thead>
            <tr>
              <td>Client reference:</td>
              <td>Registered at:</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {allVisits.length > 0 &&
              [...allVisits]
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
      )}

      <button className={css.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminScreen;
