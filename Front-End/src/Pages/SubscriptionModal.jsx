// src/Pages/SubscriptionModal.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubscriptionModal = ({ show, onClose, onConfirm }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handlePlanChange = (e) => setSelectedPlan(e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete = selectedPlan &&
    paymentDetails.cardHolder &&
    paymentDetails.cardNumber &&
    paymentDetails.expiry &&
    paymentDetails.cvc;

  if (!show) return null;

  return (

    <>

    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg rounded">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Select The Best Plan for Your Needs</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p className="text-muted text-center mb-4">
              Choose a plan that suits your water delivery and usage requirements.
            </p>

            {/* Plans */}
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-stretch subscription-cards gap-3">
              {[
                {
                  id: 'basic',
                  title: 'Basic Monthly Plan',
                  subtitle: 'Perfect for individuals or small households',
                  features: ['4 Water Requests Monthly', 'Up to 1 emergency deliveries', 'Email support']
                },
                {
                  id: 'standard',
                  title: 'Standard Monthly Plan',
                  subtitle: 'Ideal for families with regular water needs',
                  features: ['6 Water Requests Monthly', '2 emergency requests', 'Phone & Email support']
                },
                {
                  id: 'premium',
                  title: 'Premium Monthly Plan',
                  subtitle: 'Best for commercial or high-demand users',
                  features: ['12 Water Requests Monthly', '10 emergency requests', 'Priority Delivery', 'Phone & Email support']
                }
              ].map((plan) => (
                <div key={plan.id} className={`plan-box border p-3 ${selectedPlan === plan.id ? 'border-dark' : ''}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="subscriptionPlan"
                      id={`${plan.id}Plan`}
                      value={plan.id}
                      onChange={handlePlanChange}
                      checked={selectedPlan === plan.id}
                      style={{ display: 'none' }}
                    />
                    <label className="form-check-label w-100" htmlFor={`${plan.id}Plan`}>
                      <h6 className="fw-bold mb-1 text-center">{plan.title}</h6>
                      <hr style={{width: '50%', textAlign:'center', color:'black', backgroundColor: 'black', marginLeft: 'auto', marginRight:'auto'}} />
                      {/* <br /> */}
                        <div className="text-center">
                            <span className="plan-subtitle d-block text-center">{plan.subtitle}</span>
                        </div>
                        {/* <br /> */}
                        <div className="text-center mt-2">
                            <span className="plan-price d-block mb-2 text-center">LKR {plan.id === 'basic' ? '1,000' : plan.id === 'standard' ? '3,000' : '5,000'}</span>
                        </div>

                        <hr />
                      <ul className="mt-2 mb-0 small ps-3 text-right">
                        {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            <div className="mt-5">
              <h6 className="fw-bold mb-3">Enter Payment Details</h6>
              <form className="row g-3">
                <div className="col-md-12">
                  <label className="form-label">Cardholder Name</label>
                  <input type="text" className="form-control" name="cardHolder" value={paymentDetails.cardHolder} onChange={handleChange} />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-control" name="cardNumber" maxLength="16" placeholder="1234 5678 9012 3456" value={paymentDetails.cardNumber} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <label className="form-label">Expiry</label>
                  <input type="text" className="form-control" name="expiry" placeholder="MM/YY" value={paymentDetails.expiry} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <label className="form-label">CVC</label>
                  <input type="text" className="form-control" name="cvc" maxLength="4" placeholder="123" value={paymentDetails.cvc} onChange={handleChange} />
                </div>
              </form>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-cancel p-2" style={{ backgroundColor: '#f44336', color: '#fff', borderRadius: '10px' }} onClick={onClose}>Cancel</button>
            <button className="btn-confirm p-2" style={{ backgroundColor: '#000428', color: '#fff', borderRadius: '10px' }} disabled={!isFormComplete} onClick={() => onConfirm(selectedPlan, paymentDetails)}>Confirm Plan</button>
          </div>
        </div>
      </div>
    </div>



          <style>{`
        .subscription-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .plan-box {
          width: 100%;
          max-width: 300px;
          flex: 1 1 30%;
          border-radius: 15px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        //   background-color: #fff;
        background : linear-gradient(to right,rgb(198, 198, 198),rgb(161, 197, 230));
          color: #000;
          border: 1px solid #ccc;
          box-sizing: border-box;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .plan-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          background-color:#004e92;
        //   color: #fff;
          cursor: pointer;
        }

        .plan-price {
          font-size: 2rem;
          font-weight: bold;
          color: #000;
          margin-top: 10px;
            
        }

        .plan-title {
          font-size: 1.25rem;
          font-weight: 700;
        }


        @media (max-width: 768px) {
          .subscription-cards {
            flex-direction: column;
            align-items: center;
          }
          .plan-box {
            width: 100%;
            max-width: 100%;
            flex: 1 1 100%;
          }
          .modal-title {
            font-size: 1.5rem;
            text-align: center;
          }
        }
      `}</style>

</>

  );
};

export default SubscriptionModal;
