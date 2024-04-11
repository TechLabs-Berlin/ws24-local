import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { RefreshControl } from 'react-native';
import { EventCardRenderer } from '../eventCard/EventCardRenderer';
import { toggleBookmark } from '../../helpers/bookmarkHelpers';

const SavedPage = () => {
  const [selectedTab, setSelectedTab] = useState('events');
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  

  const fetchBookmarkedEvents = async () => {
    try {
      const response = await axios.get('http://192.168.1.218:5002/bookmarked-events');
      setBookmarkedEvents(response.data); // Assuming response.data contains bookmarked events
    } catch (err) {
      console.error('Error fetching bookmarked events:', err);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchBookmarkedEvents();
  }, []);

  const handleToggleBookmark = (newId) => {

    toggleBookmark(newId, bookmarkedEvents).then((updatedBookmarks) => {
      setBookmarkedEvents(updatedBookmarks);
    }).catch((e) => {console.log(error)})

  }



  const _handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch bookmarked events again
      await fetchBookmarkedEvents();
    } catch (error) {
      console.error('Error refreshing bookmarked events:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'events' && styles.selected]}
          onPress={() => setSelectedTab('events')}>
          <View style={styles.tabContent}>
            <MaterialCommunityIcons name="calendar" size={20} />
            <Text style={styles.tabText}>Events</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'venue' && styles.selected]}
          onPress={() => setSelectedTab('venue')}>
          <View style={styles.tabContent}>
            <MaterialCommunityIcons name="map-marker" size={20} />
            <Text style={styles.tabText}>Venue</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'artists' && styles.selected]}
          onPress={() => setSelectedTab('artists')}>
          <View style={styles.tabContent}>
            <MaterialCommunityIcons name="account-music" size={20} />
            <Text style={styles.tabText}>Artists</Text>
          </View>
        </TouchableOpacity>
      </View>
      {selectedTab === 'events' && (
        <FlatList
          data={bookmarkedEvents}
          renderItem={({ item }) => (
            <EventCardRenderer
              key={item.id + item.bookmarked}
              event={item}
              toggleBookmark={handleToggleBookmark}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.placeholder}>
              <Text style={styles.text}>No bookmarked events</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#EFD1DD',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
  },
  tabText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  selected: {
    backgroundColor: '#00000000',
    zIndex: 2,
  },
  text: {
    flex: 1,
    color: '#333',
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const updateBookmarkedEvents = async (newIds) => {
  try {
    const response = await axios.put('http://192.168.1.218:5002/update-bookmarks', { bookmarkedEventIds: newIds });
    console.log('Updating bookmarked events with IDs:', newIds);
    return response.data; // Return the updated data if needed
  } catch (err) {
    console.error('Error updating bookmarked events:', err);
    // Handle error appropriately
    throw err; // Re-throw the error if needed
  }
};

export { SavedPage as default, updateBookmarkedEvents };
