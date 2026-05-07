import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FilmStripGallery.css';
import clientsData from '../data/clients-gallery.json';
import ClientGallery from './ClientGallery';

gsap.registerPlugin(ScrollTrigger);

const FILMS = clientsData.map((client) => ({
  img: client.images[0],
  couple: client.couple,
  imageCount: client.images.length,
  category: 'WEDDING',
}));

const FilmStripGallery = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startScrollY: 0, moved: false });
  const [openClient, setOpenClient] = useState(null);

  // Pure GSAP active-card updater — no React state, no re-renders
  const updateCards = useCallback(() => {
    const vw = window.innerWidth;
    const cx = vw / 2;

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const r = card.getBoundingClientRect();
      const cc = r.left + r.width / 2;
      const dist = Math.abs(cc - cx);
      const maxD = vw * 0.65;
      const t = Math.min(dist / maxD, 1); // 0 = centred, 1 = far

      gsap.to(card, {
        scale: 1 - t * 0.08,
        opacity: 1 - t * 0.52,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      const img = card.querySelector('.fsg__card-img');
      if (img) {
        gsap.to(img, {
          x: (cc - cx) * 0.035,
          duration: 0.55,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }

      const reveals = card.querySelectorAll('.fsg__meta-reveal');
      if (reveals.length) {
        if (t < 0.28) {
          gsap.to(reveals, {
            y: 0,
            opacity: 1,
            stagger: 0.055,
            duration: 0.65,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        } else {
          gsap.to(reveals, {
            y: 9,
            opacity: 0,
            duration: 0.38,
            overwrite: 'auto',
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.innerWidth < 768) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.set(card, { scale: 0.92, opacity: 0.5 });
      gsap.set(card.querySelectorAll('.fsg__meta-reveal'), { y: 9, opacity: 0 });
    });

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.85,
          invalidateOnRefresh: true,
          onEnter: updateCards,
          onUpdate(self) {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
            updateCards();
          },
          onRefresh: updateCards,
        },
      });

      tl.to(track, {
        x: () => -getDistance(),
        ease: 'none',
      });
    }, section);

    // Refresh after paint so scrollWidth is correct with new card sizes
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // ── Drag-to-scroll (desktop) ──────────────────────────
    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startScrollY: window.scrollY,
        moved: false,
      };
      section.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!dragRef.current.active) return;
      const dx = dragRef.current.startX - e.clientX;
      if (Math.abs(dx) > 6) dragRef.current.moved = true;
      window.scrollTo({ top: dragRef.current.startScrollY + dx * 1.65, behavior: 'auto' });
    };

    const onPointerUp = () => {
      dragRef.current.active = false;
      section.style.cursor = 'grab';
    };

    section.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      section.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [updateCards]);

  const handleCardClick = (i) => {
    if (dragRef.current.moved) return;
    setOpenClient(clientsData[i]);
  };

  return (
    <>
      <section ref={sectionRef} className="fsg" aria-label="Film Strip Gallery">

        {/* Cinematic grain */}
        <div className="fsg__grain" aria-hidden="true" />

        {/* Corner editorial labels */}
        <div className="fsg__corner fsg__corner--tl" aria-hidden="true">
          <span>SHOOT @ SIGHT</span>
          <span>FILM ARCHIVE</span>
        </div>
        <div className="fsg__corner fsg__corner--tr" aria-hidden="true">
          <span>35MM</span>
          <span>INDIA</span>
        </div>
        <div className="fsg__corner fsg__corner--bl" aria-hidden="true">
          <span>DRAG TO TRAVEL</span>
        </div>
        <div className="fsg__corner fsg__corner--br" aria-hidden="true">
          <span>©2026</span>
        </div>

        {/* Fixed section title */}
        <div className="fsg__title" aria-label="Section heading">
          <span className="fsg__title-label">02 // THE GALLERY</span>
          <h2 className="fsg__title-heading">
            Frames<br />
            <em>In Time</em>
          </h2>
        </div>

        {/* ── The moving film track ──────────────────────── */}
        <div className="fsg__track" ref={trackRef}>

          {/* Top perforation strip */}
          <div className="fsg__perf fsg__perf--top" aria-hidden="true" />

          {/* Film body */}
          <div className="fsg__strip">

            {/* Leading film slate */}
            <div className="fsg__leader" aria-hidden="true">
              <div className="fsg__leader-inner">
                <span className="fsg__leader-brand">SHOOT @ SIGHT</span>
                <div className="fsg__leader-bars">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`fsg__leader-bar fsg__leader-bar--${i % 3}`} />
                  ))}
                </div>
                <span className="fsg__leader-id">INDIA · 2026</span>
              </div>
            </div>

            {/* Film cards */}
            {FILMS.map((film, i) => (
              <article
                key={i}
                className="fsg__card"
                ref={(el) => (cardsRef.current[i] = el)}
                aria-label={`${film.couple} — open gallery`}
                onClick={() => handleCardClick(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Frame badge */}
                <div className="fsg__frame" aria-hidden="true">
                  <span className="fsg__frame-label">FRAME</span>
                  <span className="fsg__frame-num">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Image */}
                <div className="fsg__img-wrap">
                  <img
                    src={film.img}
                    alt={`${film.couple} wedding cover`}
                    className="fsg__card-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="fsg__vignette" aria-hidden="true" />
                </div>

                {/* Metadata — revealed by GSAP when card is centred */}
                <div className="fsg__meta" aria-hidden="true">
                  <span className="fsg__meta-reveal fsg__meta-cat">{film.category}</span>
                  <h3 className="fsg__meta-reveal fsg__meta-couple">{film.couple}</h3>
                  <p className="fsg__meta-reveal fsg__meta-caption">{film.imageCount} frames</p>
                  <div className="fsg__meta-reveal fsg__meta-loc">
                    <span>VIEW GALLERY</span>
                    <span className="fsg__dot">·</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}

            {/* Trailing film slate */}
            <div className="fsg__leader fsg__leader--end" aria-hidden="true">
              <div className="fsg__leader-inner">
                <span className="fsg__leader-brand">END ROLL</span>
              </div>
            </div>

          </div>
          {/* Bottom perforation strip */}
          <div className="fsg__perf fsg__perf--bottom" aria-hidden="true" />
        </div>

        {/* Scroll progress line */}
        <div className="fsg__progress" aria-hidden="true">
          <div className="fsg__progress-bar" ref={progressRef} />
        </div>

      </section>

      <ClientGallery client={openClient} onClose={() => setOpenClient(null)} />
    </>
  );
};

export default FilmStripGallery;
