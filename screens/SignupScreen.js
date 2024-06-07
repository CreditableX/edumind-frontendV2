import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
            await signup(username, password, name);
            navigation.navigate('Login'); // go to login screen
        } catch (error) {
            Alert.alert('Signup Error', error.message); // Display error message if signup fails
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sign up</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <View style={tw`flex-row justify-between w-4/5`}>
                <View style={tw`flex-1 ml-2`}>
                    <Button title="Signup" onPress={handleSignup} />
                </View>
            </View>
        </View>
    );
}

export default SignupScreen