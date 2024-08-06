import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, Image, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import tw from 'twrnc'
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/core';
import useChats from '../../hooks/chatProvider';
import * as ImagePicker from "expo-image-picker";
import { compressImage } from '../../util/ImageProcessing';
import { uploadToCloudinary } from '../../config/cloudinaryConfig';

const TutorSignupScreen = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [photoUrl, setPhotoUrl] = useState('');
    const [image, setImage] = useState('');
    const { tutorSignup, error } = useAuth();
    const navigation = useNavigation();
    const { subjectList } = useChats();

    const [checkboxes, setCheckboxes] = useState([]);

    const checkValid = (username, name, subjects, email) => {
        const moderateEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (username.length < 3 || name.length < 3) {
            return 'Username and name need to be at least 3 characters'
        }
        if (typeof subjects !== 'object' || Object.keys(subjects).length === 0) {
            return 'Needs to have at least 1 subject';
        }
        if (!moderateEmailRegex.test(email)) {
            return 'Invalid Email';
        }
        return '';
    }

    useEffect(() => {
        if (subjectList) {
            const initialCheckboxes = subjectList.map(subject => ({
                id: subject.subject_id,
                label: subject.name,
                checked: false,
                yearsOfExperience: 0
            }));
            setCheckboxes(initialCheckboxes);
        }
    }, [subjectList]);

    // Update subjects array whenever checkboxes state changes
    useEffect(() => {
        const updatedSubjects = checkboxes
            .filter(item => item.checked)
            .reduce((acc, item) => {
                acc[item.id] = item.yearsOfExperience; // assuming yearsOfExperience is an integer
                return acc;
            }, {});
    
        console.log(JSON.stringify(updatedSubjects, null, 2)); // Pretty-printing the JSON
    
        setSubjects(updatedSubjects);
    }, [checkboxes]);

    const handleCheckboxChange = (id) => {
        setCheckboxes(checkboxes.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleExperienceChange = (id, value) => {
        setCheckboxes(checkboxes.map(item =>
            item.id === id ? { ...item, yearsOfExperience: parseInt(value, 10) } : item
        ));
    };

    const handleSignup = async () => {
        if (image != '') {
            try {
                // console.log("image " + image)
                const compressedImage = await compressImage(image);
                try {
                    const response = await uploadToCloudinary(compressedImage, "default");
                    setPhotoUrl(response.url);
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

        const reply = checkValid(username, name, subjects, email);

        if (reply != '') {
            Alert.alert(reply);
        } else {
            await tutorSignup(username, password, name, subjects , email, photoUrl);
        }

        if (error != '') {
            Alert.alert('Signup Error', error);
        } else {
            navigation.navigate('Login'); // go to login screen
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
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                <View style={tw`w-4/5 mb-4 `}>

                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={tw`mb-4 border p-2`}
                    />
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={tw`mb-4 border p-2`}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={tw`mb-4 border p-2`}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={tw`mb-4 border p-2`}
                    />

                    {checkboxes.map(checkbox => (
                        <View key={checkbox.id} style={tw`flex-row items-center mb-2`}>
                            <CheckBox
                                value={checkbox.checked}
                                onValueChange={() => handleCheckboxChange(checkbox.id)}
                            />
                            <Text style={tw`ml-2`}>{checkbox.label}</Text>
                            {checkbox.checked && (
                                <TextInput
                                    placeholder="Years of Experience"   
                                    value={checkbox.yearsOfExperience}
                                    onChangeText={(value) => handleExperienceChange(checkbox.id, value)}
                                    style={tw`ml-4 border p-2 w-40`}
                                    keyboardType="numeric"
                                />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={tw`absolute bottom-4 w-full px-4`}>
                <Button onPress={handleSignup}> Sign Up! </Button>
            </View>
        </View>
    );
}

export default TutorSignupScreen