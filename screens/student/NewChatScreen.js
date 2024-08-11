import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import DropDown from 'react-native-paper-dropdown';
import tw from 'twrnc';
import { uploadToCloudinary } from '../../config/cloudinaryConfig';
import useChats from '../../hooks/chatProvider';
import { compressImage } from '../../util/ImageProcessing';

const NewChatScreen = () => {
    const [header, setHeader] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [topic, setTopic] = useState('');
    const [topicVisible, setTopicVisible] = useState(false);
    const { newChat } = useChats();
    const navigation = useNavigation();

    // hardcoded for now
    const topics = ["chemistry", "physics", "math"];

    const openTopicMenu = () => setTopicVisible(true);
    const closeTopicMenu = () => setTopicVisible(false);

    const handleNewChat = async () => {
        // if an image is attached, then we call uploadToCloudinary function
        if (image != null) {
            try {
                const compressedImage = await compressImage(image);
                try {
                    const response = await uploadToCloudinary(compressedImage, "default");
                    imageLink = response.secure_url;
                    try {
                        console.log('topic is ' + topic)
                        console.log('header is ' + header)
                        await newChat(1, header, imageLink, message);
                        navigation.navigate('StudentChat'); // go to chats screen
                    } catch (error) {
                        Alert.alert('Chat creation error', error.message); // Display error message if chat creation fails
                    }

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

    // choose image from gallery
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

            {/* Back button */}
            <View style={tw`absolute top-10 left-0`}>
                <Button
                    icon="arrow-left"
                    onPress={() => navigation.navigate('StudentHome')}
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
                {image && (
                    <View style={tw`items-center mt-2`}>
                        <Image
                            source={{ uri: image }}
                            style={{ width: '100%', aspectRatio: 1 }}
                        />
                    </View>
                )}
            </View>

            <View style={tw`w-full mt-4`}>
                {/* Dropdown for subject */}
                <DropDown
                    label="Topic"
                    mode="outlined"
                    visible={topicVisible}
                    showDropDown={openTopicMenu}
                    onDismiss={closeTopicMenu}
                    value={topic ? topic : "Select Topic"}
                    setValue={setTopic}
                    list={topics.map((topicOption) => ({
                        label: topicOption,
                        value: topicOption,
                    }))}
                />

                {/* Header input */}
                <TextInput
                    label="Header"
                    value={header}
                    onChangeText={setHeader}
                    style={tw`mt-4`}
                    multiline={true}
                    numberOfLines={1}
                    maxLength={100}
                />

                {/* Message input */}
                <TextInput
                    label="Message"
                    value={message}
                    onChangeText={setMessage}
                    style={tw`mt-4`}
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical={"top"}
                />
            </View>

            {/* Submit button */}
            <View style={tw`mt-4 w-full`}>
                <Button icon="upload" mode="contained" onPress={handleNewChat}>
                    Submit
                </Button>
            </View>
        </View>
    );
};

export default NewChatScreen;
