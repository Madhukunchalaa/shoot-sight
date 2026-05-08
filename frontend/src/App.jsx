import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShootDetail from './pages/ShootDetail';
import Portfolio from './pages/Portfolio';
import Films from './pages/Films';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shoot/:id" element={<ShootDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/films" element={<Films />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
