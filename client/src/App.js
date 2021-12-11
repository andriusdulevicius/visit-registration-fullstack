import React from 'react';
import './Globals.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
