// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, AuthContext } from './AuthContext';



import USER_Login_View from './views/USER_Login_View';
import USER_SignUp_View from './views/USER_SignUp_View';
import USER_MainMenu_View from './views/USER_MainMenu_View';
import CREATOR_Menu_View from './views/CREATOR_Menu_View';
import CONTRIBUTOR_Menu_View from './views/CONTRIBUTOR_Menu_View';
import USER_About_View from './views/USER_About_View';
import USER_ForumsPlatformMenu_View from './views/USER_ForumsPlatformMenu_View';
import User_Config_View from './views/USER_Config_View';
import SettingsScreen from './views/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Navegación de Tabs inferior (BottomTabs)
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="MainMenu" 
        component={USER_MainMenu_View} 
        options={{
          tabBarLabel: 'Main Menu 🏠', 
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
          tabBarLabel: 'Contributors 👤', 
        }}
      />
      <Tab.Screen 
        name="USER_ForumsPlatformMenu_View" 
        component={USER_ForumsPlatformMenu_View} 
        options={{
          tabBarLabel: 'Forums 👤', 
        }}
      />
      <Tab.Screen 
        name="USER_About_View" 
        component={USER_About_View} 
        options={{
          tabBarLabel: 'About us 👤', 
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer principal que contiene BottomTabs como pantalla principal y otras opciones
function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="BottomTabs">
      <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ title: 'Home' }} />
      <Drawer.Screen name="UserConfiguration" component={User_Config_View} options={{ title: 'User Configuration' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  );
}

// Stack de autenticación para Login y SignUp
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={USER_Login_View} />
      <Stack.Screen name="SignUp" component={USER_SignUp_View} />
    </Stack.Navigator>
  );
}

// Navegación principal que decide si mostrar AuthStack o MainDrawer
function AppNavigator() {
  const { isSignedIn } = useContext(AuthContext);
  console.log(useContext(AuthContext));
  return (
    <NavigationContainer>
      {isSignedIn ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
//{"isSignedIn": false, "signIn": [Function signIn], "signOut": [Function signOut]}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
