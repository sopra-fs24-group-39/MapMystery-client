import React from "react";
import "../../styles/ui/Searchbar.scss";
import { ReactComponent as SearchIcon } from "./sources/search.svg";

interface SearchBarProps {
  height: string;
  width: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ height, width, value, onChange, onKeyPress }) => {
  return (
    <div className="search-bar" style={{ height, width }}>
      <input
        type="text"
        placeholder="Enter username + Enter"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        maxLength={50}
      />
      <button type="submit">
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
