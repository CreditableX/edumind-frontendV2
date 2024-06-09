import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';

const SingleChatScreen = () => {
    const { singleChatId, getMessages } = useAuth();
    const navigation = useNavigation();
    
    return (
        <SafeAreaView>
            <Text>SingleChatScreen</Text>
            <Button title="Back" onPress={() => navigation.navigate("Chat")} />
        </SafeAreaView>
    )
}

export default SingleChatScreen