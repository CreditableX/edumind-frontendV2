import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentHomeScreen from './screens/StudentHomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NewChatScreen from './screens/NewChatScreen';
import useAuth from './hooks/useAuth';
import StartUpScreen from './screens/StartUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import SingleChatScreen from './screens/SingleChatScreen';
import NewNameScreen from './screens/NewNameScreen';
import NewUsernameScreen from './screens/NewUsernameScreen';
import ChangeDetailsScreen from './screens/ChangeDetailsScreen';
import TutorHomeScreen from './screens/TutorHomeScreen';
import PhotoTestScreen from './screens/PhotoTest';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { username, userType } = useAuth();
  const [currentUser, setCurrentUser] = useState(username);

  useEffect(() => {
    setCurrentUser(username);
    console.log(username);
  }, [username]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {currentUser ? (
        userType == 'student' ? (
          <>
            <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="NewChat" component={NewChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="NewName" component={NewNameScreen} />
            <Stack.Screen name="NewUsername" component={NewUsernameScreen} />
            <Stack.Screen name="ChangeDetails" component={ChangeDetailsScreen} />
          </>
        ) : userType == 'tutor' ? (
          <>
            <Stack.Screen name="TutorHome" component={TutorHomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="NewChat" component={NewChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="NewName" component={NewNameScreen} />
            <Stack.Screen name="NewUsername" component={NewUsernameScreen} />
            <Stack.Screen name="ChangeDetails" component={ChangeDetailsScreen} />
          </>
        ) : null
      ) : (
        <>
          <Stack.Screen name="StartUp" component={StartUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
