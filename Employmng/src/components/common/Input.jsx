// src/components/common/Input.jsx
import "./Input.css";

const Input = ({
  label,
  error,
  icon,
  type = "text",
  fullWidth = false,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div
      className={`input-wrapper ${
        fullWidth ? "input-full-width" : ""
      } ${className}`}
    >
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          className={`input ${error ? "input-error" : ""} ${
            icon ? "input-with-icon" : ""
          }`}
          {...props}
        />
      </div>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
