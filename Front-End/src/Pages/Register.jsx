import React, { useState } from 'react';
import { Link } from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginModal from './Login';
import axios from 'axios';
import '../assets/Css/Register.css';



const RegisterModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
  username: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
});

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, role, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("danger");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        role,
        password,
      });

      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setMessage("Registration successful!");
      setMessageType("success");

      // After short delay, close this modal and open login modal
      setTimeout(() => {
        const regModal = window.bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        regModal?.hide();

        const loginModal = new window.bootstrap.Modal(document.getElementById('loginModal'));
        loginModal?.show();
      }, 1000);

    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg = err.response?.data?.message || "Registration failed";
      setMessage(errorMsg);
      setMessageType("danger");
    }
  };



  return (
    <>

      {/* Modal */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">

            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fw-bold" id="registerModalLabel">Create an Account</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body px-4 pb-4">
              {message && (
                <div className={`alert alert-${messageType} text-center py-2`} role="alert">
                  {message}
                </div>
              )}

              <div className="form-container">
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your name"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="example@email.com"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Select Role</label>
                    <select className="form-select" id="role" required onChange={handleChange}>
                      <option value="">-- Choose Role --</option>
                      <option value="user">User</option>
                      <option value="supplier">Supplier</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={handleChange}
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

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Re-enter password"
                        required
                        onChange={handleChange}
                      />
                      <button
                        className="btn-outline-secondary input-group-text border-solid-1 bg-secondary text-light cursor-pointer rounded-end"
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn-register rounded-pill">
                      Register
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <small>
                      Already have an account? <Link to={LoginModal} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal" style={{ color: '#00aaff', cursor: 'pointer' }}>Login</Link>
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

export default RegisterModal;
