import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Service from './Components/Service/Service';
import Room from './Components/Room/Room';
import Amenities from './Components/Amenities/Amenities';
import Testimonials from './Components/Testimonial/Testimonials';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

export default function HomePage() {
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
