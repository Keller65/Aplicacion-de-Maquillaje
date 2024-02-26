import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Menu from './src/Menu';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/login/page';
import Loading from './src/components/Loading';
import Swiper from './src/components/Swiper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const OAuthtoken = ' ';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        {OAuthtoken ? <Menu /> : <Login />}
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
});