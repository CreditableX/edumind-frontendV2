import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import tw from 'twrnc';
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons'

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  console.log('Image source:', require("../assets/edumind.png"));
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
            source={{ uri: "https://tinder.com/static/tinder.png" }}
          />
        </TouchableOpacity>
        
        <TouchableOpacity>
        <Image style={tw`h-14 w-14`} source={require("../assets/edumind.png")} />

      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Ionicons name='chatbubbles-sharp' size={30}/>
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