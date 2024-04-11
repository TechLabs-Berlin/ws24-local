import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AddEvent = () => {
  const [artistName, setArtistName] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [aboutArtist, setAboutArtist] = useState('');
  const [aboutEvent, setAboutEvent] = useState('');
  const [aboutVenue, setAboutVenue] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [eventImage, setEventImage] = useState(null); 

  const handleIconPress = (iconName) => {
   
    console.log(`Icon '${iconName}' pressed`);
  };

  const handleImageUpload = () => {
    const options = {
      title: 'Select Event Image',
      storageOptions: {
        skipBackup: true,
        path: 'images', 
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Image Picker Response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('Image picker error:', response.error);
      } else {
        const source = { uri: response.uri };
        setEventImage(source); 
      }
    });
  };

  const handleAddEvent = () => {
   
    console.log('Event submitted:', {
      artistName,
      eventName,
      eventImage,
      date,
      location,
      eventStarts,
      eventEnds,
      artistLinks,
      aboutArtist,
      aboutEvent,
      aboutVenue,
    });
  };

  return (
    <View style={styles.container}>
      {eventImage && (
        <Image source={eventImage} style={styles.image} />
      )}
      <TouchableOpacity onPress={handleImageUpload} style={styles.button1}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Artist's Name:</Text>
        <TextInput
          value={artistName}
          onChangeText={setArtistName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Event's Name:</Text>
        <TextInput
          value={eventName}
          onChangeText={setEventName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Location:</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={styles.inputLocation}
        />
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.labelTextDate}>Date:</Text>
        <TextInput
          value={day}
          onChangeText={setDay}
          placeholder="DD"
          maxLength={2}
          style={[styles.input, styles.dateInput]}
        />

        <TextInput
          value={month}
          onChangeText={setMonth}
          placeholder="MM"
          maxLength={2}
          style={[styles.input, styles.dateInput]}
        />

        <TextInput
          value={year}
          onChangeText={setYear}
          placeholder="YY"
          maxLength={2}
          style={[styles.input, styles.dateInput]}
        />
      </View>

      
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Artist Links:</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => handleIconPress("spotify")} style={styles.iconButton}>
              <FontAwesome name="spotify" size={24} color="green" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("apple")} style={styles.iconButton}>
              <FontAwesome name="apple" size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("youtube")} style={styles.iconButton}>
              <FontAwesome name="youtube" size={24} color="red" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("instagram")} style={styles.iconButton}>
              <FontAwesome name="instagram" size={24} color="purple" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("soundcloud")} style={styles.iconButton}>
              <FontAwesome name="soundcloud" size={24} color="orange" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("facebook")} style={styles.iconButton}>
              <FontAwesome name="facebook" size={24} color="blue" style={styles.icon} />
            </TouchableOpacity>
        
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>About Artist:</Text>
        <TextInput
          value={aboutArtist}
          onChangeText={setAboutArtist}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>About Event:</Text>
        <TextInput
          value={aboutEvent}
          onChangeText={setAboutEvent}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>About Venue:</Text>
        <TextInput
          value={aboutVenue}
          onChangeText={setAboutVenue}
          style={styles.input}
        />
      </View>
      <View style={{alignItems: "center", marginTop: 20}}>
      <TouchableOpacity onPress={handleAddEvent} style={styles.button}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginLeft: 20,
  },
  labelText: {
    width: "30%",
    marginRight: 21,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular'
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderColor: '#CED5E1',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
  inputLocation: {
    width: 260,
    height: 56,
    borderWidth: 1,
    borderColor: '#CED5E1',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
  },
  labelTextDate: {
    marginRight: 21,
    marginLeft: 74,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateInput: {
    width: 50,
    textAlign: 'center',
    marginRight: 10,
    fontFamily: 'Inter_400Regular',
  },
  labelTextLinks: {
    marginRight: 21,
    marginLeft: 74,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular'
  },
  iconsContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelTextIcon: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconRow: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: "wrap"
  ,
  gap: 10
  },
  iconButton: {
    width: "30%",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CED5E1',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  button1: {
    height: 119,
    borderWidth: 1,
    borderColor: '#CED5E1',
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: 144,
    height: 50,
    backgroundColor: '#E5D9F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 15,
    marginTop: 3,

  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    
  }
});

export default AddEvent;
