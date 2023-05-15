import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './components/404/PageNotFound';

function App() {
  return (
    <div className='bg-[#e7f2fe] flex justify-center items-center h-screen'>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
