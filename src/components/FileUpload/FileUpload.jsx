/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import file from '../../assets/images/img.jpg';
import "./FileUpload.scss";

// file upload has 3 types: view, upload, edit
// view: shows the uploaded file, gets the file url from backend and show it
// upload: upload a new file to backend and show it
// edit: show the uploaded file (url) and allow the user to upload a new file to backend and show it
export default function FileUpload({
  uploadedFile,
  setUploadedFile,
  fileRef = null,
  acceptedTypes,
  required = false,
  type = "view" || "upload" || "edit",
  label = "",
}) {
  const { t } = useTranslation();

  const onImageRemove = () => {
    setUploadedFile(null);
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
          onChange={(e) => {
            setUploadedFile(e.target.files[0]);
          }}
          disabled={type === "view"}
          required={false}
          className="file-upload-input"
          name={`file-upload-${label}`}
          id={`file-upload-${label}`}
          placeholder=" "
        />
        <label
          className={`file-upload-click-label ${type === "view" && "view-only"}`}
          htmlFor={`file-upload-${label}`}
        >
          {type === "view"
            ? uploadedFile
              ? t("uploaded")
              : t("noFileUploaded")
            : type === "edit" && uploadedFile
              ? t("uploadAnother")
              : t("upload") + " " + label}
          {type !== "view" && <i className="fas fa-upload upload-icon" />}
        </label>
      </div>

      {(type === "view" || type === "edit") && uploadedFile &&
        (
          <>
            {type !== "view" && uploadedFile && <i className="fas fa-times delete-img-icon" onClick={() => onImageRemove()} />}
            <img
              loading="lazy"
              className="existing-image"
              src={file}
              alt={label}
              onClick={() => {
                typeof uploadedFile === "string"
                  ? window.open(uploadedFile, "_blank")
                  : window.open(URL.createObjectURL(uploadedFile), "_blank");
              }}
            />
          </>
        )}

      {type === "upload" && uploadedFile &&
        (
          <>
            {type !== "view" && uploadedFile && <i className="fas fa-times delete-img-icon" onClick={() => onImageRemove()} />}
            <img
              loading="lazy"
              className="existing-image"
              src={file}
              alt={label}
              onClick={() => {
                typeof uploadedFile === "string"
                  ? window.open(uploadedFile, "_blank")
                  : window.open(URL.createObjectURL(uploadedFile), "_blank");
              }}
            />
          </>
        )}
    </div >
  );
}
