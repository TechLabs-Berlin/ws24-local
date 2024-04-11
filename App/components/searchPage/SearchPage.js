// SearchPage.js
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomSearchBar from '../searchBar/SearchBar';
import SearchData from '../searchData/SearchData';
import EventCard from '../eventCard/EventCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchChange = (query) => {
    console.log('Search query:', query); 
    setSearchQuery(query);
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
  };

  const handleSearchResult = (results) => {
    console.log('Search results:', results); 
    setSearchResult(results);
  };
  console.log('Search result state after update:', searchResult);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 style={styles.chevron} name="chevron-left" size={24} color="black" />
        <CustomSearchBar
          value={searchQuery}
          onValueChange={handleSearchChange}
          onCancel={handleCancelSearch}
        />
        <MaterialCommunityIcons style={styles.bell} name="bell" size={24} color="black" />
      </View>

      <SearchData searchQuery={searchQuery} onSearchResult={handleSearchResult} />
      
      {searchResult && searchResult.length > 0 ? (
        <EventCard searchResult={searchResult} />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 77,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#3E3D3D',
  },
  chevron: {
    marginRight: 13
  },
  bell: {
    marginLeft: 13
  },
});

export default SearchPage;
