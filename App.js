import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Menu from './src/Menu';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/login/page';
import BoardOne from './src/components/onboardigs/BoardOne';

const OAuthtoken = ' ';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      {OAuthtoken ? <Menu /> : <Login />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});