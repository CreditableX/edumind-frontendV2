import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import useChats from '../hooks/chatProvider';
import tw from 'twrnc';
import { Card, StyleSheet, Title, Button } from 'react-native-paper'
import useAuth from '../hooks/useAuth';

const SingleChatScreen = () => {
  const { singleChatId, getMessages, newMessage, messages } = useChats();
  const { userId } = useAuth();
  const [newMessageContent, setNewMessageContent] = useState('');
  const navigation = useNavigation();

  const handleNewMessage = async () => {
    try {
      await newMessage(newMessageContent);
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
      <Text style={{ fontSize: 24, marginBottom: 20 }}>SingleChatScreen</Text>
      <Text>Chat ID: {singleChatId}</Text>
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
        />
        <Button mode="contained" onPress={handleNewMessage}>
          Send
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SingleChatScreen