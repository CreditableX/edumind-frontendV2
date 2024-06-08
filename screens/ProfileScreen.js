import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';

const ProfileScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>{user ? `Welcome, ${user}!` : 'Loading user information...'}</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </SafeAreaView>
    )
}

export default ProfileScreen