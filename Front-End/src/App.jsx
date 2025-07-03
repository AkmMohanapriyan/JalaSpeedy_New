import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/Home'
import UserDashboard from './Pages/UserDashboard'
import SupplierDashboard from './Pages/SupplierDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import LoadingScreen from './Pages/LoadingScreen';


function App() {

  return (
    <>



        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/userdashboard" element={<UserDashboard />} /> 
          <Route path="/supplierdashboard" element={<SupplierDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>




    </>
  )
}

export default App
