import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import tw from 'twrnc';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import images from '../assets/images';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Error', error.message); // Display error message if signup fails
    }
  }

  return (
    <SafeAreaView>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" }} // change to user image when complete
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={tw`h-14 w-14`} source={require("../assets/edumind.png")} // see if you can fix, i cant get it to show up
          />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name='chatbubbles-sharp' size={30} />
        </TouchableOpacity>
      </View>
      {/* End Header */}


      <Text>HomeScreen</Text>
      <Button title="New Chat"
        onPress={() => navigation.navigate("NewChat")}
      />
      <Button title="Log Out"
        onPress={() => handleLogOut()}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})