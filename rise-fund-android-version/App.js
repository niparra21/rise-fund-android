import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import USER_Login_View from './views/USER_Login_View';
import USER_SignUp_View from './views/USER_SignUp_View';
import USER_MainMenu_View from './views/USER_MainMenu_View';
import CREATOR_Menu_View from './views/CREATOR_Menu_View';
import CONTRIBUTOR_Menu_View from './views/CONTRIBUTOR_Menu_View';
import ProfileScreen from './views/ProfileScreen';
import SettingsScreen from './views/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="MainMenu" 
        component={USER_MainMenu_View} 
        options={{
          tabBarLabel: 'MainMenu 🏠', 
        }}
      />
      <Tab.Screen 
        name="CREATOR_Menu_View" 
        component={CREATOR_Menu_View} 
        options={{
          tabBarLabel: 'Creators 🏠', 
        }}
      />
      <Tab.Screen 
        name="CONTRIBUTOR_Menu_View" 
        component={CONTRIBUTOR_Menu_View} 
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
        <Stack.Screen name="SignIn" component={USER_Login_View} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={USER_SignUp_View} options={{ title: 'Create Account' }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
