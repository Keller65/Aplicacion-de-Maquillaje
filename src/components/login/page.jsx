import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import React from 'react';
import { Button, View, ImageBackground, TouchableNativeFeedback, Text } from 'react-native';
import { useFonts } from 'expo-font';
import LoginStyle from './LoginCSS';

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '382215266798-brqc0lho6146mvm308krda4v3fjaijk0.apps.googleusercontent.com',
    androidClientId: '382215266798-ed8fd9ethqg11ost59se5l8a32lsq1km.apps.googleusercontent.com',
    responseType: ResponseType.Token,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log(id_token);
    }
  }, [response]);

  const [fontsLoaded] = useFonts({
    Poppins: require('../../../assets/fonts/PoppinsRegular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require('../../../assets/BG.png')} fadeDuration={300} resizeMode="cover" style={LoginStyle.LoginScreen}>
      {/*<Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />*/}

      <TouchableNativeFeedback onPress={() => promptAsync()}>
        <View style={LoginStyle.Next}>
          <Text style={{ color: '#000', fontFamily: 'Poppins' }}>Continuar</Text>
        </View>
      </TouchableNativeFeedback>

    </ImageBackground>
  );
}