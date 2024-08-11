import { View, Text, FlatList, Image, TextInput, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core';
import useChats from '../../hooks/chatProvider';
import tw from 'twrnc';
import { Button } from 'react-native-paper'
import useAuth from '../../hooks/useAuth';
import RNPickerSelect from 'react-native-picker-select';

const AcceptQuestionScreen = () => {
  const { singleChatId, getMessages, newMessage, messages, tutorAccept, tutorGetChats, singleChatTopicList,
    singleChatStudentName, singleChatStudentPhoto, photoUrl} = useChats();
  const { userId, userType } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigation = useNavigation();
  
  const handleAcceptChat = async () => {
    try {
      await tutorAccept(selectedTopic);
      await tutorGetChats();
      navigation.navigate("BrowseQuestions");
    } catch (error) {
      Alert.alert('Accept chat error', error.message); // Display error message if msg creation fails
    }
  };

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
  
  return (
    <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between p-4`}>
          <Button
              icon="arrow-left"
              onPress={() => navigation.navigate('TutorHome')}
              style={tw`rounded-l`} // Increase padding and use rounded corners
              contentStyle={tw`py-2 px-6`} // Adjust padding inside the button
          />
          <Text style={tw`text-xl font-bold`}>{singleChatStudentName}</Text>
          <Image
          style={tw`h-15 w-15 rounded-full mr-4`}
          source={{ uri: singleChatStudentPhoto != '' ? singleChatStudentPhoto : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}}
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

      <View style={tw`p-4`}>
        <Text>Select a Topic:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedTopic(value)}
          items={singleChatTopicList.map((topic) => ({
            label: topic.name, // Assuming `topic.name` contains the name of the topic
            value: topic.topic_id, // Assuming `topic.id` contains the unique identifier for the topic
          }))}
          placeholder={{ label: "Select a topic", value: null }}
          style={{
            inputIOS: tw`border p-2 rounded`, // Styling for iOS
            inputAndroid: tw`border p-2 rounded`, // Styling for Android
          }}
        />
      </View>

      <View style={tw`flex-row items-center p-4`}>
        <Button mode="contained" onPress={handleAcceptChat}>
          Accept chat
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AcceptQuestionScreen