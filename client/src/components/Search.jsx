import React from 'react';
import { FormControl } from 'react-bootstrap';

const Search = ({ setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <FormControl
        type="text"
        placeholder="Search tasks..."
        className="mb-4"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
