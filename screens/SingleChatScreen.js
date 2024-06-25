import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import useChats from '../hooks/chatProvider';

const SingleChatScreen = () => {
    const { singleChatId, getMessages, newMessage } = useChats();
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
        getMessages(); // Fetch messages when the component mounts
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>SingleChatScreen</Text>
            <Text>Chat ID: {singleChatId}</Text>
            <Button title="Back to Chat" onPress={() => navigation.navigate('Chat')} />
            <Button title="Generate Message" onPress={handleNewMessage} />
        </SafeAreaView>
    );
}

export default SingleChatScreen