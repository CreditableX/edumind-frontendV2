import { StyleSheet, Text, View, Button, Alert, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'


const ChatScreen = () => {
  const { getChats, chats, updateSingleChatId } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    getChats(); // Fetch chats when the component mounts
  }, []);

  const moveToSingleChat = (id) => {
    updateSingleChatId(id);
    navigation.navigate("SingleChat");
  }

  const ChatItem = ({ chat }) => {
    return (
      <TouchableOpacity onPress={() => moveToSingleChat(chat.id)} style={tw`p-4 border-b border-gray-300`}>
        <View style={tw`p-4 border-b border-gray-300`}>
          <Text style={tw`text-lg font-bold mb-2`}>{chat.header}</Text>
          <Text style={tw`text-base text-gray-700`}>Subject: {chat.subject}</Text>
          <Text style={tw`text-sm text-gray-500`}>Created At: {new Date(chat.created_at).toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <Text>ChatScreen</Text>
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

      <View style={tw`p-4 bg-white border-t border-gray-300`}>
        <Button title="Create new chat" onPress={() => navigation.navigate('NewChat')} />
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </SafeAreaView>
  )
}

export default ChatScreen
