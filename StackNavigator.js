import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentHomeScreen from './screens/student/StudentHomeScreen';
import StudentChatScreen from './screens/student/StudentChatScreen';
import LoginScreen from './screens/LoginScreen';
import NewChatScreen from './screens/student/NewChatScreen';
import useAuth from './hooks/useAuth';
import StartUpScreen from './screens/StartUpScreen';
import StudentProfileScreen from './screens/student/StudentProfileScreen';
import SingleChatScreen from './screens/SingleChatScreen';
import StudentChangeDetailsScreen from './screens/student/StudentChangeDetailsScreen';
import StudentChangePasswordScreen from './screens/student/StudentChangePasswordScreen';
import TutorHomeScreen from './screens/tutor/TutorHomeScreen';
import TutorProfileScreen from './screens/tutor/TutorProfileScreen';
import TutorChangeDetailsScreen from './screens/tutor/TutorChangeDetailsScreen';
import BrowseQuestionsScreen from './screens/tutor/BrowseQuestionsScreen';
import TutorChatScreen from './screens/tutor/TutorChatScreen';
import AcceptQuestionScreen from './screens/tutor/AcceptQuestionScreen';
import StudentSignupScreen from './screens/student/StudentSignupScreen';
import TutorSignupScreen from './screens/tutor/TutorSignupScreen';
import TutorChangePasswordScreen from './screens/tutor/TutorChangePasswordScreen';

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
            <Stack.Screen name="StudentChat" component={StudentChatScreen} />
            <Stack.Screen name="NewChat" component={NewChatScreen} />
            <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="StudentChangeDetails" component={StudentChangeDetailsScreen} />
            <Stack.Screen name="StudentChangePassword" component={StudentChangePasswordScreen} />
          </>
        ) : userType == 'tutor' ? (
          <>
            <Stack.Screen name="TutorHome" component={TutorHomeScreen} />
            <Stack.Screen name="TutorChat" component={TutorChatScreen} />
            <Stack.Screen name="BrowseQuestions" component={BrowseQuestionsScreen} />
            <Stack.Screen name="TutorProfile" component={TutorProfileScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="TutorChangeDetails" component={TutorChangeDetailsScreen} />
            <Stack.Screen name="TutorChangePassword" component={TutorChangePasswordScreen} />
            <Stack.Screen name="AcceptQuestion" component={AcceptQuestionScreen} />
          </>
        ) : (
          <Stack.Screen name="Default" component={DefaultScreen} />
        )
      ) : (
        <>
          <Stack.Screen name="StartUp" component={StartUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="StudentSignup" component={StudentSignupScreen} />
          <Stack.Screen name="TutorSignup" component={TutorSignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const DefaultScreen = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);

export default StackNavigator;
