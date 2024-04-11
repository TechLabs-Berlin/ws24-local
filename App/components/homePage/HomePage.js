import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'; 
import  { EventCardRenderer }  from '../eventCard/EventCardRenderer';
import { toggleBookmark } from '../../helpers/bookmarkHelpers';

const HomePage = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    const fetchEvents = (async () => {
      try {
        const updatedEvents = [];
        const response = await axios.get('http://192.168.1.218:5002/events');
          const allEvents = response.data;
          setBookmarkedEvents(allEvents.filter(e => e.bookmarked));
          
          const numEventsToShow = 15;
          for (let i = 0; i < numEventsToShow; i++) {
            const randomIndex = Math.floor(Math.random() * allEvents.length);
            updatedEvents.push(allEvents[randomIndex]);
          }
          console.log(updatedEvents.length);
          setEvents(updatedEvents);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false); 
      }
    })

    fetchEvents();
  }, []);

  const handleToggleBookmark = (newId) => {
    console.log("newId", newId)
    toggleBookmark(newId, bookmarkedEvents).then((bookmarkedEventsRes) => {
      setBookmarkedEvents(bookmarkedEventsRes);
      setEvents(events.map((event) => (event.id === newId ? { ...event, bookmarked: !event.bookmarked } : event)));
    });

  };

    const _handleRefresh = () => {
    setRefreshing(true); 
    setTimeout(() => {
      setRefreshing(false); 
    }, 2000);

  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Banner.png')}
        style={styles.banner}
      />
      <Text style={styles.upcomingText}>Upcoming events in your area</Text>
      <FlatList
      data={events}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
          const eventId = item.id;
          navigation.navigate('ArtistScreen', { eventId });
        }}>
          <EventCardRenderer
            key={item.id + item.bookmarked}
            event={item}
            toggleBookmark={handleToggleBookmark}
                  // onToggle={() => handleToggleBookmark(item.id)}
                  // bookmarkedEvents={bookmarkedEvents}
                />
              </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_handleRefresh} />}
          ListEmptyComponent={
            <View style={styles.placeholder}>
              <Text style={styles.text}>No bookmarked events</Text>
            </View>
          }
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  banner: {
    width: 394,
    height: 264,
    borderRadius: 10,
    marginBottom: 20,
    left: 18,
  },
  upcomingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 24,
    marginBottom: 10,
    fontFamily: 'Inter_400Regular',
    color: '#3E3D3D',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingLeft: 15,
    
  },
});

export default HomePage;
