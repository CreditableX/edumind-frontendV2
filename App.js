import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const tw = useTailwind();
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

  );
}
