/* eslint-disable react/prop-types */
import noDataIcon from "../../assets/svgs/no-data.svg";
import "./NoData.scss";

// no data component to show when there is no data to show
export default function NoData({ text }) {
  return (
    <div className="no-data-component">
      <img loading="lazy" className="no-data-svg" src={noDataIcon} alt="No Data Icon" />
      <h2 className="no-data-text">{text}</h2>
    </div>
  );
}
