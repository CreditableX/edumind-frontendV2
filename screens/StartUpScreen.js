import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';

const StartUpScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 bg-black`}>
            <ImageBackground
                resizeMode="contain"
                style={tw`flex-1 justify-center items-center`}
                source={require("../assets/edumind.png")} // change to edumind image when complete
            >
                <TouchableOpacity style={[
                    tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`,
                    { marginHorizontal: "25%" },
                ]}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={tw`text-center text-lg font-bold`}>
                        Enter
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default StartUpScreen