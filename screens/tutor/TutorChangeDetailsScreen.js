import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import useAuth from '../../hooks/useAuth';
import useUserProfile from '../../hooks/userProfileProvider';

const TutorChangeDetailsScreen = () => {
    const { name, username, email, logout } = useAuth();
    const { updateDetailsTutor, error } = useUserProfile();
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

    const checkValid = (username, name, email) => {
        const moderateEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (username.length < 3 || name.length < 3) {
            return 'Username and name need to be at least 3 characters'
        }
        if (!moderateEmailRegex.test(email)) {
            return 'Invalid Email';
        }
        return '';
    }

    const handleUpdateDetails = async () => {
        const reply = checkValid(newName, newUsername, newEmail);
        if (reply != '') {
            Alert.alert(reply);
        } else {
            await updateDetailsTutor(newName, newUsername, newEmail);
            logout();
        }

        if (error != null) {
            Alert.alert('Change Details Error', error);
        } else {
            Alert.alert('Change Details Success, please login again');
            logout(); // go to login screen
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
