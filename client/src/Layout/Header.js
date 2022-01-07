import React, { useState } from 'react';
import css from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { editConsultantStatus } from '../api/fetch';
import { consultantActions } from '../store';

const Header = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isActive: consultantIsActive, email, visitors } = useSelector((state) => state.consultant);
  const dispatch = useDispatch();

  const handleLogout = async (visitors, email) => {
    const hasClients = visitors.length > 0;
    if (!consultantIsActive && !hasClients) {
      navigate('/');
      dispatch(consultantActions.removeConsultant());
    }

    if (consultantIsActive) {
      setError('Can only logout once not active');
      setTimeout(() => setError(''), 3000);
    }

    if (!consultantIsActive && hasClients) {
      setError('Still have clients in the queue');
      setTimeout(() => setError(''), 3000);
    }
  };

  const setConsultantAsActive = async (status) => {
    const consultant = await editConsultantStatus(email, status);
    dispatch(consultantActions.setConsultant(consultant));
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to='/' className={css.logo}>
          Book <strong>Your</strong> visit!
        </Link>
        <nav className={css.nav}>
          {email && (
            <>
              <span> Logged in as: {email}</span>
              <button
                className={`${css.activeButton} ${consultantIsActive ? css.active : css.inactive}`}
                onClick={() => setConsultantAsActive(!consultantIsActive)}
              >
                Active
              </button>
              <button
                onClick={() => handleLogout(visitors, email)}
                className={`${css.logout} ${consultantIsActive ? css.disabledLogout : css.enabledLogout}`}
              >
                Logout
              </button>
              {error !== '' && <span className={css.error}>{error}</span>}
            </>
          )}
          {!email && <Link to='/admin'>For consultants</Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
