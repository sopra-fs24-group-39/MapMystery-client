import React from "react";
import "../../styles/ui/Searchbar.scss";
import { ReactComponent as SearchIcon } from "./sources/search.svg";

interface SearchBarProps {
  height: string;
  width: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ height, width }) => {
  return (
    <div className="search-bar" style={{ height, width }}>
      <input type="text" placeholder="Enter username..." />
      <button type="submit">
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
