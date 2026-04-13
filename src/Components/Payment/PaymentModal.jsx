import React, { useState } from 'react';
import './PaymentModal.css';

function PaymentModal({ isOpen, onClose, bookingData, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    setPaymentStatus('');

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('Please login to continue payment.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: bookingData.totalAmount,
          email: bookingData.email,
          fullName: bookingData.fullName,
          phone: bookingData.phone,
          bookingReference: bookingData.bookingReference,
          roomType: bookingData.roomType,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.checkout_url) {
        const summaryData = {
          roomType: bookingData.roomType,
          price: bookingData.price,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          fullName: bookingData.fullName,
          email: bookingData.email,
          phone: bookingData.phone,
          totalAmount: bookingData.totalAmount,
          bookingReference: bookingData.bookingReference,
          nationality: bookingData.nationality,
          specialRequest: bookingData.specialRequest,
          paymentMethod: bookingData.paymentMethod
        };
        sessionStorage.setItem('chapaBookingSummary', JSON.stringify(summaryData));
        
        window.open(data.checkout_url, '_blank');
        setShowVerifyButton(true);
        setPaymentStatus('✅ Payment page opened. After completing payment, click "Verify Payment" below.');
      } else {
        setError(data.message || 'Payment initialization failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Cannot reach API. Make sure backend is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const verifyPaymentManually = async () => {
    setLoading(true);
    setError('');
    setPaymentStatus('');
    
    try {
      const bookingRef = bookingData.bookingReference;
      console.log('Verifying booking:', bookingRef);
      
      const response = await fetch(`http://localhost:5000/api/payment/verify-manual/${bookingRef}`);
      const data = await response.json();
      
      console.log('Verification result:', data);
      
      if (data.success === true) {
        setPaymentStatus('✅ Payment verified! Loading receipt...');
        
        const savedData = sessionStorage.getItem('chapaBookingSummary');
        let verifiedData = bookingData;
        if (savedData) {
          verifiedData = JSON.parse(savedData);
        }
        
        setTimeout(() => {
          onSuccess(verifiedData);
          onClose();
        }, 500);
      } else {
        setError('Payment not verified. Please complete the payment first.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const forceConfirmBooking = async () => {
    setLoading(true);
    setError('');
    setPaymentStatus('');
    
    try {
      const bookingRef = bookingData.bookingReference;
      console.log('Force confirming booking:', bookingRef);
      
      const response = await fetch(`http://localhost:5000/api/payment/force-confirm/${bookingRef}`);
      const data = await response.json();
      
      console.log('Force confirm result:', data);
      
      if (data.success) {
        setPaymentStatus('✅ Booking confirmed! Loading receipt...');
        
        setTimeout(() => {
          onSuccess(bookingData);
          onClose();
        }, 500);
      } else {
        setError('Failed to confirm booking.');
      }
    } catch (err) {
      console.error('Force confirm error:', err);
      setError('Confirmation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <div className="payment-modal-header">
          <h2>Complete Payment</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="payment-modal-body">
          <div className="payment-details">
            <h3>Booking Summary</h3>
            <p><strong>Room:</strong> {bookingData.roomType}</p>
            <p><strong>Check In:</strong> {bookingData.checkIn}</p>
            <p><strong>Check Out:</strong> {bookingData.checkOut}</p>
            <p><strong>Guests:</strong> {bookingData.guests}</p>
            <p><strong>Total:</strong> <span className="amount">${bookingData.totalAmount}</span></p>
            <p><strong>Reference:</strong> {bookingData.bookingReference}</p>
          </div>

          {error && <div className="payment-error">{error}</div>}
          {paymentStatus && <div className="payment-status">{paymentStatus}</div>}

          {!showVerifyButton ? (
            <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
              {loading ? 'Processing...' : `Pay $${bookingData.totalAmount}`}
            </button>
          ) : (
            <>
              <button className="verify-btn" onClick={verifyPaymentManually} disabled={loading}>
                {loading ? 'Verifying...' : '✓ Verify Payment'}
              </button>
              <button className="force-confirm-btn" onClick={forceConfirmBooking} disabled={loading}>
                {loading ? 'Confirming...' : '⚠ Test Mode - Confirm Booking'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;