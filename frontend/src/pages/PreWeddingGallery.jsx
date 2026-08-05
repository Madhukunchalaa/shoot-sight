import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import { API_URL } from "../config";
import "./PreWeddingGallery.css";


/* Handpicked High-Res Pre-Wedding R2 Frames */
const curatedPreWeddingFrames = [
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/KRP_9777.webp",
    title: "Ethereal Sunset Promenade",
    category: "Sunset & Nature"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_I3A6612.webp",
    title: "Heritage Doorway Reflection",
    category: "Architecture"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6607.webp",
    title: "Graceful Royal Portrait",
    category: "Editorial"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_3280.webp",
    title: "Intimate Canopy Moment",
    category: "Intimate"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/2S9A3065.webp",
    title: "Royal Courtyard Walk",
    category: "Architecture"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_4849-2.webp",
    title: "Candlelit Garden Whispers",
    category: "Night & Romance"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_4961.webp",
    title: "Golden Hour Embrace",
    category: "Golden Hour"
  },
  {
    url: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp",
    title: "Royal Palace Archway",
    category: "Heritage"
  }
];

const PreWeddingGallery = () => {
  useSEO({
    title: "Pre-Wedding Collection | Shoot @ Sight",
    description: "Explore our pre-wedding photography collection — capturing love\'s first glance with editorial polish and raw emotion.",
  });

  const navigate = useNavigate();
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchShoots = async () => {
      try {
        const res = await fetch(`${API_URL}/shoots`);
        const data = await res.json();
        const preWedding = (data.data || []).filter(
          (s) => s.category?.toLowerCase().includes("pre-wedding")
        );
        setShoots(preWedding);
      } catch (err) {
        console.error("Failed to fetch pre-wedding shoots", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShoots();
  }, []);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? curatedPreWeddingFrames.length - 1 : prev - 1));
  }, [lightboxIndex]);

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === curatedPreWeddingFrames.length - 1 ? 0 : prev + 1));
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevLightbox, nextLightbox]);

  return (
    <div className="pwg-page">

      {/* ── Header ── */}
      <div className="pwg-header">
        <Link to="/portfolio" className="pwg-back">&#8592; BACK TO PORTFOLIO</Link>
        <div className="pwg-title-block">
          <h1 className="pwg-title">
            <span className="pwg-title-serif">Pre-Wedding</span>{" "}
            <span className="pwg-title-script">collection</span>
          </h1>
          <p className="pwg-tagline">CAPTURING YOUR LOVE&apos;S FIRST GLANCE</p>
        </div>
      </div>

      {/* ── Shoots List (if any backend data) ── */}
      {shoots.length > 0 && (
        <div className="pwg-shoots-section">
          <h2 className="pwg-section-heading">Featured Couples Stories</h2>
          <div className="pwg-couples-grid">
            {shoots.map((shoot) => (
              <div
                key={shoot.slug}
                className="pwg-couple-card"
                onClick={() => navigate(`/shoot/${shoot.slug}`)}
              >
                <div className="pwg-couple-img-wrap">
                  <img src={shoot.heroImage} alt={shoot.title} loading="lazy" />
                </div>
                <div className="pwg-couple-overlay">
                  <span className="pwg-couple-name">{shoot.title}</span>
                  <span className="pwg-couple-link">EXPLORE STORY &#8594;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Curated Fine Art Pre-Wedding Grid ── */}
      <div className="pwg-curated-section">
        <div className="pwg-curated-header">
          <span className="pwg-curated-tag">EDITORIAL LOOKBOOK</span>
          <h2 className="pwg-curated-title">Fine Art Pre-Wedding Frames</h2>
        </div>

        <div className="pwg-grid">
          {curatedPreWeddingFrames.map((frame, idx) => (
            <div
              key={idx}
              className="pwg-grid-cell"
              onClick={() => openLightbox(idx)}
            >
              <div className="pwg-cell-img-wrap">
                <img src={frame.url} alt={frame.title} loading="lazy" />
                <div className="pwg-cell-zoom">EXPLORE FULLSCREEN</div>
              </div>
              <div className="pwg-cell-info">
                <span className="pwg-cell-category">{frame.category}</span>
                <h3 className="pwg-cell-title">{frame.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox ── */}
      {lightboxIndex !== null && (
        <div className="pwg-lightbox-modal" onClick={closeLightbox}>
          <button className="pwg-lb-close" onClick={closeLightbox}>✕</button>
          
          <button
            className="pwg-lb-nav pwg-lb-prev"
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
          >
            &#8592;
          </button>

          <div className="pwg-lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={curatedPreWeddingFrames[lightboxIndex].url}
              alt={curatedPreWeddingFrames[lightboxIndex].title}
            />
            <div className="pwg-lb-caption">
              <span>{curatedPreWeddingFrames[lightboxIndex].title}</span>
              <span className="pwg-lb-counter">
                {lightboxIndex + 1} / {curatedPreWeddingFrames.length}
              </span>
            </div>
          </div>
          <button
            className="pwg-lb-nav pwg-lb-next"
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
          >
            &#8594;
          </button>
        </div>
      )}

    </div>
  );
};

export default PreWeddingGallery;
