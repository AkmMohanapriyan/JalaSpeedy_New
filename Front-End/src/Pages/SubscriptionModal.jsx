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
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg rounded">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Select The Best Plan for Your Needs</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p className="text-muted mb-4">
              Choose a plan that suits your water delivery and usage requirements.
            </p>

            {/* Plans */}
            <div className="d-flex flex-column gap-3">
              {[
                {
                  id: 'basic',
                  title: 'Basic Monthly Plan',
                  subtitle: 'Perfect for individuals or small households',
                  features: ['1000 Liters/month', 'Up to 4 emergency deliveries', 'Email support']
                },
                {
                  id: 'standard',
                  title: 'Standard Monthly Plan',
                  subtitle: 'Ideal for families with regular water needs',
                  features: ['3000 Liters/month', 'Unlimited emergency requests', 'Phone & Email support']
                },
                {
                  id: 'premium',
                  title: 'Premium Monthly Plan',
                  subtitle: 'Best for commercial or high-demand users',
                  features: ['8000 Liters/month', 'Priority delivery support', 'Dedicated account manager']
                }
              ].map((plan) => (
                <div key={plan.id} className={`plan-box border rounded p-3 ${selectedPlan === plan.id ? 'border-primary' : ''}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="subscriptionPlan"
                      id={`${plan.id}Plan`}
                      value={plan.id}
                      onChange={handlePlanChange}
                      checked={selectedPlan === plan.id}
                    />
                    <label className="form-check-label w-100" htmlFor={`${plan.id}Plan`}>
                      <h6 className="fw-bold mb-1">{plan.title}</h6>
                      <small className="text-muted">{plan.subtitle}</small>
                      <ul className="mt-2 mb-0 small ps-3">
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
            <button className="btn-confirm p-2" style={{ backgroundColor: '#000428', color: '#fff', borderRadius: '10px' }} disabled={!isFormComplete} onClick={onConfirm}>Confirm Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
