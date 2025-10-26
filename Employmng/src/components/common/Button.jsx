// src/components/common/Button.jsx
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  ...props
}) => {
  const className = `btn btn-${variant} btn-${size} ${
    fullWidth ? "btn-full-width" : ""
  } ${loading ? "btn-loading" : ""}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};

export default Button;
