import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Service from './Components/Service/Service';
import Room from './Components/Room/Room';
import Amenities from './Components/Amenities/Amenities';
import Testimonials from './Components/Testimonial/Testimonials';
import Contact from './Components/Contact/Contact';
import Book_now from './Components/Book_now/Book_now';
import Auth from './Components/Auth/Auth';
import UserProfile from './Components/User/UserProfile';
import Footer from './Components/Footer/Footer';


// Admin Imports - ADD THESE
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminBookings from './Components/Admin/AdminBookings';
import AdminRooms from './Components/Admin/AdminRooms';
import AdminContacts from './Components/Admin/AdminContacts';
import AdminUsers from './Components/Admin/AdminUsers';


function HomePage() {
  const location = useLocation();

  React.useEffect(() => {
    const stateTarget = location.state?.scrollTo;
    const savedTarget = sessionStorage.getItem('scrollTarget');
    const targetId = stateTarget || savedTarget;

    if (!targetId) return;

    const scrollTimer = setTimeout(() => {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      sessionStorage.removeItem('scrollTarget');
    }, 120);

    return () => clearTimeout(scrollTimer);
  }, [location.state]);

  return (
    <>
      <Header />
      <Navbar />
      <About />
      <Service />
      <Room />
      <Amenities />
      <Testimonials />
      <Contact />
      <Footer />

    
    </>
  );
}

function App() {
  const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<Book_now />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* Admin Routes - ADD THESE */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </Router>
  );
}

export default App;