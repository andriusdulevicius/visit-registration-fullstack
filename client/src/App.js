import React from 'react';
import './Globals.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import Public from './pages/Public';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Public />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
