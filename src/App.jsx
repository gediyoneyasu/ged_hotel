import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';

const Book_now = lazy(() => import('./Components/Book_now/Book_now'));
const Auth = lazy(() => import('./Components/Auth/Auth'));
const UserProfile = lazy(() => import('./Components/User/UserProfile'));
const AdminLogin = lazy(() => import('./Components/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./Components/Admin/AdminDashboard'));
const AdminBookings = lazy(() => import('./Components/Admin/AdminBookings'));
const AdminRooms = lazy(() => import('./Components/Admin/AdminRooms'));
const AdminContacts = lazy(() => import('./Components/Admin/AdminContacts'));
const AdminUsers = lazy(() => import('./Components/Admin/AdminUsers'));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: '#c9a66b',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 18,
      }}
    >
      Loading…
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<Book_now />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
