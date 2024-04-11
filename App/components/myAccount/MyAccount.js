import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fontisto, Entypo, Feather } from '@expo/vector-icons';


const MyAccount = () => {

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={require('../../assets/images/profilePicture.png')} style={styles.profilePicture} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Name Surname</Text>
          <Text style={styles.userTitle}>Event Organizer</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="square-edit-outline" size={30} color="#3E3D3D" style={styles.editIcon} />
          </TouchableOpacity>
        </ View>
      </View>
      <View style={styles.accountItems}>
        
        <View style={styles.accountItem}>
          <MaterialCommunityIcons name="account" size={30} color="#3E3D3D" style={styles.itemIcon} />
          <View>
          <Text style={styles.itemTitle}>Account</Text> 
          <Text style={styles.itemText}>Privacy, security, change email or number</Text>
          </View>
        </View>
        
        <View style={styles.accountItem}>
          <MaterialCommunityIcons name="square-edit-outline" size={30} color="#3E3D3D" style={styles.itemIcon} />
          <View>
          <Text style={styles.itemTitle}>Personalization</Text> 
          <Text style={styles.itemTextPer}>Accessibility, language, recommendation settings and muted artists</Text>
          </View>
        </View>
      
        <View style={styles.accountItem}>
          <MaterialCommunityIcons name="calendar" size={30} color="#3E3D3D" style={styles.itemIcon} />
          <View>
          <Text style={styles.itemTitle}>Your Events</Text> 
          <Text style={styles.itemText}>Edit events, see reports</Text>
          </View>
        </View>
        <View style={styles.accountItem}>
          <Fontisto name="credit-card" size={20} color="#3E3D3D" style={styles.itemIcon} />
          <View>
          <Text style={styles.itemTitle}>Payment</Text>
          <Text style={styles.itemText}>Purchases, payment methods and history</Text>
          </View>
        </View>
        <View style={styles.accountItem}>
          <MaterialCommunityIcons name="bell" size={30} color="#3E3D3D" style={styles.itemIcon} />
          <View>
          <Text style={styles.itemTitle}>Notifications</Text>
          <Text style={styles.itemText}>New events, updates from artists and venues</Text>
          </View>
        </View>
        <View style={styles.accountItem}>
          <Entypo name="help-with-circle" size={30} color="#3E3D3D" style={styles.itemIcon} />
          <View>
          <Text style={styles.itemTitle}>Help</Text>
          <Text style={styles.itemText}>Help centre, contact us, privacy policy</Text>
          </View>
        </View>
       
        <View style={styles.accountItem}>
          <MaterialCommunityIcons name="account-multiple-plus" size={30} color="#3E3D3D" style={styles.itemIconPlus} />
          <Text style={styles.itemTitle}>Invite Friends</Text>
        </View>
        <View style={styles.accountItem}>
          <Feather name="log-out" size={30} color="#3E3D3D" style={styles.itemIcon} />
          <Text style={styles.logOutText}>Log Out</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userDetails: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E3D3D',
    marginBottom: 5,
    fontFamily: 'Inter_700Bold',
  },
  userTitle: {
    fontSize: 16,
    color: '#3E3D3D',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -42}],
  },
  accountItems: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemIcon: {
    marginRight: 15, // Margin between icon and text
  },
  itemIconPlus: {
    marginRight: 13, // Margin between icon and text
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_500Medium',
    color: '#3E3D3D'
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#878787'
    
  },
  itemTextPer: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#878787',
    marginRight: 15,
    
  },
  logOutText: {
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    color: '#3E3D3D'
  },
});

export default MyAccount;