import { View, Text, FlatList, Image, TextInput, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import useChats from '../hooks/chatProvider';
import tw from 'twrnc';
import { Card, Button } from 'react-native-paper'
import useAuth from '../hooks/useAuth';

const SingleChatScreen = () => {
  const { singleChatId, getMessages, newMessage, messages, photoUrl, endChat, singleChatStudentName, singleChatTutorName, singleChatStudentPhoto, singleChatTutorPhoto } = useChats();
  const { userId, userType } = useAuth();
  const [newMessageContent, setNewMessageContent] = useState('');
  const [rating, setRating] = useState(0);
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

  const handleEndChat = async () => {
    try {
      console.log('ending chat with singlechatid ' + singleChatId);
      await endChat(singleChatId);
      navigation.navigate('TutorHome'); // Go back to the browse questions screen
    } catch (error) {
      Alert.alert('End chat error', error.message); // Display error message if end chat fails
    }
  };

  const handleRating = async () => {
    try {
      setRating(5);
      if (1 <= rating && 5 >= rating) {
        await giveRating(rating);
        Alert.alert("Rating success");
        navigation.navigate('StudentHome'); // Go back to the browse questions screen
      }
    } catch (error) {
      Alert.alert('Rating error', error.message); // Display error message if end chat fails
    }
  }

  const getPhotoUrl = () => {
    if (userType === 'student') {
      return singleChatStudentPhoto != '' ? singleChatStudentPhoto : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
    } else if (userType === 'tutor') {
      return singleChatTutorPhoto != '' ? singleChatTutorPhoto : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await getMessages(); // assuming getMessages is an async function
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [singleChatId]);

  const MessageItem = ({ message }) => {
    // Determine if the message is sent by the current user or received
    const isSentByCurrentUser = message.user_id === userId; // Replace with your logic

    return (
      <View style={[tw`m-2`, isSentByCurrentUser ? tw`self-end` : tw`self-start`]}>
        <Card style={[tw`p-2 rounded-lg shadow-md`, isSentByCurrentUser ? tw`bg-blue-500` : tw`bg-gray-300`]}>
          <Text style={[tw`text-sm`, isSentByCurrentUser ? tw`text-white` : tw`text-gray-700`]}>
            {message.content}
          </Text>
        </Card>
      </View>
    );
  };

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-row items-center justify-between p-4`}>
        <Button
          icon="arrow-left"
          onPress={() => userType == 'student' ? navigation.navigate('StudentHome') : navigation.navigate('TutorHome')}
          style={tw`rounded-l`} // Increase padding and use rounded corners
          contentStyle={tw`py-2 px-6`} // Adjust padding inside the button
        />
        <Text style={tw`text-xl font-bold`}>{userType === 'student' ? singleChatTutorName : singleChatStudentName} </Text>
        <Image
          style={tw`h-15 w-15 rounded-full mr-4`}
          source={{ uri: getPhotoUrl() }}
        />
      </View>

      <View style={tw`flex-1 justify-center items-center`}>
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            style={{
              width: screenWidth * 2 / 3,  // Set width to 1/3 of screen width
              height: screenWidth * 2 / 3, // Set height to 1/3 of screen width (keeping aspect ratio square)
              resizeMode: 'contain'
            }}
          />
        ) : (
          <Text style={tw`text-center`}>No Picture Available</Text>
        )}
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
      {userType === 'tutor' && (
        <View style={tw`p-4`}>
          <Button mode="contained" onPress={handleEndChat}>
            End Chat
          </Button>
        </View>
      )}
      {userType === 'student' && (
        <View style={tw`p-4`}>
          <Button mode="contained" onPress={handleRating}>
            Rate chat!
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SingleChatScreen