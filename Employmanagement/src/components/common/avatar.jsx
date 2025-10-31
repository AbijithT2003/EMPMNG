import "./avatar.css";

function Avatar({ firstName, lastName, src, size = "medium", className = "" }) {
  const getInitials = () => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className={`avatar avatar-${size} ${className}`}>
      {src ? <img src={src} alt={`${firstName} ${lastName}`} /> : getInitials()}
    </div>
  );
}

export default Avatar;
