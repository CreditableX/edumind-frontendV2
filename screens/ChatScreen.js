import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'


const ChatScreen = () => {
  const { getChats } = useAuth();

  const retrieveChats = async () => {
    try {
      await getChats(); // Using the getChats function from useAuth
      Alert.alert('Successful');
    } catch (error) {
      console.error('Chat retrieval error:', error); // Handle login error
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>ChatScreen</Text>
      <Button title="Get Chats" onPress={() => retrieveChats()} />
      <Button title="Create new chat" onPress={() => navigation.navigate('NewChat')} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  )
}



export default ChatScreen

const styles = StyleSheet.create({})