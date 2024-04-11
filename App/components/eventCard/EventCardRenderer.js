import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const venueTypes = ['Bar', 'Club', 'Theater', 'Concert Hall', 'Park', 'Cafe', 'Private'];

const getRandomVenueType = () => {
  const randomIndex = Math.floor(Math.random() * venueTypes.length);
  return venueTypes[randomIndex];
};



export const EventCardRenderer = ({event, toggleBookmark,}) => {

    const navigation = useNavigation();

    const handleArtistPress = () => {
      navigation.navigate('ArtistScreen', { eventId: event.id });
    };
        return (
            <View key={`${event.id}}`} style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={event.imageURL ? { uri: event.imageURL } : require('../../assets/images/Placeholder_Concert.jpg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.details}>
              <Pressable onPress={handleArtistPress}>
                <Text style={styles.artist}>{event?.artist}</Text>
                </Pressable>
                <View style={styles.venueDateContainer}>
                  <Text style={styles.venue}>{event?.venue}</Text>
                  <Text style={styles.date}>{event?.date}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{event.venueType || getRandomVenueType()}</Text>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>€{event.price || Math.floor(Math.random() * (50 - 5 + 1)) + 5}</Text>
                  </View>
                  {
                    toggleBookmark ? 
                    <TouchableOpacity onPress={() => toggleBookmark(event.id)} style={styles.bookmarkIcon}>
                    <MaterialCommunityIcons
                      name={event?.bookmarked ? 'bookmark' : 'bookmark-outline'}
                      size={24}
                      color={event?.bookmarked ? '#3E3D3D' : '#3E3D3D'}
                    />
                  </TouchableOpacity>
                  :null
                  }
                </View>
              </View>
            </View>
          );

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    imageContainer: {
      width: 77,
      height: 77,
      marginRight: 22,
      marginLeft: 15,
      borderRadius: 14,
      resizeMode: 'cover',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    details: {
      flex: 1,
      marginLeft: 10,
    },
    artist: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      marginBottom: 3,
    },
    venueDateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    venue: {
      fontSize: 13,
      color: '#3E3D3D',
      marginRight: 10,
    },
    date: {
      fontSize: 13,
      color: '#3E3D3D',
      position: 'absolute',
      top: -22,
      right: 13,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    button: {
      width: 90,
      height: 30,
      backgroundColor: '#E5D9F2',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 15,
      marginTop: 3,
    },
    buttonText: {
      fontSize: 12,
      fontFamily: 'Inter_300Light',
      color: '#3E3D3D',
    },
    bookmarkIcon: {
      position: 'absolute',
      bottom: 1,
      right: 4,
    },
    placeholderContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    placeholderText: {
      fontSize: 16,
      color: '#3E3D3D',
    },
  });