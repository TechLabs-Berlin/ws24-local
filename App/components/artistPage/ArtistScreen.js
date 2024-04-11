import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const ArtistScreen = () => {
  const [events, setEvents] = useState(null); // Rename the state variable to events
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (eventId) => {
      console.log('Fetching data...');
      try {
        const response = await axios.get(`http://192.168.1.218:5002/events/${eventId}`);
        setEvents(response.data); // Assuming the response contains event data
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error)
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    if (eventId) {
      fetchData(eventId);
    }
  }, [eventId]);

  const handleEventTouch = (eventId) => {
    navigation.navigate('ArtistScreen', { eventId }); // Pass eventId as a prop
  };
  

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {events.map(event => (
        <View key={event.id}>      
          <View style={styles.section}>
            <Text style={styles.heading}>Artist:</Text>
            <Text style={styles.text}>{event.artist}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Event:</Text>
            <Text style={styles.text}>{event.summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Date:</Text>
            <Text style={styles.text}>{event.date}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Time:</Text>
            <Text style={styles.text}>{event.time}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Icons:</Text>
            <View style={styles.iconsContainer}>
              <FontAwesome name="spotify" size={30} color="green" style={styles.icon} />
              <FontAwesome name="apple" size={30} color="black" style={styles.icon} />
              <FontAwesome name="amazon" size={30} color="orange" style={styles.icon} />
              <FontAwesome name="google" size={30} color="blue" style={styles.icon} />
              <FontAwesome name="youtube" size={30} color="red" style={styles.icon} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Venue:</Text>
            <Text style={styles.text}>{event.venue}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0, 
    shadowOpacity: 0,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    alignItems: 'left',
    backgroundColor: '#fff',
    paddingTop: 15,
  },
  section: {
    marginTop: 20,
    paddingLeft: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 10, 
    marginRight: 10, 
  },
});

export default ArtistScreen;
