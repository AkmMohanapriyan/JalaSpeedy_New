


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Css/Navbar.css';
import { Link as ScrollLink } from 'react-scroll';
import LoginModal from '../Pages/Login';
import RegisterModal from '../Pages/Register';

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar py-3 sticky-top">
      <div className="container-fluid">
        {/* Logo / Brand */}
        <a className="navbar-brand fw-bold fs-4" href="#">
          JalaSpeedy
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {['home', 'about', 'features', 'services',  'contact'].map((section) => (
              <li className="nav-item" key={section}>
                <ScrollLink
                  className="nav-link"
                  activeClass="active"
                  to={section}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </ScrollLink>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="d-flex gap-2">

            <button className="btn btn-outline-light btn-sm" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
            <button className="btn btn-light btn-sm text-primary fw-semibold" data-bs-toggle="modal" data-bs-target="#registerModal">Signup</button>

          </div>
        </div>
      </div>
    </nav>

    <LoginModal />
    <RegisterModal/>
</>
  );
};

export default Navbar;
