/* eslint-disable react/prop-types */
import "./MainInput.scss"

export default function MainInput({
  label,
  placeholder,
  type,
  name,
  required,
  register,
  errors,
}) {
  console.log(errors)
  return (
    <div className="main-input-label">
      <label className={`main-label ${errors[name] ? "main-label-error" : ""}`} htmlFor={name}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <input
        autoComplete="off"
        className={`main-input ${errors[name] ? "main-input-error" : ""}`}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
      />
      {errors[name] && (
        <span className="main-span-error">
          {errors[name]?.type === "required" && "This field is required"}
          {errors[name]?.type === "minLength" && "This field is required min length 6"}
          {errors[name]?.type === "checkPassword" && "Password is not correct"}
          {errors[name]?.type === "pattern" && "Password is not correct"}
        </span>
      )}
    </div>
  );
}