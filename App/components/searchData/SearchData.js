import React, { useEffect } from 'react';
import axios from 'axios';

const SearchData = ({ searchQuery, onSearchResult }) => {

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://192.168.1.218:5002/search?query=${searchQuery}`);
        onSearchResult(response.data); // Pass the fetched search results to the parent component
      } catch (error) {
        console.error('Error fetching search results:', error);
        onSearchResult([]);
      }
    };

    if (searchQuery && searchQuery !== '') {
      fetchSearchResults(); // Fetch search results only if there is a search query
    } else {
      onSearchResult([]);
    }
  }, [searchQuery]);

  return null; 
};

export default SearchData;