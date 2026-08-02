import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import "./Portfolio.css";

const weddingPhotoImg   = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6702.webp";
const weddingFilmImg    = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp";
const preWeddingPhotoImg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/KRP_9777.webp";
const preWeddingFilmImg  = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_I3A6612.webp";

const collections = [
  {
    id: "wedding",
    title: "Wedding",
    script: "collection",
    tagline: "REAL EMOTIONS & INTIMATE MOMENTS",
    panels: [
      { label: "PHOTOGRAPHY",  img: weddingPhotoImg, to: "/portfolio/wedding" },
      { label: "WEDDING FILM", img: weddingFilmImg,  to: "/films" },
    ],
  },
  {
    id: "pre-wedding",
    title: "Pre-Wedding",
    script: "collection",
    tagline: "CAPTURING YOUR LOVE'S FIRST GLANCE",
    panels: [
      { label: "PHOTOGRAPHY",      img: preWeddingPhotoImg, to: "/portfolio/pre-wedding" },
      { label: "PRE-WEDDING FILM", img: preWeddingFilmImg,  to: "/films" },
    ],
  },
];

const Portfolio = () => {
  useSEO({
    title: "Portfolio & Collections | Shoot @ Sight Weddings",
    description: "Explore Wedding Photography, Wedding Films, Pre-Wedding Photography and Pre-Wedding Films by Shoot @ Sight.",
  });

  return (
    <div className="portfolio-collections-page">
      <div className="portfolio-page-header">
        <span className="portfolio-page-eyebrow">01 // COLLECTIONS</span>
        <h1 className="portfolio-page-title">The <i>Archives</i></h1>
      </div>

      <div className="portfolio-collections-wrapper">
        {collections.map((col) => (
          <section key={col.id} className="collection-section">
            <div className="collection-header-row">
              <div className="collection-title-group">
                <span className="collection-serif-title">{col.title}</span>
                <span className="collection-script-word">{col.script}</span>
              </div>
              <div className="collection-header-line" />
              <span className="collection-tagline">{col.tagline}</span>
            </div>

            <div className="collection-panels-row">
              {col.panels.map((panel) => (
                <Link key={panel.label} to={panel.to} className="collection-panel">
                  <img src={panel.img} alt={panel.label} className="collection-panel-img" loading="lazy" />
                  <div className="collection-panel-overlay">
                    <span className="collection-panel-label">{panel.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
