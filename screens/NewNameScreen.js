import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';
import useUserProfile, { UserProfileProvider } from '../hooks/userProfileProvider';

const NewNameScreen = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const { updateName } = useUserProfile();

    const handleUpdateName = async (name) => {
        try {
            await updateName(name);
            Alert.alert('Name updated successfully');
            navigation.navigate('Profile'); // Navigate to profile page if successful
        } catch (error) {
            Alert.alert('Name update error', error.message); // Display error message if chat creation fails
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Enter new name</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <View style={tw`flex-row justify-between w-4/5`}>
                <View style={tw`flex-1 ml-2`}>
                    <Button title="Submit" onPress={() => handleUpdateName(name)} />
                    <Button title="Never Mind" onPress={() => navigation.navigate("Profile")} />
                </View>
            </View>
        </View>
    );
}

export default NewNameScreen