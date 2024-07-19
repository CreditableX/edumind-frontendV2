import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import useChats from '../hooks/chatProvider';
import tw from 'twrnc';
import { Card, StyleSheet, Title, Button } from 'react-native-paper'
import useAuth from '../hooks/useAuth';

const StudentSingleChatScreen = () => {
  const { singleChatId, getMessages, newMessage, messages } = useChats();
  const { userId, userType } = useAuth();
  const [newMessageContent, setNewMessageContent] = useState('');
  const navigation = useNavigation();

  const handleNewMessage = async () => {
    try {
      await newMessage(newMessageContent);
      setNewMessageContent('');
      await getMessages();
    } catch (error) {
      Alert.alert('message send error', error.message); // Display error message if msg creation fails
    }
  };

  useEffect(() => {
      getMessages();
  }, [singleChatId]);

  const MessageItem = ({ message }) => {
    // Determine if the message is sent by the current user or received
    const isSentByCurrentUser = message.user_id == userId; // Replace with your logic

    return (
      <View style={[tw`flex-row justify-end`, isSentByCurrentUser ? tw`items-end` : tw`items-start`]}>
        <Card style={[tw`m-2 p-2 rounded-lg shadow-md`, isSentByCurrentUser ? tw`bg-blue-500` : tw`bg-gray-300`]}>
          <View style={tw`flex-row items-center`}>
            {!isSentByCurrentUser && (
              <Image source={require('../assets/edumind.png')} style={tw`w-12 h-12 rounded-full`} />
            )}
            <View style={[tw`ml-2`, isSentByCurrentUser ? tw`items-end` : tw`items-start`]}>
              <Text style={[tw`text-sm text-white`, !isSentByCurrentUser && tw`text-gray-700`]}>
                {message.content}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between p-4`}>
          <Button
              icon="arrow-left"
              onPress={() => userType == 'student' ? navigation.navigate('StudentHome') : navigation.navigate('TutorHome')}
              style={tw`rounded-l`} // Increase padding and use rounded corners
              contentStyle={tw`py-2 px-6`} // Adjust padding inside the button
          />
          <Text>Tutor name goes here </Text>
          <Text>Tutor picture</Text>
      </View>

      <View style={tw`flex-1`}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={({ item }) => <MessageItem message={item} />}
          contentContainerStyle={tw`mt-4`}
          inverted
        />
      </View>

      <View style={tw`flex-row items-center p-4`}>
        <TextInput
          style={[tw`flex-1 p-2 border border-gray-400 rounded-md`, { marginRight: 10 }]}
          placeholder="Type your message..."
          value={newMessageContent}
          onChangeText={setNewMessageContent}
          onSubmitEditing={handleNewMessage} // Handle pressing the "Enter" key
          blurOnSubmit={false} // Keep the input focused after pressing "Enter"
        />
        <Button mode="contained" onPress={handleNewMessage}>
          Send
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default StudentSingleChatScreen