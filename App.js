import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { MainProvider } from './hooks/mainProvider';
import { PaperProvider } from "react-native-paper";


export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <MainProvider>
        <StackNavigator />
      </MainProvider>
    </NavigationContainer>
    </PaperProvider>


  );
}
