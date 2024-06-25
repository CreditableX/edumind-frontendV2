import { View, Text, Button, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';
import tw from 'twrnc';
import useUserProfile from '../hooks/userProfileProvider';

const ProfileScreen = () => {
    const { usernameState } = useUserProfile();
    const navigation = useNavigation();

    console.log(usernameState);

    return (
        <SafeAreaView>
            <Image
                style={tw`h-30 w-30 rounded-full`}
                source={{ uri: "https://tinder.com/static/tinder.png" }} // change to user image when complete
            />
            <Text>{usernameState ? `Profile of ${usernameState}` : 'Loading user information...'}</Text>
            <Button title="Update Username" onPress={() => navigation.navigate("NewUsername")} />
            <Button title="Update Name" onPress={() => navigation.navigate("NewName")} />
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </SafeAreaView>
    )
}

export default ProfileScreen