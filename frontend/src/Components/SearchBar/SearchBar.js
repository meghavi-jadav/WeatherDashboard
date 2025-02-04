import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 2) {
      onSearch(value);
    }
  };

  return (
    <div className='searchbar-container'>
      <input
        type='text'
        placeholder='Search City'
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
