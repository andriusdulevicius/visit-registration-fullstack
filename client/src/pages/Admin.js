import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm/LoginForm';
import AdminScreen from '../components/AdminScreen/AdminScreen';

const Admin = () => {
  const auth = useSelector((state) => state.consultant.email);
  return auth ? <AdminScreen /> : <LoginForm />;
};

export default Admin;
