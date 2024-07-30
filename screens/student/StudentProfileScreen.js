import { View, Text, Image } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';
import tw from 'twrnc';

const StudentProfileScreen = () => {
    const { username, name, email, photoUrl } = useAuth();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`flex-1 p-4`}>
            <View style={tw`flex-row items-center mb-4`}>
                <Image
                    style={tw`h-15 w-15 rounded-full mr-4`}
                    source={{ uri: photoUrl ? photoUrl : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" }}
                />
                <Text style={tw`text-3xl font-bold`}>{username ? `${username}` : 'Loading user information...'}</Text>
            </View>
            <Text style={tw`text-xl font-bold`}>{name ? `Name: ${name}` : 'Could not load name'}</Text>
            <Text style={tw`text-xl font-bold`}>{email ? `Email: ${email}` : 'Could not load email'}</Text>
            <Button
                onPress={() => navigation.navigate("StudentChangeDetails")}
                mode="contained"
                style={tw`mb-2`}
            >
                Update Details
            </Button>
            <Button
                onPress={() => navigation.navigate('StudentHome')}
                mode="contained"
                style={tw`mb-2`}
            >
                Home
            </Button>
        </SafeAreaView>
    )
}

export default StudentProfileScreen;
