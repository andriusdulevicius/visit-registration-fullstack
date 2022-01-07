import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './AdminScreen.module.css';
import OneVisitCard from './OneVisitCard';
import config from '../../config';
import { consultantActions } from '../../store';
import { getConsultant } from '../../api/fetch';

const AdminScreen = () => {
  const dispatch = useDispatch();

  const consultant = useSelector((state) => state.consultant);
  const { email, visitors: consultantVisitors } = consultant;
  const [visitors, setVisitors] = useState(consultantVisitors || []);

  const getConsultantData = async () => {
    try {
      const consultant = await getConsultant(email);
      setVisitors(consultant.visitors);
      dispatch(consultantActions.setConsultant(consultant));
    } catch (err) {
      console.log(err);
    }
  };

  // Timer to get most recent data
  useEffect(() => {
    const interval = setInterval(async () => {
      await getConsultantData();
    }, config.dataUptadeRate);
    getConsultantData();

    return () => clearInterval(interval);
  }, [email]);

  return (
    <div className='container'>
      <h2 className={css.title}>Client visit management system</h2>
      {visitors?.length > 0 ? (
        <table className={css.table}>
          <thead>
            <tr>
              <td>Client reference:</td>
              <td>Registered at:</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {[...visitors]
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .slice(0, 6)
              .map(({ reference, createdAt, _id, active }) => (
                <OneVisitCard
                  key={_id}
                  id={_id}
                  allVisits={visitors}
                  active={active}
                  reference={reference}
                  createdAt={createdAt.slice(11, 16)}
                  setVisitors={setVisitors}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <div className={css.noVisitors}>Currently there are no visitors in the queue</div>
      )}
    </div>
  );
};

export default AdminScreen;
