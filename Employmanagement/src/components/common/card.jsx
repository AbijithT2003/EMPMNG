import "./card.css";

function Card({ children, className = "", padding = "normal", hover = false }) {
  return (
    <div
      className={`card ${padding === "none" ? "card-no-padding" : ""} ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
