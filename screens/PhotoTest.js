import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import tw from 'twrnc';
import useChats from '../hooks/chatProvider';
import DropDown from 'react-native-paper-dropdown';
import { HeaderBackButton } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from "expo-image-picker";
import { compressImage } from '../util/ImageProcessing';
import { uploadToCloudinary } from '../config/cloudinaryConfig';

const PhotoTestScreen = () => {
    const [header, setHeader] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [topic, setTopic] = useState('');
    const [topicVisible, setTopicVisible] = useState(false);
    const [aspectRatio, setAspectRatio] = useState('')
    const { newChat } = useChats();
    const navigation = useNavigation();

    const topics = ["chemistry", "physics", "math"];


    const handleNewChat = async () => {
        // if an image is attached, then we call uploadToCloudinary function
        if (image != null) {
            try {
                console.log("image " + image)
                const compressedImage = await compressImage(image);
                try {
                    const response = await uploadToCloudinary(compressedImage, "default");
                    console.log("Image Upload successful");
                    imageLink = response.secure_url;
                } catch (uploadError) {
                    console.error("Upload failed:", uploadError);
                    Alert.alert("Image uploading failed");
                    return;
                }
                } catch (error) {
                console.error("Image compression failed:", error);
                Alert.alert("Image compression failed");
                return;
                }
            }
        };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          const { width, height } = result.assets[0];
          const ratio = width / height;
          setAspectRatio(ratio);
        }
      };

    return (

        <View style={tw`flex-1 justify-center items-center p-4`}>
            <View style={tw`absolute top-10 left-0`}>
                <Button
                    icon="arrow-left"
                    onPress={() => navigation.navigate('Home')}
                    style={tw`rounded-l`} // Increase padding and use rounded corners
                    contentStyle={tw`py-2 px-6`} // Adjust padding inside the button
                />
            </View>

            <Text style={tw`mb-4 text-lg font-bold`}>Input the following details</Text>

            {/* Image styles */}
            <View style={tw`border-2 border-gray-400 p-4 rounded-lg w-95p items-center`}>
                <Button icon="camera" onPress={pickImage}>
                    Upload a photo of your question!
                </Button>
                {image && aspectRatio && (
                    <View style={tw`items-center mt-2`}>
                        <Image
                            source={{ uri: image }}
                            style={{ width: '100%', aspectRatio: aspectRatio }}
                        />
                    </View>
                )}
            </View>

            <View style={tw`mt-4 w-full`}>
                <Button icon="upload" mode="contained" onPress={handleNewChat}>
                    Submit
                </Button>
            </View>
        </View>
    );
};

export default PhotoTestScreen;
