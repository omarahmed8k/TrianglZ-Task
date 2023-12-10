/* eslint-disable react/prop-types */
export default function MainInput({
  label,
  placeholder,
  type,
  name,
  required,
  register,
  errors,
}) {
  return (
    <div className="main-input-label">
      <label className="main-label" htmlFor={name}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <input
        autoComplete="off"
        className="main-input"
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
      />
      {errors[name] && (
        <span className="error">
          {errors[name]?.type === "required" && "This field is required"}
          {errors[name]?.type === "minLength" && "This field is required min length 6"}
          {errors[name]?.type === "checkPassword" && "Password is not correct"}
        </span>
      )}
    </div>
  );
}