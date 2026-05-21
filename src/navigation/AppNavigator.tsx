import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { RootStackParamList } from '../types/navigation';

import Splash from '../pages/Splash/Splash';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Interests from '../pages/Interests/Interests';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import EventDetail from '../pages/EventDetail/EventDetail';
import UpdateEvent from '../pages/UpdateEvent/UpdateEvent';
import Profile from '../pages/Profile/Profile';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Interests" component={Interests} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
