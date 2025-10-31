import "./input.css";

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  className = "",
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-container">
        {Icon && (
          <div className="input-icon">
            <Icon size={16} />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`input ${error ? "input-error" : ""} ${
            Icon ? "input-with-icon" : ""
          }`}
        />
      </div>
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}

export default Input;
