import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomSearchBar from '../searchBar/SearchBar';
import SearchData from '../searchData/SearchData';
import EventCard from '../eventCard/EventCard';
import axios from 'axios'; 

const MyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://192.168.1.218:5001/events');
        console.log('API Response:', response.data);
        const responseData = response.data
        setEvents(response.data);
        
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchResult = (data) => {
    console.log('Search Result in MyScreen:', data);
    setSearchResult(data);
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    setSearchResult([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fatLocal}>LOCAL</Text>
      <CustomSearchBar
        value={searchQuery}
        onValueChange={handleSearchChange}
        onCancel={handleCancelSearch}
      />
      <SearchData
        searchQuery={searchQuery}
        onSearchResult={handleSearchResult}
      />
      {searchResult !== undefined && ( 
        <EventCard events={searchResult.length > 0 ? searchResult : events} />
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
  fatLocal: {
    marginLeft: 18,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MyScreen;
