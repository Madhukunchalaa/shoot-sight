import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import './ClientGallery.css';

// ── Lazy image that defers src until it's near the scroll container viewport ──
const LazyImage = ({ src, alt, frameNum, scrollRoot }) => {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Observe against the scroll container, not the window viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        root: scrollRoot,
        rootMargin: '300px 0px', // preload 300px before entering view
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  // Animate in once the image has decoded and painted
  const handleLoad = useCallback(() => {
    setLoaded(true);
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="cgal__img-wrap" ref={wrapRef}>
      {/* Shimmer skeleton shown until image is loaded */}
      {!loaded && <div className="cgal__shimmer" aria-hidden="true" />}

      {/* src is only set once the element is near the viewport */}
      {visible && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          decoding="async"
          style={{ opacity: 0 }}
          onLoad={handleLoad}
        />
      )}

      <div className="cgal__img-frame" aria-hidden="true">
        <span>{frameNum}</span>
      </div>
    </div>
  );
};

// ── Main overlay component ────────────────────────────────────────────────────
const ClientGallery = ({ client, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [bodyEl, setBodyEl] = useState(null); // scroll container element — passed as root to LazyImage

  const animateIn = useCallback(() => {
    gsap.timeline()
      .fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      .fromTo(panelRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.65, ease: 'expo.out' },
        '-=0.15'
      );
  }, []);

  const animateOut = useCallback((cb) => {
    gsap.timeline({ onComplete: cb })
      .to(panelRef.current, { y: '100%', duration: 0.45, ease: 'expo.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.2');
  }, []);

  const handleClose = useCallback(() => {
    animateOut(onClose);
  }, [animateOut, onClose]);

  useEffect(() => {
    if (!client) return;

    animateIn();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [client, animateIn, handleClose]);

  if (!client) return null;

  const [hero, ...rest] = client.images;

  return createPortal(
    <div className="cgal__overlay" ref={overlayRef} aria-modal="true" role="dialog">
      <div className="cgal__panel" ref={panelRef} data-lenis-prevent>

        {/* Header */}
        <header className="cgal__header">
          <div className="cgal__header-left">
            <span className="cgal__header-label">SHOOT @ SIGHT · GALLERY</span>
            <h2 className="cgal__header-couple">{client.couple}</h2>
          </div>
          <div className="cgal__header-right">
            <span className="cgal__frame-count">{client.images.length} FRAMES</span>
            <button className="cgal__close" onClick={handleClose} aria-label="Close gallery">
              <span className="cgal__close-icon">✕</span>
            </button>
          </div>
        </header>

        {/* Scrollable gallery body — ref passed as root to every LazyImage */}
        <div className="cgal__body" ref={setBodyEl}>

          {/* Hero — loads eagerly, it's immediately visible */}
          <div className="cgal__hero-img">
            <img src={hero} alt={`${client.couple} — hero`} loading="eager" decoding="async" />
            <div className="cgal__hero-overlay">
              <span className="cgal__hero-couple">{client.couple}</span>
            </div>
          </div>

          {/* Grid — each image lazy-loaded against the scroll container */}
          {rest.length > 0 && (
            <div className="cgal__grid">
              {rest.map((url, i) => (
                <LazyImage
                  key={url}
                  src={url}
                  alt={`${client.couple} — frame ${i + 2}`}
                  frameNum={String(i + 2).padStart(2, '0')}
                  scrollRoot={bodyEl}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="cgal__footer">
            <span className="cgal__footer-brand">SHOOT @ SIGHT</span>
            <span className="cgal__footer-copy">© 2026</span>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default ClientGallery;
