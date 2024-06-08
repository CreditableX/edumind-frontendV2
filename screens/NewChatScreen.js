import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button } from 'react-native';
import tw from 'twrnc';

const NewChatScreen = () => {
    const [topic, setTopic] = useState('');
    const [header, setHeader] = useState('');
    const [question, setQuestion] = useState('');

    return (
        <View style={tw`flex-1 justify-center items-center p-4`}>
            <Text style={tw`mb-4 text-lg font-bold`}>Input the following details</Text>
            <TextInput
                placeholder="Topic"
                value={topic}
                onChangeText={setTopic}
                style={tw`mb-4 border p-2 w-4/5`}
            />
            <TextInput
                placeholder="Header"
                value={header}
                onChangeText={setHeader}
                style={tw`mb-4 border p-2 w-4/5`}
            />
            <TextInput
                placeholder="Question"
                value={question}
                onChangeText={setQuestion}
                style={tw`mb-4 border p-2 w-4/5 h-30`}
                multiline={true} // Enable multiple lines
                textAlignVertical="top" // Align text to start from the top
            />
            <View style={tw`flex-1 ml-2`}>
                <Button title="Submit" onPress={() => Alert.alert("Not implemented yet!")} />
            </View>
        </View>
    );
};

export default NewChatScreen;
