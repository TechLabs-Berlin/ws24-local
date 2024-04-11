import React, { useState, useEffect } from 'react';
import { StatusBar, Image, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium, Inter_300Light } from '@expo-google-fonts/inter';

import HomePage from './components/homePage/HomePage';
import SearchPage from './components/searchPage/SearchPage';
import ArtistScreen from './components/artistPage/ArtistScreen';
import SavedPage from './components/savedPage/SavedPage';
import AddEvent from './components/addEvent/AddEvent.js';
import MyAccount from './components/myAccount/MyAccount';

const Tab = createBottomTabNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
    Inter_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  const navigateToArtistScreen = () => {
    navigation.navigate('ArtistScreen'); 
};


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let iconColor = focused ? '#CC5F8D' : '#616370';

            if (route.name === 'Home') {
              return <MaterialCommunityIcons name="home-variant" size={size} color={iconColor} />;
            } else if (route.name === 'Saved') {
              iconName = 'bookmark';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'AddEvent') {
              iconName = 'add';
            } else if (route.name === 'MyAccount') {
              return <MaterialCommunityIcons name="account-cog" size={size} color={iconColor} />;
            }

            return <MaterialIcons name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: '#CC5F8D',
          tabBarInactiveTintColor: '#616370',
          tabBarStyle: {
            display: 'flex',
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter_700Bold',
            fontSize: 10,
          },
        })}
      >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Image
                source={require('./assets/images/Logo.png')} 
                style={{ width: 86, height: 35, alignSelf: 'center' }}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 20 }}>
              <MaterialCommunityIcons name="bell" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center', 
        })}
      />
        <Tab.Screen name="Saved" component={SavedPage} />
        <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false }}  />
        <Tab.Screen name="AddEvent" component={AddEvent} />
        <Tab.Screen name="MyAccount" component={MyAccount} options={{ headerTitle: 'Account' }}/>
        {/* <Tab.Screen name="ArtistScreen" component={ArtistScreen} options={{ tabBarButton: () => null }} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
