import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import useChats from '../hooks/chatProvider';
import tw from 'twrnc';

const SingleChatScreen = () => {
    const { singleChatId, getMessages, newMessage } = useChats();
    const [chatMessages, setChatMessages] = useState(null)
    const navigation = useNavigation();

    const handleNewMessage = async () => {
        try {
            await newMessage("test message injected into chat");
        } catch (error) {
            Alert.alert('message send error', error.message); // Display error message if msg creation fails
        }
    };

    useEffect(() => {
        console.log("chat id " + singleChatId)
        messages = getMessages()
        console.log(messages)
        setChatMessages(getMessages()); // Fetch messages when the component mounts
        console.log("messages " + chatMessages)
    }, []);

    const MessageItem = ({ message }) => {
        return (
          <TouchableOpacity onPress={() => moveToSingleChat(message.content)} style={tw`p-4 border-b border-gray-400`}>
            <Card style={tw`m-2 p-2 rounded-lg shadow-md`}>
              <View style={tw`flex-row items-center`}>
                <Image source={require('../assets/edumind.png')} style={tw`w-16 h-16 rounded-full m-2`} />
                <View style={tw`flex-1 ml-2`}>
                  <Title style={tw`text-lg font-bold`}>{message.content}</Title>
                  <Text style={tw`text-gray-500 text-sm`}>{message.content}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>SingleChatScreen</Text>
            <Text>Chat ID: {singleChatId}</Text>
            <View style={tw`flex-1`}>
                {chatMessages && chatMessages.length > 0 ? (
                <FlatList
                    data={chatMessages}
                    keyExtractor={(item) => item.content.toString()}
                    renderItem={({ item }) => <MessageItem chat={item} />}
                    contentContainerStyle={tw`mt-4`}
                />
                ) : (
                <Text style={tw`mt-4 text-lg text-gray-600`}>No messages available</Text>
                )}
            </View>
            <Button title="Back to Chat" onPress={() => navigation.navigate('Chat')} />
            <Button title="Generate Message" onPress={handleNewMessage} />
        </SafeAreaView>
    );
}

export default SingleChatScreen