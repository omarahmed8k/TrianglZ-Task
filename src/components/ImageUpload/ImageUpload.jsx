/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import "./ImageUpload.scss";

// Images upload has 3 types: view, upload, edit
// view: shows the uploaded Images, gets the Images url from backend and show it
// upload: upload a new Images to backend and show it
// edit: show the uploaded Images (url) and allow the user to upload a new Images to backend and show it
export default function ImageUpload({
  uploadedImage,
  setUploadedImage,
  fileRef = null,
  acceptedTypes = ".png,.jpeg,.jpg",
  type = "view" || "upload" || "edit",
  label = "",
  required = false,
}) {
  const { t } = useTranslation();

  const onImageRemove = () => {
    setUploadedImage(null);
    if (fileRef && fileRef?.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="file-upload-file-container">
      <div className="file-upload-container">
        <label
          className="file-upload-style-label"
          htmlFor={`file-upload-${label}`}
        >
          {label} {required ? <span className="required">*</span> : null}
        </label>
        <input
          type="file"
          ref={fileRef}
          accept={acceptedTypes}
          required={required}
          onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }}
          disabled={type === "view"}
          className="file-upload-input"
          name={`file-upload-${label}`}
          id={`file-upload-${label}`}
          placeholder=" "
        />
        <label className={`file-upload-click-label ${type === "view" && "view-only"}`} htmlFor={`file-upload-${label}`}>
          {type === "view"
            ? uploadedImage
              ? t("uploaded")
              : t("noImageUploaded")
            : type === "edit" && uploadedImage
              ? t("uploadAnother")
              : t("upload") + " " + label}
          {type !== "view" && <i className="fas fa-upload upload-icon" />}
        </label>
      </div>

      {(type === "view" || type === "edit") && uploadedImage && (
        <>
          {/* if comming image is includes http or https then hide delete icon */}
          {type !== "view" && typeof uploadedImage === "string" && uploadedImage.includes("default-avatar.svg") ? null : (
            <i className="fas fa-times delete-img-icon" onClick={() => onImageRemove()} />
          )}
          <img
            loading="lazy"
            className="existing-image"
            src={
              typeof uploadedImage === "string"
                ? uploadedImage
                : URL.createObjectURL(uploadedImage)
            }
            alt={label}
            onClick={() => {
              typeof uploadedImage === "string"
                ? window.open(uploadedImage, "_blank")
                : window.open(URL.createObjectURL(uploadedImage), "_blank");
            }}
          />
        </>
      )}

      {type === "upload" && uploadedImage && (
        <>
          <i
            className="fas fa-times delete-img-icon"
            onClick={() => onImageRemove()}
          />
          <img
            loading="lazy"
            src={
              typeof uploadedImage === "string"
                ? uploadedImage
                : URL.createObjectURL(uploadedImage)
            }
            alt={label}
            className="existing-image"
            onClick={() => {
              typeof uploadedImage === "string"
                ? window.open(uploadedImage, "_blank")
                : window.open(URL.createObjectURL(uploadedImage), "_blank");
            }}
          />
        </>
      )}
    </div >
  );
}
