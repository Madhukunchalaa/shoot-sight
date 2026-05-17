import { useState } from 'react';
import './FlyingDrone.css';

const FlyingDrone = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/917989776255?text=Hello%20Shoot%20%40%20Sight!%20I'd%20love%20to%20start%20a%20conversation%20about%20our%20celebration.", "_blank");
  };

  return (
    <div 
      className="flying-drone-container"
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Luxury dynamic floating tooltip */}
      <div className={`drone-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span className="tooltip-tag">WHATSAPP DIRECT</span>
        <span className="tooltip-text">Tap to Curation Desk // +91 7989776255</span>
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
