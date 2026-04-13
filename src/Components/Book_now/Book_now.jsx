import React, { useState, useEffect } from "react";
import "./Book_now.css";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentModal from '../Payment/PaymentModal';

function BookNow() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDataForPayment, setBookingDataForPayment] = useState(null);
  const [verifyingReturn, setVerifyingReturn] = useState(false);

  const [formData, setFormData] = useState({
    roomType: "Deluxe Room",
    price: 250,
    checkIn: "",
    checkOut: "",
    guests: 1,
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    specialRequest: "",
    paymentMethod: "chapa",
    agreeTerms: false,
  });

  const roomOptions = [
    { value: "Junior Suite", price: 150, capacity: 2 },
    { value: "Deluxe Room", price: 250, capacity: 2 },
    { value: "Presidential Suite", price: 450, capacity: 4 },
    { value: "Executive Room", price: 320, capacity: 2 },
    { value: "Family Suite", price: 380, capacity: 4 },
    { value: "Honeymoon Suite", price: 520, capacity: 2 },
    { value: "Royal Suite", price: 850, capacity: 4 },
    { value: "Garden Villa", price: 680, capacity: 6 },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // Require login before booking
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      navigate('/auth', { state: { from: '/booking' }, replace: true });
      return;
    }
    try {
      const u = JSON.parse(userData);
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || u?.name || '',
        email: prev.email || u?.email || ''
      }));
    } catch {
      navigate('/auth', { state: { from: '/booking' }, replace: true });
    }
  }, [navigate]);

  // Prefer room chosen on Rooms section
  useEffect(() => {
    const fromRooms = location.state?.roomType;
    if (fromRooms) {
      const match = roomOptions.find((r) => r.value === fromRooms);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          roomType: match.value,
          price: match.price,
        }));
        return;
      }
    }
    const savedData = localStorage.getItem("bookingFormData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, []);

// After Chapa checkout, user lands on /booking?chapa_return=1&tx_ref=...&booking_ref=...
// After Chapa checkout, user lands on /booking?chapa_return=1&tx_ref=...&booking_ref=...
useEffect(() => {
  const q = new URLSearchParams(location.search);
  
  // Check for chapa_return parameter
  if (q.get("chapa_return") !== "1") return;
  
  const txRef = q.get("tx_ref");
  const bookingRef = q.get("booking_ref");
  
  setVerifyingReturn(true);
  
  let cancelled = false;
  
  (async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        navigate('/auth', { state: { from: '/booking' }, replace: true });
        return;
      }

      let data = null;

      if (txRef) {
        console.log("Verifying payment for tx_ref:", txRef);
        const r = await fetch(`http://localhost:5000/api/payment/verify/${encodeURIComponent(txRef)}`);
        data = await r.json();
      } else if (bookingRef) {
        // Some Chapa returns may not include tx_ref; verify using booking_ref
        console.log("Verifying payment for booking_ref:", bookingRef);
        const r = await fetch(`http://localhost:5000/api/payment/verify-by-booking/${encodeURIComponent(bookingRef)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        data = await r.json();
      } else {
        // Fallback: some browsers/providers may drop query params.
        // Use the saved summary (set before opening Chapa) to recover booking reference.
        const savedData = sessionStorage.getItem("chapaBookingSummary");
        const saved = savedData ? JSON.parse(savedData) : null;
        const ref = saved?.bookingReference;

        if (!ref) {
          alert("Missing payment details. Please check your booking in your profile.");
          window.history.replaceState({}, document.title, "/booking");
          setVerifyingReturn(false);
          return;
        }

        console.log("Recovering payment return using saved bookingReference:", ref);
        const r = await fetch(`http://localhost:5000/api/payment/verify-by-booking/${encodeURIComponent(ref)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        data = await r.json();
      }
      
      console.log("Verification response:", data);
      
      if (cancelled) return;
      
      if (data.success) {
        const confirmed = data.booking || null;
        const ref = bookingRef || confirmed?.bookingReference || "";
        setBookingReference(ref);

        if (confirmed) {
          setFormData((prev) => ({
            ...prev,
            roomType: confirmed.roomType || prev.roomType,
            checkIn: confirmed.checkIn || prev.checkIn,
            checkOut: confirmed.checkOut || prev.checkOut,
            guests: confirmed.guests ?? prev.guests,
            fullName: confirmed.fullName || prev.fullName,
            email: confirmed.email || prev.email,
            phone: confirmed.phone || prev.phone,
            price: confirmed.price || prev.price,
            nationality: confirmed.nationality || prev.nationality,
            specialRequest: confirmed.specialRequest || prev.specialRequest,
            paymentMethod: confirmed.paymentMethod || prev.paymentMethod,
            totalAmount: confirmed.totalAmount ?? prev.totalAmount
          }));
        } else if (ref) {
          // If page loaded fresh and verify didn't include booking, fetch by reference
          const token = localStorage.getItem('userToken');
          if (token) {
            const rr = await fetch(`http://localhost:5000/api/bookings/reference/${encodeURIComponent(ref)}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const dd = await rr.json();
            if (rr.ok && dd.success && dd.data) {
              const b = dd.data;
              setFormData((prev) => ({
                ...prev,
                roomType: b.roomType || prev.roomType,
                checkIn: b.checkIn || prev.checkIn,
                checkOut: b.checkOut || prev.checkOut,
                guests: b.guests ?? prev.guests,
                fullName: b.fullName || prev.fullName,
                email: b.email || prev.email,
                phone: b.phone || prev.phone,
                price: b.price || prev.price,
                nationality: b.nationality || prev.nationality,
                specialRequest: b.specialRequest || prev.specialRequest,
                paymentMethod: b.paymentMethod || prev.paymentMethod,
                totalAmount: b.totalAmount ?? prev.totalAmount
              }));
            }
          }
        }

        // IMPORTANT: Show receipt and DON'T navigate away
        setShowSuccess(true);
        setVerifyingReturn(false);
        
        // Remove the query params without navigating away
        window.history.replaceState({}, document.title, "/booking");
        
      } else {
        alert(data.message || "Payment could not be verified.");
        window.history.replaceState({}, document.title, "/booking");
        setVerifyingReturn(false);
      }
      
    } catch (error) {
      console.error("Verification error:", error);
      if (!cancelled) {
        alert("Could not verify payment. Please check your booking status.");
        window.history.replaceState({}, document.title, "/booking");
        setVerifyingReturn(false);
      }
    }
  })();
  
  return () => {
    cancelled = true;
  };
}, [location.search, navigate]);

  // Save to localStorage when form data changes
  useEffect(() => {
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleRoomChange = (e) => {
    const selectedRoom = roomOptions.find((room) => room.value === e.target.value);
    if (!selectedRoom) return;
    setFormData({
      ...formData,
      roomType: selectedRoom.value,
      price: selectedRoom.price,
    });
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    } else {
      const checkInDate = new Date(formData.checkIn);
      checkInDate.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        newErrors.checkIn = "Check-in date cannot be in the past";
      }
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = "Check-out must be after check-in";
    }
    
    if (formData.guests < 1) {
      newErrors.guests = "At least 1 guest required";
    }
    
    const selectedRoom = roomOptions.find(r => r.value === formData.roomType);
    if (selectedRoom && formData.guests > selectedRoom.capacity) {
      newErrors.guests = `Maximum ${selectedRoom.capacity} guests for this room`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }
    
    if (isValid) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateNights = () => {
    const { checkIn, checkOut } = formData;
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const subtotal = nights * formData.price;
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax;
  const bookingDate = new Date().toLocaleString();

  const generateBookingReference = () => {
    return "GED-" + Date.now().toString().slice(-8).toUpperCase();
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateStep3()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/auth', { state: { from: '/booking' }, replace: true });
      return;
    }

    const bookingReference_num = generateBookingReference();
    const totalAmount = totalPrice;

    const bookingData = {
      bookingReference: bookingReference_num,
      roomType: formData.roomType,
      price: formData.price,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nationality: formData.nationality,
      specialRequest: formData.specialRequest,
      paymentMethod: formData.paymentMethod,
      totalAmount: totalAmount,
      status: "pending"
    };

    console.log("Sending booking data:", bookingData);

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    console.log("Response from server:", data);

    if (res.ok && data.success) {
      const reference = data.data.bookingReference || bookingReference_num;
      setBookingReference(reference);
      
      setBookingDataForPayment({
        ...bookingData,
        bookingReference: reference,
        totalAmount: totalAmount
      });
      setShowPaymentModal(true);
    } else {
      throw new Error(data.message || "Booking failed");
    }

  } catch (error) {
    console.error("Booking error:", error);
    alert("❌ There was an error processing your booking. Please try again.\n\nError: " + error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  const handlePaymentSuccess = (booking) => {
    if (booking) {
      setBookingReference(booking.bookingReference || bookingReference);
      setFormData((prev) => ({
        ...prev,
        roomType: booking.roomType || prev.roomType,
        checkIn: booking.checkIn || prev.checkIn,
        checkOut: booking.checkOut || prev.checkOut,
        guests: booking.guests ?? prev.guests,
        fullName: booking.fullName || prev.fullName,
        email: booking.email || prev.email,
        phone: booking.phone || prev.phone,
        price: booking.price || prev.price,
        nationality: booking.nationality || prev.nationality,
        specialRequest: booking.specialRequest || prev.specialRequest,
        paymentMethod: booking.paymentMethod || prev.paymentMethod,
        totalAmount: booking.totalAmount ?? prev.totalAmount
      }));
    }

    setShowPaymentModal(false);
    setShowSuccess(true);
    localStorage.removeItem("bookingFormData");
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    alert("Payment cancelled. You can try again later.");
  };

  const handleNewBooking = () => {
    setShowSuccess(false);
    setStep(1);
    setFormData({
      roomType: "Deluxe Room",
      price: 250,
      checkIn: "",
      checkOut: "",
      guests: 1,
      fullName: "",
      email: "",
      phone: "",
      nationality: "",
      specialRequest: "",
      paymentMethod: "chapa",
      agreeTerms: false,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/");
  };

  const progressPercentage = (step / 3) * 100;

 if (verifyingReturn && !showSuccess) {
  return (
    <div className="book_container">
      <div className="receipt-container">
        <div className="receipt-header">
          <div className="success-icon">
            <i className="ri-loader-4-line ri-spin"></i>
          </div>
          <h1>Verifying payment...</h1>
          <p>Please wait, we are confirming your booking.</p>
        </div>
      </div>
    </div>
  );
}

if (showSuccess) {
  return (
    <div className="book_container">
      <div className="receipt-container">
        {/* Success Header */}
        <div className="receipt-header">
          <div className="success-icon">
            <i className="ri-checkbox-circle-fill"></i>
          </div>
          <h1>Payment Successful!</h1>
          <p>Your booking has been confirmed</p>
        </div>

        {/* Main Receipt Card */}
        <div className="receipt-card">
          <div className="receipt-title">
            <h3>Booking Confirmation</h3>
            <span className="confirmed-badge">CONFIRMED</span>
          </div>

          {/* Hotel Info */}
          <div className="hotel-info">
            <h2>Ged-Hotel</h2>
            <p>Hawassa, Ethiopia</p>
            <p>📞 +251 9xx xxx xxx | ✉ info@gedhotel.com</p>
          </div>

          <div className="divider"></div>

          {/* Booking Reference */}
          <div className="booking-ref">
            <label>Booking Reference</label>
            <div className="ref-code">{bookingReference}</div>
          </div>

          <div className="divider"></div>

          {/* Room Details */}
          <div className="section-title">
            <i className="ri-hotel-line"></i>
            <span>Room Details</span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Room Type</label>
              <p>{formData.roomType}</p>
            </div>
            <div className="detail-item">
              <label>Price per Night</label>
              <p>${formData.price}</p>
            </div>
            <div className="detail-item">
              <label>Check-In</label>
              <p>{formData.checkIn}</p>
            </div>
            <div className="detail-item">
              <label>Check-Out</label>
              <p>{formData.checkOut}</p>
            </div>
            <div className="detail-item">
              <label>Number of Nights</label>
              <p>{nights}</p>
            </div>
            <div className="detail-item">
              <label>Guests</label>
              <p>{formData.guests}</p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Guest Information */}
          <div className="section-title">
            <i className="ri-user-line"></i>
            <span>Guest Information</span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Full Name</label>
              <p>{formData.fullName}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{formData.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{formData.phone}</p>
            </div>
            <div className="detail-item">
              <label>Nationality</label>
              <p>{formData.nationality || 'Not specified'}</p>
            </div>
          </div>

          {formData.specialRequest && (
            <>
              <div className="divider"></div>
              <div className="section-title">
                <i className="ri-chat-1-line"></i>
                <span>Special Request</span>
              </div>
              <div className="special-request">
                <p>{formData.specialRequest}</p>
              </div>
            </>
          )}

          <div className="divider"></div>

          {/* Payment Summary */}
          <div className="section-title">
            <i className="ri-money-dollar-circle-line"></i>
            <span>Payment Summary</span>
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Room Charge ({nights} nights × ${formData.price})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Taxes & Fees (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total Amount Paid</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="divider"></div>

          {/* Payment Status */}
          <div className="payment-status-section">
            <div className="payment-method">
              <i className="ri-secure-payment-line"></i>
              <span>Paid via Chapa</span>
            </div>
            <div className="payment-status-badge">
              <i className="ri-checkbox-circle-line"></i>
              <span>Payment Status: <strong>Completed</strong></span>
            </div>
          </div>

          {/* Footer */}
          <div className="receipt-footer">
            <p>Thank you for choosing Ged-Hotel!</p>
            <p className="note">Please present this receipt at check-in.</p>
            <p className="note">Free cancellation within 24 hours of booking.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="receipt-actions">
          <button className="print-btn" onClick={() => window.print()}>
            <i className="ri-printer-line"></i> Print Receipt
          </button>
          <button className="download-btn" onClick={() => {
            const receiptHTML = document.querySelector('.receipt-card').innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
              <html>
                <head>
                  <title>Ged-Hotel Receipt ${bookingReference}</title>
                  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet">
                  <style>
                    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                    .receipt-card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
                    .hotel-info { text-align: center; margin-bottom: 20px; }
                    .hotel-info h2 { color: #c9a66b; }
                    .divider { height: 1px; background: #eee; margin: 15px 0; }
                    .ref-code { font-size: 20px; font-weight: bold; color: #c9a66b; font-family: monospace; }
                    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                    .detail-item label { font-size: 12px; color: #888; display: block; }
                    .detail-item p { font-size: 16px; font-weight: 500; margin: 5px 0; }
                    .price-breakdown { background: #f8f8f8; padding: 15px; border-radius: 10px; }
                    .price-row { display: flex; justify-content: space-between; padding: 8px 0; }
                    .price-row.total { font-weight: bold; font-size: 18px; border-top: 2px solid #ddd; margin-top: 8px; padding-top: 12px; }
                    .confirmed-badge { background: #4CAF50; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
                    .section-title { display: flex; align-items: center; gap: 10px; margin: 15px 0 10px; }
                    .section-title i { color: #c9a66b; }
                    .receipt-footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
                  </style>
                </head>
                <body>
                  <div class="receipt-card">${receiptHTML}</div>
                  <script>window.onload = () => window.print();</script>
                </body>
              </html>
            `);
            printWindow.document.close();
          }}>
            <i className="ri-download-line"></i> Download Receipt
          </button>
          <button className="home-btn" onClick={handleNewBooking}>
            <i className="ri-home-line"></i> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="book_container" id="booking">
      <h2 className="title">Book Your Room</h2>
      <div className="top_bar">
        <button className="back_btn" onClick={() => navigate("/")}>
          <i className="ri-arrow-left-line"></i>
          Back to Home
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="progress_container">
        <div className="progress_bar">
          <div className="progress_fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="steps">
          <div className={`step_item ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
            <span className="step_number">1</span>
            <span className="step_label">Booking</span>
          </div>
          <div className={`step_item ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
            <span className="step_number">2</span>
            <span className="step_label">Information</span>
          </div>
          <div className={`step_item ${step >= 3 ? "active" : ""}`}>
            <span className="step_number">3</span>
            <span className="step_label">Payment</span>
          </div>
        </div>
      </div>

      <div className="booking_layout">
        <form onSubmit={handleSubmit} className="form">
          {/* STEP 1 - BOOKING DETAILS */}
          {step === 1 && (
            <div className="form_section fade_in">
              <h3>
                <i className="ri-calendar-check-line"></i>
                Booking Details
              </h3>

              <div className="form_group">
                <label>Room Type</label>
                <div className="input_wrapper">
                  <i className="ri-hotel-line"></i>
                  <select value={formData.roomType} onChange={handleRoomChange}>
                    {roomOptions.map(room => (
                      <option key={room.value} value={room.value}>
                        {room.value} - ${room.price}/night (Max {room.capacity} guests)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form_row">
                <div className="form_group">
                  <label>Check-In</label>
                  <div className="input_wrapper">
                    <i className="ri-calendar-line"></i>
                    <input 
                      type="date" 
                      name="checkIn" 
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.checkIn ? "error" : ""}
                    />
                  </div>
                  {errors.checkIn && <span className="error_message">{errors.checkIn}</span>}
                </div>

                <div className="form_group">
                  <label>Check-Out</label>
                  <div className="input_wrapper">
                    <i className="ri-calendar-check-line"></i>
                    <input 
                      type="date" 
                      name="checkOut" 
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className={errors.checkOut ? "error" : ""}
                    />
                  </div>
                  {errors.checkOut && <span className="error_message">{errors.checkOut}</span>}
                </div>
              </div>

              <div className="form_group">
                <label>Number of Guests</label>
                <div className="guest_selector">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                    className="guest_btn"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="guest_count">{formData.guests}</span>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, guests: formData.guests + 1})}
                    className="guest_btn"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
                {errors.guests && <span className="error_message">{errors.guests}</span>}
              </div>

              <div className="form_group">
                <label>Special Request (Optional)</label>
                <div className="input_wrapper">
                  <i className="ri-chat-1-line"></i>
                  <textarea
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    placeholder="Any special requests or preferences?"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <button type="button" onClick={nextStep} className="btn primary_btn">
                Continue to Information
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          )}

          {/* STEP 2 - PERSONAL INFO */}
          {step === 2 && (
            <div className="form_section fade_in">
              <h3>
                <i className="ri-user-line"></i>
                Personal Information
              </h3>

              <div className="form_group">
                <label>Full Name *</label>
                <div className="input_wrapper">
                  <i className="ri-user-line"></i>
                  <input 
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.fullName ? "error" : ""}
                  />
                </div>
                {errors.fullName && <span className="error_message">{errors.fullName}</span>}
              </div>

              <div className="form_row">
                <div className="form_group">
                  <label>Email Address *</label>
                  <div className="input_wrapper">
                    <i className="ri-mail-line"></i>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                  {errors.email && <span className="error_message">{errors.email}</span>}
                </div>

                <div className="form_group">
                  <label>Phone Number *</label>
                  <div className="input_wrapper">
                    <i className="ri-phone-line"></i>
                    <input 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className={errors.phone ? "error" : ""}
                    />
                  </div>
                  {errors.phone && <span className="error_message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form_group">
                <label>Nationality (Optional)</label>
                <div className="input_wrapper">
                  <i className="ri-flag-line"></i>
                  <input 
                    name="nationality" 
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Your nationality"
                  />
                </div>
              </div>

              <div className="btn_group">
                <button type="button" onClick={prevStep} className="btn secondary_btn">
                  <i className="ri-arrow-left-line"></i>
                  Back
                </button>
                <button type="button" onClick={nextStep} className="btn primary_btn">
                  Continue to Payment
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - PAYMENT */}
          {step === 3 && (
            <div className="form_section fade_in">
              <h3>
                <i className="ri-bank-card-line"></i>
                Payment Details
              </h3>

              <div className="price_breakdown">
                <h4>Price Breakdown</h4>
                <div className="breakdown_item">
                  <span>{formData.roomType} × {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="breakdown_item">
                  <span>Taxes & Fees (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="breakdown_total">
                  <span>Total Amount</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="payment_methods">
                <h4>Select Payment Method</h4>
                <label className={`payment_option ${formData.paymentMethod === 'chapa' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="chapa"
                    checked={formData.paymentMethod === 'chapa'}
                    onChange={handleChange}
                  />
                  <i className="ri-secure-payment-line"></i>
                  <span>Chapa</span>
                </label>
                <label className={`payment_option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <i className="ri-bank-card-line"></i>
                  <span>Credit/Debit Card</span>
                </label>
              </div>

              <div className="terms_checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a>
                </label>
                {errors.agreeTerms && <span className="error_message">{errors.agreeTerms}</span>}
              </div>

              <div className="btn_group">
                <button type="button" onClick={prevStep} className="btn secondary_btn">
                  <i className="ri-arrow-left-line"></i>
                  Back
                </button>
                <button 
                  type="submit" 
                  className={`btn pay_btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line ri-spin"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm & Pay ${totalPrice.toFixed(2)}
                      <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>
              </div>

              <div className="secure_notice">
                <i className="ri-shield-check-line"></i>
                <span>Your payment information is encrypted and secure</span>
              </div>
            </div>
          )}
        </form>

        {/* Summary Sidebar */}
        <div className="booking_summary">
          <h3>Booking Summary</h3>
          <div className="summary_content">
            <div className="summary_item">
              <span>Room:</span>
              <strong>{formData.roomType}</strong>
            </div>
            <div className="summary_item">
              <span>Check-in:</span>
              <strong>{formData.checkIn || "—"}</strong>
            </div>
            <div className="summary_item">
              <span>Check-out:</span>
              <strong>{formData.checkOut || "—"}</strong>
            </div>
            <div className="summary_item">
              <span>Nights:</span>
              <strong>{nights}</strong>
            </div>
            <div className="summary_item">
              <span>Guests:</span>
              <strong>{formData.guests}</strong>
            </div>
            <div className="summary_divider"></div>
            <div className="summary_item total">
              <span>Total:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
          <div className="summary_footer">
            <i className="ri-information-line"></i>
            <span>Free cancellation within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && bookingDataForPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handlePaymentCancel}
          bookingData={bookingDataForPayment}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default BookNow;