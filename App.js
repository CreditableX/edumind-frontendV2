import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { MainProvider } from './hooks/mainProvider';


export default function App() {
  return (
    <NavigationContainer>
      <MainProvider>
        <StackNavigator />
      </MainProvider>
    </NavigationContainer>

  );
}
