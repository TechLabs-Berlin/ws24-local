import React, { useEffect } from 'react';
import axios from 'axios';

const SearchData = ({ searchQuery, onSearchResult }) => {

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://192.168.1.218:5002/search?query=${searchQuery}`);
        onSearchResult(response.data); 
      } catch (error) {
        console.error('Error fetching search results:', error);
        onSearchResult([]);
      }
    };

    if (searchQuery && searchQuery !== '') {
      fetchSearchResults(); 
    } else {
      onSearchResult([]);
    }
  }, [searchQuery]);

  return null; 
};

export default SearchData;