import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authActions';
import { getConsultant } from '../../apis/fetch';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();

  const errorList = {
    EMPTY: 'Fields can not be empty, please fill in.',
    INVALID_USER: 'The log in details are incorrect, please try again.',
    INVALID_EMAIL: 'Username section must be a valid email address.',
  };

  const emailValidationRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErr('EMPTY');
      return;
    }
    if (!emailValidationRegex.test(email)) {
      setErr('INVALID_EMAIL');
    }

    const authentification = await getConsultant(email, password, true);
    console.log(authentification);

    if (authentification) {
      dispatch(authActions.login());
    } else return setErr('INVALID_USER');
  };

  useEffect(() => {
    return () => {
      setErr(null);
      setEmail(null);
      setPassword(null);
    };
  }, []);

  return (
    <section className={css.auth}>
      <h2>In order to login please enter your credentials</h2>
      <form>
        <div className={css.control}>
          <input type='email' placeholder='Username' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className={css.control}>
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {err !== '' && <span className={css['error-msg']}>{errorList[err]}</span>}
        <button onClick={loginHandler}>LOGIN</button>
      </form>
    </section>
  );
};

export default LoginForm;
