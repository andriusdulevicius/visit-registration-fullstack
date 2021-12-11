import React from 'react';
import css from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authActions';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser.email);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(authActions.logout());
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to='/' className={css.logo}>
          Book <strong>Your</strong> visit!
        </Link>
        <nav className={css.nav}>
          {isAuthenticated && (
            <>
              <span> Logged in as: {loggedInUser}</span>
              <Link onClick={handleLogout} to='/'>
                Logout
              </Link>
            </>
          )}
          {!isAuthenticated && <Link to='/admin'>For consultants</Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
