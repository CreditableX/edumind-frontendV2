import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password); // Using the login function from useAuth
      Alert.alert('Successful');
      navigation.navigate('Home');     // Goes to home page if successful
    } catch (error) {
      console.error('Login error:', error); // Handle login error
    }
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You are not logged in! Login to see this page.</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        <View style={tw`flex-1 mr-2`}>
            <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={tw`flex-1 ml-2`}>
            <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
        </View>
      </View>
    </View>
  )
}

export default LoginScreen