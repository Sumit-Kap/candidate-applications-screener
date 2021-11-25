import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  width: 60%;
  line-height: 1;
  border: none;
  font-size: 14px;
  margin: 8px;
  height: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  outline: solid;
`;
const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState("");
  return (
    <>
      <SearchInput
        placeholder="Search...."
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
      />
      <button
        onClick={() => {
          onSearch(searchText);
          setSearchText("");
        }}
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;
