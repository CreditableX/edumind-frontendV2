import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Text, TextInput, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import useChats from '../hooks/chatProvider';
import useAuth from '../hooks/useAuth';

const SingleChatScreen = () => {
  const { singleChatId, getMessages, newMessage, messages, photoUrl, endChat, singleChatStudentName, 
    singleChatTutorName, singleChatStudentPhoto, singleChatTutorPhoto } = useChats();
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
      Alert.alert('message send error', error.message);
    }
  };

  const handleEndChat = async () => {
    try {
      console.log('ending chat with singlechatid ' + singleChatId);
      await endChat(singleChatId);
      navigation.navigate('TutorHome');
    } catch (error) {
      Alert.alert('End chat error', error.message); 
    }
  };

  const handleRating = async () => {
    try {
      setRating(5);
      if (1 <= rating && 5 >= rating) {
        await giveRating(rating);
        Alert.alert("Rating success");
        navigation.navigate('StudentHome');
      }
    } catch (error) {
      Alert.alert('Rating error', error.message);
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
        await getMessages();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [singleChatId]);

  const MessageItem = ({ message }) => {
    // Determine if the message is sent by the current user or received
    const isSentByCurrentUser = message.user_id === userId;

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
          style={tw`rounded-l`}
          contentStyle={tw`py-2 px-6`}
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
              width: screenWidth * 2 / 3,
              height: screenWidth * 2 / 3,
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