// src/components/common/Card.jsx
import "./Card.css";

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  variant = "default",
  hoverable = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`card card-${variant} ${
        hoverable ? "card-hoverable" : ""
      } ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && (
            <div className="card-header-action">{headerAction}</div>
          )}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
