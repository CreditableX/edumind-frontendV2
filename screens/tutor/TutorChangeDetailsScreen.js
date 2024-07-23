import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/core';
import useUserProfile from '../../hooks/userProfileProvider';

const TutorChangeDetailsScreen = () => {
    const { name, username, email, logout } = useAuth();
    const { updateDetailsTutor } = useUserProfile();
    const navigation = useNavigation();

    // Initialize state with default values
    const [newName, setNewName] = useState(name);
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);

    useEffect(() => {
        // Update state when props change
        setNewName(name);
        setNewUsername(username);
        setNewEmail(email);
    }, [name, username, email]); // Run effect when any of these values change

    const handleUpdateDetails = async () => {
        try {
            console.log('newname ' + newName);
            console.log('newusername ' + newUsername);
            console.log('newEmail ' + newEmail);
            await updateDetailsTutor(newName, newUsername, newEmail);
            Alert.alert('Profile updated successfully. Please relogin');
            logout(); // Logout user if successful
        } catch (error) {
            Alert.alert('Name update error', error.message); // Display error message if update fails
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={tw`mb-4 text-lg font-bold`}>Input the following details</Text>
            <TextInput
                placeholder="Username"
                value={newUsername}
                onChangeText={setNewUsername}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Name"
                value={newName}
                onChangeText={setNewName}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Email"
                value={newEmail}
                onChangeText={setNewEmail}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />

            <View style={tw`flex-row justify-between w-4/5`}>
                <View style={tw`flex-1 ml-2 mb-5`}>
                    <Button mode="contained" style={tw`mb-1`} onPress={handleUpdateDetails}> 
                        Submit 
                    </Button>
                    <Button mode="contained" style={tw`mb-1`} onPress={() => navigation.navigate("TutorProfile")}> 
                        Never Mind 
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default TutorChangeDetailsScreen;
