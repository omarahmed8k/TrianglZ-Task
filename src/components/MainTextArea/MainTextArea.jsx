/* eslint-disable react/prop-types */
import "./MainTextArea.scss";

// a text area component to be used in the forms
export default function MainTextArea({
  label,
  state,
  setState,
  disabled = false,
  required = false,
}) {
  return (
    <div className="main-text-area-label">
      <label className="text-area-label" htmlFor={"text-area-comment"}>
        {label} {required && <span className="required">*</span>}
      </label>
      <textarea
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className="main-text-area"
        name={"text-area-comment"}
        id={"text-area-comment"}
        placeholder=" "
        disabled={disabled}
      />
    </div>
  );
}
