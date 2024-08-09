import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core';
import useChats from '../../hooks/chatProvider';
import tw from 'twrnc';
import { Button } from 'react-native-paper'
import useAuth from '../../hooks/useAuth';
import RNPickerSelect from 'react-native-picker-select';

const AcceptQuestionScreen = () => {
  const { singleChatId, getMessages, newMessage, messages, tutorAccept, tutorGetChats, singleChatTopicList } = useChats();
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