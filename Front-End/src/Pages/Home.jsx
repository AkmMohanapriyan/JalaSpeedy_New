import React, { useEffect, useRef } from 'react';
import '../assets/Css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundVideo from '../assets/BG-VDO.mp4';
import AboutImg from '../assets/About.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginModal from './Login';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HomeAnimation from './HomeAnimation';


const HomeSection = () => {

  const features = [
    {
      icon: 'bi-graph-up',
      title: 'Real-Time Monitoring',
      desc: 'Track live water distribution and usage across all areas in real-time.',
    },
    {
      icon: 'bi-layout-text-window',
      title: 'Customizable Dashboard',
      desc: 'Personalize your dashboard with widgets, usage stats, and alerts.',
    },
    {
      icon: 'bi-bell',
      title: 'Role-Based Notification',
      desc: 'Send tailored alerts to users, admins, or service providers.',
    },
    {
      icon: 'bi-headset',
      title: 'Customer Support Portal',
      desc: '24/7 support system for handling service queries and complaints.',
    },
    {
      icon: 'bi-exclamation-triangle',
      title: 'Emergency Alerts',
      desc: 'Automatically notify affected areas during breakdowns or shortages.',
    },
    {
      icon: 'bi-person-badge',
      title: 'Role-Based Access Control',
      desc: 'Assign permissions based on user roles to ensure secure access.',
    },
    {
      icon: 'bi-shield-lock',
      title: 'Secure Access',
      desc: 'All data is encrypted and access-controlled using modern security.',
    },
    {
      icon: 'bi-bar-chart',
      title: 'Usage Analytics',
      desc: 'Visual reports and metrics to analyze water usage patterns.',
    },
    {
      icon: 'bi-droplet',
      title: 'Water Request System',
      desc: 'Users can easily request water deliveries with scheduling options.',
    },
  ];


  const services = [
  {
    title: 'Scheduled Water Delivery',
    desc: 'Plan and receive water deliveries at your convenience with our booking system.',
    icon: 'bi-truck'
  },
  {
    title: 'Leak Detection Alerts',
    desc: 'Receive instant alerts if pipeline leaks or unusual water usage is detected.',
    icon: 'bi-exclamation-octagon'
  },
  {
    title: 'Usage Monitoring',
    desc: 'Track your daily, weekly, and monthly water consumption from your dashboard.',
    icon: 'bi-graph-up-arrow'
  },
  {
    title: 'Emergency Supply Requests',
    desc: 'Quick request system for immediate water needs during unexpected outages.',
    icon: 'bi-lightning-fill'
  },
  {
    title: 'Water Quality Reports',
    desc: 'Stay informed with real-time water quality updates and analysis.',
    icon: 'bi-droplet-half'
  },
  {
    title: 'Billing & Invoicing',
    desc: 'Access invoices, payment history, and receive billing notifications.',
    icon: 'bi-receipt'
  },
];


  return (
    <>

    <Navbar />
    <HomeAnimation />

      {/* Home Section */}

      {/* <section id="home" className="text-center home-section">

        <video autoPlay loop muted playsInline className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <div className="container-fluid">
          <div className='hero-section'>
          <h1 className="mb-3">JalaSpeedy Trusted Water Supply Partner</h1>

          <p className='text-justify'>Welcome to JalaSpeedy, the modern solution for fast and dependable water delivery services. In an age where every drop counts, we ensure that your home, business, or community never goes without the water it needs. At JalaSpeedy, we’re not just a water supply company — we are a mission-driven team committed to making water accessible, affordable, and timely for everyone. Whether you're facing a shortage, planning ahead, or responding to an emergency, our platform is designed to connect you with verified water suppliers in just a few clicks.</p>
          <p className="mb-4">
            Efficiently manage water distribution, track usage and equitable access to clean water for all communities with our advanced water supply management platform.
          </p>
          <a href={LoginModal} className="btn btn-get-started mb-5" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Get Started</a>
          </div>

          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <div className="icon fs-2">💧</div>
                <h5>Water Request System</h5>
                <p>Users can easily submit water requests with specific details about quantity, date, and location.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <div className="icon fs-2">📊</div>
                <h5>Real-Time Monitoring</h5>
                <p>Administrators can track all water requests and manage distribution efficiently.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <div className="icon fs-2">🔒</div>
                <h5>Secure Access</h5>
                <p>Role-based access control ensures proper authorization for users and admins.</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      {/* About Section */}

      <section id="about">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* <!-- Text Column --> */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="about-title">Who We Are?</h2>
              <p className="about-text">
                JalaSpeedy is a smart and efficient water supply management platform designed to improve how communities, municipalities,
                and organizations manage water distribution. It enables real-time tracking, intelligent scheduling, and ensures
                fair and sustainable access to clean water.
              </p>
              <p className="about-text">
                With user-friendly tools and secure access for all roles—citizens, providers, and admins—JalaSpeedy transforms the traditional
                water supply system into a modern digital solution.
              </p>
            </div>

            {/* <!-- Image Column --> */}
            <div className="col-md-6">
              <img
                src={AboutImg}
                alt="About JalaSpeedy"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}

      <section id="features" className="feature-section py-5">
        <div className="container-fluid">
          <div className="text-center mb-5">
            <h2 className="fw-bold feature-title">Features</h2>
            <p className="">Discover what makes JalaSpeedy reliable and powerful</p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div className="feature-card text-center p-4 h-100 shadow-sm rounded">
                  <div className="feature-icon mb-3">
                    <i className={`bi ${feature.icon} fs-1`}></i>
                  </div>
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p className="">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Services Section */}

       <section id="services" className="service-section py-5 bg-white">
      <div className="container-fluid">
        <div className="text-center mb-5">
          <h2 className="fw-bold service-title">Our Services</h2>
          <p className="">JalaSpeedy provides a range of services to make water supply smarter and accessible</p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="service-card h-100 text-center p-4 shadow-sm bg-light rounded">
                <div className="service-icon mb-3">
                  <i className={`bi ${service.icon} fs-1`}></i>
                </div>
                <h5 className="fw-semibold">{service.title}</h5>
                <p className="">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Contact Section */}

      <section id="contact" className="contact-section py-5">
        <div className="container-fluid">
          {/* Row 1 */}
          <div className="row gy-5">
            {/* Contact Details */}
            <div className="col-md-6">
              <h3 className="mb-4">GetIn Touch</h3>
              <p>Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-envelope-fill me-2 text-primary"></i>
                  Email Us: <a href="mailto:info@jalaspeedy.lk">info@jalaspeedy.lk</a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-telephone-fill me-2 text-primary"></i>
                  Call Us: <a href="tel:+94761989195">+94 76 198 9195</a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                  Visit Us: No. 123, Water Street, Colombo, Sri Lanka
                </li>
                <li className="mb-4">
                  <i className="bi bi-clock-fill me-2 text-primary"></i>
                  Working Hours: 24/7 Support Available
                </li>
              </ul>

              {/* Social Media Icons */}
              <div className="d-flex gap-3 fs-4 social">
                <a href="#" className="text-primary"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-success"><i className="bi bi-whatsapp"></i></a>
                <a href="#" className="text-info"><i className="bi bi-telegram"></i></a>
                <a href="#" className="text-danger"><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-6">
              <h3 className="mb-4">Send Us a Message</h3>
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="First Name" />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Last Name" />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" placeholder="Phone Number" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Message"></textarea>
                </div>
                <button type="submit" className="btn-sendMsg">Send Message</button>
              </form>
            </div>
          </div>

          {/* Row 2 - Google Map */}
          <div className="row mt-5">
            <div className="col">
              <div className="map-responsive">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.6998624333014!2d79.86267917547579!3d9.706636978012943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe4dd58cc450c3%3A0x94ed257173d6e40!2sKarainagar%20Jetty!5e0!3m2!1sen!2slk!4v1751308785009!5m2!1sen!2slk" width="600" height="450" allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>

          {/* Row 3 - Emergency Info */}
          <div className="row mt-5">
            <div className="col emergency-box p-4 rounded bg-white shadow-sm">
              <h4 className="text-danger">Emergency Water Supply System</h4>
              <p className="mb-1">
                For urgent water supply needs outside regular business hours, please contact our
                emergency response team immediately.
              </p>
              <p className="fw-bold">📞 +94 76 198 9195</p>
            </div>
          </div>
        </div>
      </section>

    <Footer />

    </>
  );
};

export default HomeSection;