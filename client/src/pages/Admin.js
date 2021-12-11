import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm/LoginForm';
import AdminScreen from '../components/AdminScreen/AdminScreen';

const Admin = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {auth && <AdminScreen />}
      {!auth && <LoginForm />}
    </>
  );
};

export default Admin;
