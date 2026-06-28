import './FlyingDrone.css';

const whatsappUrl = "https://wa.me/919900233338?text=Hello%20Shoot%20%40%20Sight!%20I'd%20love%20to%20start%20a%20conversation%20about%20our%20celebration.";

const FlyingDrone = () => {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Shoot @ Sight on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="floating-whatsapp-icon" aria-hidden="true">
        {/* Solid green base of the speech bubble */}
        <path fill="#25d366" d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.27 4.86L2 22l5.3-1.3c1.4.77 3 1.2 4.7 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10z" />
        {/* White outer boundary ring and inner phone icon */}
        <path fill="#ffffff" d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 1.76.46 3.42 1.27 4.86L2 22l5.3-1.3c1.4.77 3 1.2 4.7 1.2 5.52 0 10-4.48 10-10s-4.48-10-10-10zm.09 16.5c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.2 8.2 0 0 1-1.27-4.42c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.55.12-.17.25-.65.8-.8 1-.15.17-.3.2-.55.08-.25-.12-1.05-.38-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.12-.11.26-.29.38-.44.13-.15.17-.25.26-.42.08-.17.04-.32-.02-.44-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38.99 2.54.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29z" />
      </svg>
    </a>
  );
};

export default FlyingDrone;
