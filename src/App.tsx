import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Projects from './components/Projects';
import Solutions from './components/Solutions';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Services />
      <Projects />
      <Solutions />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;