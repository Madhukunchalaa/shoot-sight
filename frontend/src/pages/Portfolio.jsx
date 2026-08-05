import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import "./Portfolio.css";


/* ── Hero strip images (portrait format) ── */
const heroImages = [
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6702.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08292.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/KRP_9777.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_3280.webp",
];

/* ── Featured grid images (landscape format) ── */
const featuredImages = [
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/2S9A9106__4__jpg.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/DSC06041_3__1___2__jpg.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/KRP_9557__3__jpg.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/KRP_9878__2__jpg.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/SAS_2092__2__jpg.webp",
  "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/SASP4766__2__jpg.webp",
];

/* ── Collection sections ── */
const collections = [
  {
    id: "wedding",
    title: "Wedding",
    tagline: "REAL EMOTIONS & INTIMATE MOMENTS",
    panels: [
      { label: "PHOTOGRAPHY",  img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6702.webp", to: "/portfolio/wedding" },
      { label: "WEDDING FILM", img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp", to: "/films" },
    ],
  },
  {
    id: "pre-wedding",
    title: "Pre-Wedding",
    tagline: "CAPTURING YOUR LOVE'S FIRST GLANCE",
    panels: [
      { label: "PHOTOGRAPHY",      img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/KRP_9777.webp", to: "/portfolio/pre-wedding" },
      { label: "PRE-WEDDING FILM", img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_I3A6612.webp", to: "/films" },
    ],
  },
];

/* ══════════════════════════
   LIGHTBOX COMPONENT
══════════════════════════ */
const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const [sliding, setSliding] = useState(false);
  const [dir, setDir] = useState(0);

  const go = useCallback((direction) => {
    if (sliding) return;
    setDir(direction);
    setSliding(true);
    setTimeout(() => {
      setCurrent((c) => (c + direction + images.length) % images.length);
      setSliding(false);
      setDir(0);
    }, 250);
  }, [sliding, images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const slideClass = sliding ? (dir > 0 ? "lb-exit-left" : "lb-exit-right") : "lb-enter";

  return (
    <div className="lb-overlay" onClick={onClose}>
      {/* Close button */}
      <button className="lb-close" onClick={onClose} aria-label="Close">&#10005;</button>

      {/* Image */}
      <div className={`lb-img-wrap ${slideClass}`} onClick={(e) => e.stopPropagation()}>
        <img src={images[current]} alt={`Image ${current + 1}`} />
      </div>

      {/* Prev */}
      <button className="lb-arrow lb-arrow--prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">
        &#8249;
      </button>

      {/* Next */}
      <button className="lb-arrow lb-arrow--next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">
        &#8250;
      </button>

      {/* Counter */}
      <span className="lb-counter">{current + 1} / {images.length}</span>
    </div>
  );
};

/* ══════════════════════════
   PORTFOLIO PAGE
══════════════════════════ */
const Portfolio = () => {
  useSEO({
    title: "Portfolio | Shoot @ Sight Weddings",
    description: "Explore Wedding Photography, Wedding Films, Pre-Wedding Photography and Pre-Wedding Films by Shoot @ Sight.",
  });

  const [lightbox, setLightbox] = useState(null);
  const openLb = (images, index) => setLightbox({ images, index });
  const closeLb = useCallback(() => setLightbox(null), []);

  return (
    <div className="ptf-page">

      {/* ── 1. HERO STRIP ── */}
      <div className="ptf-hero-strip">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`ptf-hero-frame ${i === 2 ? "ptf-hero-frame--center" : ""}`}
            onClick={() => openLb(heroImages, i)}
            style={{ cursor: "pointer" }}
          >
            <img src={img} alt={`Portfolio hero ${i + 1}`} loading={i < 3 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>

      {/* ── 2. COLLECTION SECTIONS ── */}
      {collections.map((col) => (
        <section key={col.id} className="ptf-collection">
          <div className="ptf-col-header">
            <h2 className="ptf-col-heading">
              <span className="ptf-col-serif">{col.title}</span>
              <span className="ptf-col-script">collection</span>
            </h2>
            <div className="ptf-col-line" />
            <span className="ptf-col-tagline">{col.tagline}</span>
          </div>

          <div className="ptf-col-panels">
            {col.panels.map((panel) => (
              <Link key={panel.label} to={panel.to} className="ptf-col-panel">
                <img src={panel.img} alt={panel.label} loading="lazy" className="ptf-col-panel-img" />
                <div className="ptf-col-panel-text"><span>{panel.label}</span></div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* ── 3. FEATURED WEDDING ── */}
      <section className="ptf-featured">
        <div className="ptf-featured-label">
          <span className="ptf-featured-script">Featured</span>
          <span className="ptf-featured-serif">Wedding</span>
          <Link to="/portfolio/wedding" className="ptf-featured-more">VIEW MORE +</Link>
        </div>
        <div className="ptf-featured-grid">
          {featuredImages.map((img, i) => (
            <div key={i} className="ptf-featured-cell" onClick={() => openLb(featuredImages, i)}>
              <img src={img} alt={`Featured ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ LIGHTBOX ══ */}
      {lightbox && (
        <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={closeLb} />
      )}

    </div>
  );
};


export default Portfolio;
