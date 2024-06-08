import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';

const StartUpScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1`}>
            <ImageBackground
                resizeMode="cover"
                style={tw`flex-1 justify-center items-center`}
                source={{ uri: "https://tinder.com/static/tinder.png" }} // change to edumind image when complete
            >
                <TouchableOpacity style={[
                    tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`,
                    { marginHorizontal: "25%" },
                ]}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={tw`text-center text-lg font-bold`}>
                        Login
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default StartUpScreen