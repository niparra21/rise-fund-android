// App.js
import { Alert } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, AuthContext } from './AuthContext';
import { executeProcedure } from './database/apiService';


import USER_Login_View from './views/USER_Login_View';
import USER_SignUp_View from './views/USER_SignUp_View';
import USER_MainMenu_View from './views/USER_MainMenu_View';
import CREATOR_Menu_View from './views/CREATOR_Menu_View';
import CREATOR_NewProject_View from './views/CREATOR_NewProject_View';
import CREATOR_EditProject_View from './views/CREATOR_EditProject_View';
import CREATOR_ProjectDetails_View from './views/CREATOR_ProjectDetails_View';
import CONTRIBUTOR_Menu_View from './views/CONTRIBUTOR_Menu_View';
import CONTRIBUTOR_Details_View from './views/CONTRIBUTOR_Details_View';
import USER_About_View from './views/USER_About_View';
import USER_ForumsPlatformMenu_View from './views/USER_ForumsPlatformMenu_View';
import USER_ProjectForum_View from './views/USER_ProjectForum_View';
import USER_Config_View from './views/USER_Config_View';
import ADMIN_Menu_View from './views/ADMIN_Menu_View';
import USER_CustomerSupport_View from './views/USER_CustomerSupport_View'

import ADMIN_User_View from './views/ADMIN_User_View';
import ADMIN_Donation_View from './views/ADMIN_Donation_View';
import ADMIN_Project_View from './views/ADMIN_Project_View';
import ADMIN_Alerts_View from './views/ADMIN_Alerts_View';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const CreatorStack = createNativeStackNavigator();
const ContributorStack = createNativeStackNavigator();
const ForumStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const getUserInfo = async (givenID) => {
  try {
    const procedureName = 'sp_get_user_by_id';
    const params = { UserID: givenID };
    const result = await executeProcedure(procedureName, params);

    if (result[0].length !== 0) {
      // Devuelve los datos del usuario obtenidos
      return result[0][0];
    } else {
      Alert.alert(
        'User Not Found',
        'No user found with the provided ID.',
        [{ text: 'OK' }]
      );
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    Alert.alert(
      'Error',
      'There was an error retrieving user information. Please try again later.',
      [{ text: 'OK' }]
    );
    return null;
  }
};

function CreatorStackScreens() {
  return (
    <CreatorStack.Navigator screenOptions={{ headerShown: false }}>
      <CreatorStack.Screen name="CREATOR_Menu_View" component={CREATOR_Menu_View} />
      <CreatorStack.Screen name="NewProject" component={CREATOR_NewProject_View} />
      <CreatorStack.Screen name="EditProject" component={CREATOR_EditProject_View} />
      <CreatorStack.Screen name="CreatorProjectDetails" component={CREATOR_ProjectDetails_View} />
      <ForumStack.Screen name="ProjectForum" component={USER_ProjectForum_View} />
    </CreatorStack.Navigator>
  );
}

function ContributorStackScreens() {
  return (
    <ContributorStack.Navigator screenOptions={{ headerShown: false }}>
      <ContributorStack.Screen name="CONTRIBUTOR_Menu_View" component={CONTRIBUTOR_Menu_View} />
      <ContributorStack.Screen name="ProjectDetails" component={CONTRIBUTOR_Details_View}  />
      <ForumStack.Screen name="ProjectForum" component={USER_ProjectForum_View} />
    </ContributorStack.Navigator>
  )
}

function ForumsStackScreens() {
  return (
    <ForumStack.Navigator screenOptions={{ headerShown: false }}>
      <ForumStack.Screen name="ForumsPlatformMenu" component={USER_ForumsPlatformMenu_View} />
      <ForumStack.Screen name="ProjectForum" component={USER_ProjectForum_View} />
    </ForumStack.Navigator>
  );
}


function AdminStackScreens() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminMenu" component={ADMIN_Menu_View} />
      <AdminStack.Screen name="AdminUser" component={ADMIN_User_View} />
      <AdminStack.Screen name="AdminDonation" component={ADMIN_Donation_View} />
      <AdminStack.Screen name="AdminProject" component={ADMIN_Project_View} />
      <AdminStack.Screen name="AdminAlerts" component={ADMIN_Alerts_View} />
    </AdminStack.Navigator>
  );
}


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
        name="CreatorStack"
        component={CreatorStackScreens}
        options={{
          tabBarLabel: 'Creators 🏠',
        }}
      />
      <Tab.Screen 
        name="ContributorStack" 
        component={ContributorStackScreens} 
        options={{
          tabBarLabel: 'Contributors 👤', 
        }}
      />
      <Tab.Screen 
        name="USER_ForumsPlatformMenu_View" 
        component={ForumsStackScreens} 
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
  const navigation = useNavigation();
  const { userID } = useContext(AuthContext);

  const handleAdminAccess = async () => {
    try {
      const userInfo = await getUserInfo(userID); // Consulta la base de datos para obtener el RoleID del usuario

      if (userInfo && userInfo.RoleId === 5) {
        navigation.navigate('Admin'); // Permite la navegación si RoleID es 5
      } else {
        Alert.alert('Access Denied', 'You do not have permission to access the admin section.');
      }
    } catch (error) {
      console.error('Error verifying access:', error);
      Alert.alert('Error', 'An error occurred while checking your access. Please try again.');
    }
  };

  return (
    <Drawer.Navigator initialRouteName="BottomTabs">
      <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ title: 'Home' }} />
      <Drawer.Screen name="UserConfiguration" component={USER_Config_View} options={{ title: 'User Configuration' }} />
      <Drawer.Screen name="USER_CustomerSupport_View" component={USER_CustomerSupport_View} options={{ title: 'Customer Support' }} />
      <Drawer.Screen
        name="Admin"
        component={AdminStackScreens}
        options={{ title: 'Admin' }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault(); // Previene la navegación automática
            handleAdminAccess(); // Llama a la función de verificación
          },
        }}
      />
    </Drawer.Navigator>
  );
}


// Stack de autenticación para Login y SignUp
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={USER_Login_View} />
      <Stack.Screen name="SignUp" component={USER_SignUp_View} />
      <Stack.Screen name="CreatorMenu" component={CREATOR_Menu_View} />
      <Stack.Screen name="NewProject" component={CREATOR_NewProject_View} />
    </Stack.Navigator>
  );
}

// Navegación principal que decide si mostrar AuthStack o MainDrawer
function AppNavigator() {
  const { isSignedIn } = useContext(AuthContext);
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
