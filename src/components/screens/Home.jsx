import { View, Text, SafeAreaView } from 'react-native';
import HomeStyle from '../styles/HomeCSS'

const Home = () => {
  return(
    <SafeAreaView style={HomeStyle.HomeScreen}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
