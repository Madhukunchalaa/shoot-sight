import { useState } from 'react';
import './FlyingDrone.css';

const FlyingDrone = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("Connect via WhatsApp or Instagram");
  const [tooltipTag, setTooltipTag] = useState("SOCIAL DESK");

  const openWhatsApp = (e) => {
    e.stopPropagation();
    window.open("https://wa.me/919900233338?text=Hello%20Shoot%20%40%20Sight!%20I'd%20love%20to%20start%20a%20conversation%20about%20our%20celebration.", "_blank");
  };

  const openInstagram = (e) => {
    e.stopPropagation();
    window.open("https://www.instagram.com/shootatsightweddings", "_blank");
  };

  const resetTooltip = () => {
    setTooltipTag("SOCIAL DESK");
    setTooltipText("Connect via WhatsApp or Instagram");
  };

  return (
    <div 
      className="flying-drone-container"
      onMouseEnter={() => {
        setShowTooltip(true);
        resetTooltip();
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* WhatsApp Badge (Left side) */}
      <div 
        className="drone-social-badge whatsapp-badge"
        onClick={openWhatsApp}
        onMouseEnter={() => {
          setTooltipTag("WHATSAPP DIRECT");
          setTooltipText("Tap to Curation Desk // +91 9900233338");
        }}
        onMouseLeave={resetTooltip}
      >
        <svg viewBox="0 0 24 24" className="social-badge-icon whatsapp-color">
          <path fill="currentColor" d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.27 4.86L2 22l5.3-1.3c1.4.77 3 1.2 4.7 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10zm.09 16.5c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.2 8.2 0 0 1-1.27-4.42c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.55.12-.17.25-.65.8-.8 1-.15.17-.3.2-.55.08-.25-.12-1.05-.38-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.12-.11.26-.29.38-.44.13-.15.17-.25.26-.42.08-.17.04-.32-.02-.44-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38.99 2.54.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29z"/>
        </svg>
      </div>

      {/* Instagram Badge (Right side) */}
      <div 
        className="drone-social-badge instagram-badge"
        onClick={openInstagram}
        onMouseEnter={() => {
          setTooltipTag("INSTAGRAM FEED");
          setTooltipText("Explore our latest visual stories");
        }}
        onMouseLeave={resetTooltip}
      >
        <svg viewBox="0 0 24 24" className="social-badge-icon instagram-color">
          <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      </div>

      {/* Luxury dynamic floating tooltip */}
      <div className={`drone-tooltip ${showTooltip ? 'visible' : ''}`}>
        <div className="tooltip-header">
          {tooltipTag === "WHATSAPP DIRECT" ? (
            <svg viewBox="0 0 24 24" className="tooltip-social-icon whatsapp-color">
              <path fill="currentColor" d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.27 4.86L2 22l5.3-1.3c1.4.77 3 1.2 4.7 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10zm.09 16.5c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.2 8.2 0 0 1-1.27-4.42c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.55.12-.17.25-.65.8-.8 1-.15.17-.3.2-.55.08-.25-.12-1.05-.38-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.12-.11.26-.29.38-.44.13-.15.17-.25.26-.42.08-.17.04-.32-.02-.44-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38.99 2.54.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29z"/>
            </svg>
          ) : tooltipTag === "INSTAGRAM FEED" ? (
            <svg viewBox="0 0 24 24" className="tooltip-social-icon instagram-color">
              <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="tooltip-social-icon" style={{color: '#b89f65'}}>
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          )}
          <span className="tooltip-tag">{tooltipTag}</span>
        </div>
        <span className="tooltip-text">{tooltipText}</span>
      </div>

      {/* Stylized high-tech carbon fiber drone */}
      <div className="drone-mesh-wrapper">
        
        {/* Left wing arm & rotor */}
        <div className="drone-motor-arm arm-left">
          <div className="motor-hub"></div>
          <div className="propeller-blade cw"></div>
        </div>

        {/* Right wing arm & rotor */}
        <div className="drone-motor-arm arm-right">
          <div className="motor-hub"></div>
          <div className="propeller-blade ccw"></div>
        </div>

        {/* Center chassis fuselage */}
        <div className="drone-fuselage">
          {/* Front facing camera lens */}
          <div className="drone-gimbal">
            <div className="camera-aperture"></div>
          </div>
          {/* Status signal gold flashing light */}
          <div className="drone-signal-light"></div>
        </div>

      </div>
    </div>
  );
};

export default FlyingDrone;
