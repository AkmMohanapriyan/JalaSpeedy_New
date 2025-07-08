import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import SubscriptionModal from './Pages/SubscriptionModal';

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/Home'
import UserDashboard from './Pages/UserDashboard'
import SupplierDashboard from './Pages/SupplierDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import LoadingScreen from './Pages/LoadingScreen';

import LoginModal from './Pages/Login';
import RegisterModal from './Pages/Register';


function App() {

  return (
    <>



      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/supplierdashboard" element={<SupplierDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/subscription" element={<SubscriptionModal />} />
      </Routes>

      <RegisterModal />
      <LoginModal />
<ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </>
  )
}

export default App;