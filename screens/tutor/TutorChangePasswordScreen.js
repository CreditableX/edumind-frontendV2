import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/core';
import useUserProfile from '../../hooks/userProfileProvider';

const TutorChangePasswordScreen = () => {
    const { logout } = useAuth();
    const { updatePasswordTutor } = useUserProfile();
    const navigation = useNavigation();

    // Initialize state with default values
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        // Update state when props change
        setOldPassword(oldPassword);
        setNewPassword(newPassword);
    }, [oldPassword, newPassword]); // Run effect when any of these values change

    const handleUpdatePassword = async () => {
        try {
            await updatePasswordTutor(oldPassword, newPassword);
            Alert.alert('Password updated successfully. Please relogin');
            logout(); // Logout user if successful
        } catch (error) {
            Alert.alert('Password update error', error.message); // Display error message if update fails
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={tw`mb-4 text-lg font-bold`}>Input the following details</Text>
            <TextInput
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />

            <View style={tw`flex-row justify-between w-4/5`}>
                <View style={tw`flex-1 ml-2 mb-5`}>
                    <Button mode="contained" style={tw`mb-1`} onPress={handleUpdatePassword}> 
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

export default TutorChangePasswordScreen;
