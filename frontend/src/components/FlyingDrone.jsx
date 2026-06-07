import { useState } from 'react';
import './FlyingDrone.css';

const FlyingDrone = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/919900233338?text=Hello%20Shoot%20%40%20Sight!%20I'd%20love%20to%20start%20a%20conversation%20about%20our%20celebration.", "_blank");
  };

  return (
    <div 
      className="flying-drone-container"
      aria-label="Chat with Shoot @ Sight on WhatsApp"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`drone-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span className="tooltip-tag">WHATSAPP DIRECT</span>
        <span className="tooltip-text">Tap to Curation Desk // +91 9900233338</span>
      </div>

      <div className="whatsapp-orb">
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M16.02 3.2c-7 0-12.68 5.62-12.68 12.55 0 2.32.66 4.58 1.9 6.54L3.2 28.8l6.7-1.96a12.82 12.82 0 0 0 6.12 1.56c6.99 0 12.68-5.62 12.68-12.55S23.01 3.2 16.02 3.2Zm0 22.98c-1.94 0-3.84-.53-5.5-1.55l-.4-.24-3.96 1.16 1.2-3.84-.26-.4a10.24 10.24 0 0 1-1.57-5.46c0-5.7 4.7-10.33 10.49-10.33 5.78 0 10.48 4.64 10.48 10.33 0 5.7-4.7 10.33-10.48 10.33Zm5.75-7.74c-.31-.16-1.86-.91-2.15-1.01-.29-.11-.5-.16-.7.15-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.32-.48-2.52-1.55-.93-.82-1.56-1.84-1.74-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.7-1.68-.97-2.3-.25-.6-.52-.52-.7-.53h-.6c-.21 0-.54.08-.83.39-.29.31-1.1 1.07-1.1 2.61s1.12 3.03 1.28 3.24c.16.21 2.21 3.34 5.35 4.68.75.32 1.33.51 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.86-.75 2.12-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37Z" />
        </svg>
      </div>
    </div>
  );
};

export default FlyingDrone;
