import { Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import About from './pages/About';
import ShootDetail from './pages/ShootDetail';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import MobileAppTabBar from './components/MobileAppTabBar';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('admin');

  useLayoutEffect(() => {
    // Return a cleanup function that runs *before* the route path changes (unmount of the old route)
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.querySelectorAll('.pin-spacer').forEach(spacer => {
        if (spacer.children.length === 0) spacer.parentNode?.removeChild(spacer);
      });
    };
  }, [location.pathname]);

  return (
    <>
      <SmoothScroll />
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shoot/:id" element={<ShootDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Portal */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/blog/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileAppTabBar />}
    </>
  );
}

export default App;
