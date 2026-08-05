import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import { API_URL } from "../config";
import "./WeddingGallery.css";


const WeddingGallery = () => {
  useSEO({
    title: "Wedding Photography | Shoot @ Sight",
    description: "Explore our wedding photography portfolio — real emotions, intimate moments, and timeless memories.",
  });

  const navigate = useNavigate();
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoots = async () => {
      try {
        const res = await fetch(`${API_URL}/shoots`);
        const data = await res.json();
        // Filter only Wedding category shoots
        const weddingShoots = (data.data || []).filter(
          (s) => s.category?.toLowerCase() === "wedding"
        );
        setShoots(weddingShoots);
      } catch (err) {
        console.error("Failed to fetch shoots", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShoots();
  }, []);

  return (
    <div className="wg-page">

      {/* Header */}
      <div className="wg-header">
        <Link to="/portfolio" className="wg-back">&#8592; BACK TO GALLERIES</Link>
        <h1 className="wg-title">
          celebrating{" "}
          <span className="wg-title-normal">Unforgettable</span>{" "}
          <span className="wg-title-script">Moments</span>
        </h1>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="wg-loading">
          <span className="wg-spinner" />
        </div>
      )}

      {/* 2-column couple grid */}
      {!loading && (
        <div className="wg-grid">
          {shoots.map((shoot) => (
            <div
              key={shoot.slug}
              className="wg-cell"
              onClick={() => navigate(`/shoot/${shoot.slug}`)}
            >
              <img
                src={shoot.heroImage}
                alt={shoot.title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_8213.webp";
                }}
              />
              <div className="wg-cell-overlay">
                <span className="wg-couple-name">{shoot.title}</span>
              </div>
            </div>
          ))}

          {/* If odd number — fill last cell with a quote */}
          {shoots.length % 2 !== 0 && (
            <div className="wg-cell wg-cell--quote">
              <div className="wg-quote-inner">
                <span className="wg-quote-text">&#8220;Every love story is beautiful, but yours is our favourite.&#8221;</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};




export default WeddingGallery;
