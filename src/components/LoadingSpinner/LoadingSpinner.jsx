import "./LoadingSpinner.scss";

// loading spinner component shows a spinner while the data is loading from backend
export default function LoadingSpinner() {
  return (
    <div className="overlay-backdrop">
      <div className="overlay-spinner-wrapper">
        <div className="spinner">
          {/* <img loading="lazy" src={spin} alt="spin" /> */}
        </div>
      </div>
    </div>
  );
}
