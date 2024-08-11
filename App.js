import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from "react-native-paper";
import { MainProvider } from './hooks/mainProvider';
import StackNavigator from './StackNavigator';


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
