/* eslint-disable react/prop-types */
import "./SearchInput.scss";

// search input component to show a search input with a search icon and a clear icon
export default function SearchInput({ searchPlaceHolder, searchTerm = "", setSearchTerm = () => { }, }) {
  return (
    <div className="search-input-container">
      <i className="search-icon fa-solid fa-magnifying-glass"></i>
      {searchTerm && <i className="delete-icon fa-solid fa-times" onClick={() => setSearchTerm("")}></i>}
      <input
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
        placeholder={searchPlaceHolder}
        className="search-input"
        type={"text"}
        name={"search-input"}
        id={"search-input"}
      />
    </div>
  );
}
