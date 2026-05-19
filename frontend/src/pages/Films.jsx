import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Films.css';

const films = [
  {
    id: 'E6mpqvgMyUY',
    label: "DIRECTOR'S CUT",
    location: "DUBAI",
    num: "01"
  },
  {
    id: 'wLqHwzM9ABo',
    label: "CINEMATIC ESSENCE",
    location: "INDIA",
    num: "02"
  },
  {
    id: 'a94LGkUt3Pg',
    label: "THE SYMPHONY",
    location: "INDIA",
    num: "03"
  },
  {
    id: 'b58Iizh8Dfg',
    label: "ETERNAL NARRATIVE",
    location: "INDIA",
    num: "04"
  }
];

const Films = () => {
  const [activeFilm, setActiveFilm] = useState(null);

  useGSAP(() => {
    gsap.from('.film-card', {
      y: 60,
      opacity: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, []);

  const openFilm = (film) => {
    setActiveFilm(film);
    document.body.style.overflow = 'hidden';
  };

  const closeFilm = () => {
    setActiveFilm(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="films-page section-padding">
      <div className="container">
        <div className="films-page-header">
          <span className="subtitle-accent">03 // FEATURED FILMS</span>
          <h1 className="section-title-large">Cinematic <i>Poetry</i></h1>
          <p className="films-page-desc">
            Experience the raw emotion, the fleeting glances, and the symphony of love in motion.
            Click any film to watch with full audio.
          </p>
        </div>

        <div className="films-grid">
          {films.map((film) => (
            <div
              key={film.id}
              className="film-card"
              onClick={() => openFilm(film)}
            >
              <div className="film-card-thumb">
                <img
                  src={`https://img.youtube.com/vi/${film.id}/hqdefault.jpg`}
                  alt={film.label}
                  loading="lazy"
                  onError={(e) => { e.target.src = `https://img.youtube.com/vi/${film.id}/mqdefault.jpg`; }}
                />
                <div className="film-card-overlay">
                  <div className="film-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="film-card-meta">
                <span className="film-card-num">{film.num}</span>
                <div>
                  <div className="film-card-label">{film.label}</div>
                  <div className="film-card-location">{film.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Film Modal */}
      {activeFilm && (
        <div className="film-modal-overlay" onClick={closeFilm}>
          <div className="film-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="film-modal-close" onClick={closeFilm}>✕</button>
            <div className="film-modal-meta">
              <span className="film-modal-num">{activeFilm.num}</span>
              <span className="film-modal-title">{activeFilm.label} // {activeFilm.location}</span>
            </div>
            <div className="film-modal-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeFilm.id}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                title={activeFilm.label}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Films;
