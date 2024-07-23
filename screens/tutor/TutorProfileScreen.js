import { View, Text, Image } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';
import tw from 'twrnc';
import useChats from '../../hooks/chatProvider'

const TutorProfileScreen = () => {
    const { username, name, email, subjects, rating, ratingCount, photoUrl } = useAuth();
    const { subjectList } = useChats();
    const navigation = useNavigation();

    const subjectString = () => {
        if (subjects) {
            repStr = ''
            for (i = 0; i < subjects.length; i++) {
                currId = subjects[i].subject_id;
                repStr += `${subjectList[currId - 1].name}` + ' | ' + `Years: ${subjects[i].yoe}` + "\n";           
            }
            return repStr;
        } else {
            return 'Could not load subjects';
        }
    
    }
    return (
        <SafeAreaView style={tw`flex-1 p-4`}>
            <View style={tw`flex-row items-center mb-4`}>
                <Image
                    style={tw`h-15 w-15 rounded-full mr-4`}
                    source={{ uri: photoUrl ? photoUrl : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" }} // change to user image when complete
                />
                <Text style={tw`text-3xl font-bold`}>{username ? `${username}` : 'Loading user information...'}</Text>
            </View>
            <Text style={tw`text-xl font-bold`}>{name ? `Name: ${name}` : 'Could not load name'}</Text>
            <Text style={tw`text-xl font-bold`}>{email ? `Email: ${email}` : 'Could not load email'}</Text>
            <Text style={tw`text-xl font-bold`}>{subjectString()}</Text>
            <Text style={tw`text-xl font-bold`}>{`Rating: ${rating}`}</Text>
            <Text style={tw`text-xl font-bold`}>{`Rating count: ${ratingCount}`}</Text>
            <Button
                onPress={() => navigation.navigate("TutorChangeDetails")}
                mode="contained"
                style={tw`mb-2`}
            >
                Update Details
            </Button>
            <Button
                onPress={() => navigation.navigate('TutorHome')}
                mode="contained"
                style={tw`mb-2`}
            >
                Home
            </Button>
        </SafeAreaView>
    )
}

export default TutorProfileScreen;
