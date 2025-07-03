import React, { useEffect } from 'react';
import '../assets/Css/Animation.css';
import LoginModal from './Login';


const JalaSpeedyHome = () => {
  useEffect(() => {
    const homeSection = document.querySelector('.home-section');
    
    // Create water drops
    const createWaterDrops = () => {
      for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.classList.add('water-drop');
        
        const size = Math.random() * 5 + 3;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 2 + 1;
        
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${left}vw`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.animationDuration = `${duration}s`;
        
        homeSection.appendChild(drop);
      }
    };
    
    // Create bubbles
    const createBubbles = () => {
      for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 10;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}vw`;
        bubble.style.bottom = `-${size}px`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        homeSection.appendChild(bubble);
      }
    };
    
    // Create pipe connections
    const createPipeConnections = () => {
      for (let i = 0; i < 20; i++) {
        const pipe = document.createElement('div');
        pipe.classList.add('pipe-connection');
        
        const size = Math.random() * 6 + 2;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        
        pipe.style.width = `${size}px`;
        pipe.style.height = `${size}px`;
        pipe.style.top = `${top}vh`;
        pipe.style.left = `-${size}px`;
        pipe.style.animationDelay = `${delay}s`;
        pipe.style.animationDuration = `${duration}s`;
        
        homeSection.appendChild(pipe);
      }
    };
    
    // Create water ripples
    const createWaterRipples = () => {
      for (let i = 0; i < 8; i++) {
        const ripple = document.createElement('div');
        ripple.classList.add('water-ripple');
        
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${left}vw`;
        ripple.style.top = `${top}vh`;
        ripple.style.animationDelay = `${delay}s`;
        
        homeSection.appendChild(ripple);
      }
    };
    
    // Create water splashes
    const createWaterSplashes = () => {
      for (let i = 0; i < 15; i++) {
        const splash = document.createElement('div');
        splash.classList.add('water-splash');
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 1;
        
        splash.style.left = `${left}vw`;
        splash.style.top = `${top}vh`;
        splash.style.animationDelay = `${delay}s`;
        splash.style.animationDuration = `${duration}s`;
        
        homeSection.appendChild(splash);
      }
    };
    
    // Create faucet drips
    const createFaucetDrips = () => {
      for (let i = 0; i < 10; i++) {
        const drip = document.createElement('div');
        drip.classList.add('faucet-drip');
        
        const left = Math.random() * 100;
        const top = Math.random() * 30;
        const delay = Math.random() * 3;
        const duration = Math.random() * 2 + 1;
        
        drip.style.left = `${left}vw`;
        drip.style.top = `${top}vh`;
        drip.style.animationDelay = `${delay}s`;
        drip.style.animationDuration = `${duration}s`;
        
        homeSection.appendChild(drip);
      }
    };
    
    // Initialize all animations
    createWaterDrops();
    createBubbles();
    createPipeConnections();
    createWaterRipples();
    createWaterSplashes();
    createFaucetDrips();
    
    // Add interactive element - create ripple on click
    const handleClick = (e) => {
      const ripple = document.createElement('div');
      ripple.classList.add('water-ripple');
      
      ripple.style.width = `50px`;
      ripple.style.height = `50px`;
      ripple.style.left = `${e.clientX - 25}px`;
      ripple.style.top = `${e.clientY - 25}px`;
      ripple.style.animationDuration = `1.5s`;
      
      homeSection.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1500);
    };
    
    homeSection.addEventListener('click', handleClick);
    
    // Cleanup function
    return () => {
      homeSection.removeEventListener('click', handleClick);
      // Remove all animation elements
      const animationElements = document.querySelectorAll('.water-drop, .bubble, .pipe-connection, .water-ripple, .water-splash, .faucet-drip');
      animationElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <section className="home-section" id='home'>

        <div className="container-fluid">
          <div className='hero-section'>
          <h1 className="mb-3">JalaSpeedy Trusted Water Supply Partner</h1>

          <p className='text-justify'>Welcome to JalaSpeedy, the modern solution for fast and dependable water delivery services. In an age where every drop counts, we ensure that your home, business, or community never goes without the water it needs. At JalaSpeedy, we’re not just a water supply company — we are a mission-driven team committed to making water accessible, affordable, and timely for everyone. Whether you're facing a shortage, planning ahead, or responding to an emergency, our platform is designed to connect you with verified water suppliers in just a few clicks.</p>
          <button onClick={LoginModal} className="btn btn-get-started mb-5 mt-4" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Get Started</button>
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

    </section>
  );
};

export default JalaSpeedyHome;