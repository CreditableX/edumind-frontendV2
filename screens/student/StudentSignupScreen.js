import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image } from 'react-native';
import { Button } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from "expo-image-picker";
import { compressImage } from '../../util/ImageProcessing';
import { uploadToCloudinary } from '../../config/cloudinaryConfig';

const StudentSignupScreen = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [image, setImage] = useState('');
    const { studentSignup } = useAuth();
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (image != null) {
            try {
                // console.log("image " + image)
                const compressedImage = await compressImage(image);
                try {
                    const response = await uploadToCloudinary(compressedImage, "default");
                    setPhotoUrl(response.secure_url);
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
        try {
            await studentSignup(username, password, name, email, photoUrl);
            navigation.navigate('Login'); // go to login screen
        } catch (error) {
            Alert.alert('Signup Error', error.message); // Display error message if signup fails
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={tw`flex-row items-center justify-between p-4`}>
                <Button
                    icon="arrow-left"
                    onPress={() => navigation.navigate('Login')}
                    style={tw`rounded-l`} // Increase padding and use rounded corners
                    contentStyle={tw`py-2 px-6`} // Adjust padding inside the button
                />
            </View>
            <Text style={tw`text-2xl mb-4`}>Sign up</Text>
                <View style={tw`border-2 border-gray-400 p-3 rounded-lg w-80p items-center mb-6`}>
                    <Button icon="camera" onPress={pickImage}>
                        Upload a profile image!
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
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <View style={tw`flex-row justify-between w-4/5`}>
                <View style={tw`flex-1 ml-2`}>
                <Button onPress={handleSignup}> Sign Up! </Button>
                </View>
            </View>
        </View>
    );
}

export default StudentSignupScreen