/* eslint-disable react/prop-types */
import "./MainButton.scss";

// main button component to use in the whole app
export default function MainButton({
  text = "",
  type = "",
  icon = "",
  className = "",
  loading = false,
  onClick = () => { },
}) {
  return (
    <button className={`main-button ${type === "cancel" ? "cancel-btn" : type} ${className} `} onClick={onClick} disabled={loading}>
      {loading ? (<div className="loader" />) : (<>{icon && icon} {text}</>)}
    </button>
  );
}
