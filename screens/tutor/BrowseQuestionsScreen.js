import { Text, View, Alert, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import useChats from '../../hooks/chatProvider'
import { Card, StyleSheet, Title, Button } from 'react-native-paper'


const BrowseQuestionsScreen = () => {
  const { tutorGetChats, chats, updateSingleChatId } = useChats();
  const { userType } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    tutorGetChats(); // Fetch chats when the component mounts
  }, []);

  const moveToAcceptQuestion = (id) => {
    updateSingleChatId(id);
    navigation.navigate("AcceptQuestion");
  }

  const ChatItem = ({ chat }) => {
    return (
      <TouchableOpacity onPress={() => moveToAcceptQuestion(chat.chat_id)} style={tw`p-4 border-b border-gray-400`}>
        <Card style={tw`m-2 p-2 rounded-lg shadow-md`}>
          <View style={tw`flex-row items-center`}>
            <Image source={require('../../assets/edumind.png')} style={tw`w-16 h-16 rounded-full m-2`} />
            <View style={tw`flex-1 ml-2`}>
              <Title style={tw`text-lg font-bold`}>{chat.header}</Title>
              <Text style={tw`text-gray-500 text-sm`}>{chat.subject}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        {chats && chats.length > 0 ? (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.chat_id.toString()}
            renderItem={({ item }) => <ChatItem chat={item} />}
            contentContainerStyle={tw`mt-4`}
          />
        ) : (
          <Text style={tw`mt-4 text-lg text-gray-600`}>No chats available</Text>
        )}
      </View>

      <View style={tw`mt-4 w-full p-5`}>
        <Button title="Create new chat" mode="contained" onPress={() => navigation.navigate('NewChat')} style={tw`mb-1`}>
          Create new chat
        </Button>
        <Button title="Home" mode="contained" onPress={() => userType == 'student' ? navigation.navigate('StudentHome') : navigation.navigate('TutorHome')} style={tw`mb-1`}>
          Home
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default BrowseQuestionsScreen
