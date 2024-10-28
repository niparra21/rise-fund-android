import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './views/SignInScreen2';
import SignUpScreen from './views/SignUpScreen';
import HomeScreen from './views/HomeScreen';
import CreatorMenuScreen from './views/CreatorMenuScreen';
import ContribuitorMenuScreen from './views/ContribuitorMenuScreen';
import ProfileScreen from './views/ProfileScreen';
import SettingsScreen from './views/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home 🏠', 
        }}
      />
      <Tab.Screen 
        name="Creators" 
        component={CreatorMenuScreen} 
        options={{
          tabBarLabel: 'Creators 🏠', 
        }}
      />
      <Tab.Screen 
        name="Contribuitors" 
        component={ContribuitorMenuScreen} 
        options={{
          tabBarLabel: 'Contribuitors 👤', 
        }}
      />
      <Tab.Screen 
        name="Forums" 
        component={SettingsScreen} 
        options={{
          tabBarLabel: 'Forums ⚙️', 
        }}
      />
      <Tab.Screen 
        name="About Us" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'About Us 👤', 
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
