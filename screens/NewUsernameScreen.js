import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';
import useUserProfile from '../hooks/userProfileProvider';

const NewUsernameScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    const { updateUsername } = useUserProfile();

    const handleUpdateUsername = async (username) => {
        try {
            await updateUsername(username);
            Alert.alert('Username updated successfully');
            navigation.navigate('Profile'); // Navigate to profile page if successful
        } catch (error) {
            Alert.alert('Username update error', error.message); // Display error message if chat creation fails
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Enter new username</Text>
            <TextInput
                placeholder="Username"
                value={"name"}
                onChangeText={setUsername}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <View style={tw`flex-row justify-between w-4/5`}>
                <View style={tw`flex-1 ml-2`}>
                    <Button title="Submit" onPress={() => handleUpdateUsername(username)} />
                    <Button title="Never Mind" onPress={() => navigation.navigate("Profile")} />
                </View>
            </View>
        </View>
    );
}

export default NewUsernameScreen