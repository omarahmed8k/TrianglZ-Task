import "./RequestErrors.scss";

// request errors component to show a list of errors
export default function RequestErrors({ errosObject = {} }) {
  return (
    <div className="errors-section-container">
      <div className="request-errors-container">
        {Object.keys(errosObject).length > 0 &&
          Object.keys(errosObject).map((errorMsgKey, index) => {
            return (
              <div key={index} className="err-message">
                <i className="fa-solid fa-circle-xmark"></i>
                <h4 className="err-text" dir="ltr">
                  {`${errorMsgKey} : ${errosObject[errorMsgKey]}`}
                </h4>
              </div>
            );
          })}
      </div>
    </div>
  );
}
