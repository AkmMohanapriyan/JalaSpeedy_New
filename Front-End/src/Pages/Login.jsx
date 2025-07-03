import React, { useState  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Css/login.css';
import RegisterModal from './Register';
import { Link } from 'react-scroll';
import Modal from 'bootstrap/js/dist/modal';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';




const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState(''); // 'success' or 'danger'


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Save token and user to localStorage
      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));

      // Set success message
      setMessage("Login successful!");
      setMessageType("success");

      // Delay closing modal and redirect for UX
      setTimeout(() => {
        const modalEl = document.getElementById("loginModal");
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        // Redirect based on role
        if (res.data.user.role === "admin") {
          navigate("/admindashboard");
        } else if (res.data.user.role === "supplier") {
          navigate("/supplierdashboard");
        } else {
          navigate("/userdashboard");
        }
      }, 1000);

    } catch (err) {
      console.error("Login error:", err);
      setMessage("Invalid email or password.");
      setMessageType("danger");
    }
  };


  return (
    <>

      {/* Modal */}
       <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">

            {/* Modal Header */}
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fw-bold" id="loginModalLabel">Login to JalaSpeedy</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body px-4 pb-4">

              {/* Feedback Message */}
              {message && (
    <div className={`alert alert-${messageType} py-2 text-center`} role="alert">
      {message}
    </div>
  )}

  <div className="form-container">
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="example@jalaspeedy.lk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="input-group border">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="btn-outline-secondary input-group-text border-solid-1 bg-secondary text-light cursor-pointer rounded-end"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </button>
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn-login rounded-pill">Login</button>
      </div>

      <div className="mt-3 text-center">
        <small>
          Don't have an account? <Link to={RegisterModal} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#registerModal">Sign Up</Link>
        </small>
      </div>
    </form>
  </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
