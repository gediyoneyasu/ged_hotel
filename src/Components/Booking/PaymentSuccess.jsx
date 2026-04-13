import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const bookingRef = searchParams.get('booking_ref');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/payment/verify/${bookingRef}`);
        const data = await response.json();
        
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        setStatus('failed');
      }
    };
    
    if (bookingRef) {
      verifyPayment();
    }
  }, [bookingRef]);

  if (status === 'verifying') {
    return (
      <div className="payment-verification">
        <i className="ri-loader-4-line ri-spin"></i>
        <h2>Verifying your payment...</h2>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="payment-success">
        <i className="ri-checkbox-circle-line"></i>
        <h2>Payment Successful!</h2>
        <p>Your booking has been confirmed.</p>
        <p>Booking Reference: <strong>{bookingRef}</strong></p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="payment-failed">
      <i className="ri-close-circle-line"></i>
      <h2>Payment Failed</h2>
      <p>Please try again or contact support.</p>
      <button onClick={() => navigate('/booking')}>Try Again</button>
    </div>
  );
}

export default PaymentSuccess;