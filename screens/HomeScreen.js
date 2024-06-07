import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
  } catch (error) {
      Alert.alert('Logout Error', error.message); // Display error message if signup fails
  }
  }
  
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to Chat Screen"
      onPress={() => navigation.navigate("Chat")}
      />
      <Button title="Log Out"
      onPress={() => handleLogOut()}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})