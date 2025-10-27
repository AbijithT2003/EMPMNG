import "./Button.css";

function Button({
  label,
  icon: Icon,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variant}`}
    >
      {Icon && <Icon size={14} />}
      {label}
    </button>
  );
}

export default Button;
