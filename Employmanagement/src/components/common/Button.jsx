import React from "react";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  icon: Icon,
  size = "medium",
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant} btn-${size} ${
        fullWidth ? "btn-full" : ""
      } ${className}`}
    >
      {Icon && <Icon size={16} className="button-icon" />}
      {children}
    </button>
  );
}

export default Button;
