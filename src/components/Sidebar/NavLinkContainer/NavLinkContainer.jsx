/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import "./NavLinkContainer.scss";

// navLinkContainer is a wrapper for NavLink that adds a label to the link to use in sidebar
export default function NavLinkContainer({ path, title, icon, onClick, className }) {
  return (
    <div className={`nav-link-container ${className || ""}`}>
      <NavLink
        to={path}
        title={title}
        className={(navData) => navData.isActive ? `active nav-link` : `nav-link`}
        onClick={(e) => { onClick(e); }}
      >
        {icon} <p className="nav-link-label">{title}</p>
      </NavLink>
    </div >
  );
}
