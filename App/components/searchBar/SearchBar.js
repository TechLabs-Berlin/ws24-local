import React, { useRef, useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CustomSearchBar = ({ onValueChange, onCancel }) => {
  const inputRef = useRef(null);
  const [text, setText] = useState('');

  const handleInputTextChange = (inputText) => {
    setText(inputText);
  };

  const handleSearch = () => {
    onValueChange(text); 
  };

  const handleCancel = () => {
    setText('');
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" style={styles.icon} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search"
        value={text}
        onChangeText={handleInputTextChange}
        onSubmitEditing={handleSearch} 
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="close" size={24} color="black" style={styles.cancelIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    paddingVertical: 8,
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  cancelIcon: {
    marginLeft: 5,
  },
}); 

export default CustomSearchBar;
