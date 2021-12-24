import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicScreen from '../components/PublicScreen/PublicScreen';

const Public = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return auth ? <Navigate to='/admin' /> : <PublicScreen />;
};

export default Public;
