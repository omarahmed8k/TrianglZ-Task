import spin from "../../assets/images/spin.png";
import "./LoadingSpinner.scss";

export default function LoadingSpinner() {
  return (
    <div className="overlay-backdrop">
      <div className="overlay-spinner-wrapper">
        <div className="spinner">
          <img loading="lazy" src={spin} alt="spin" />
        </div>
      </div>
    </div>
  );
}
