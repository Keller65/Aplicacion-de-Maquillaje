import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import GoogleIco from 'react-native-vector-icons/FontAwesome'
import LoginCSS from './LoginCSS';

const Login = () => {
  return (
    <SafeAreaView style={LoginCSS.LoginScreen}>

      <TouchableOpacity style={LoginCSS.SignWithGoogle}>
        <GoogleIco name='google' size={22} color='#fff' />
        <Text style={{ color: '#fff' }}>Continuar con Google</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default Login;