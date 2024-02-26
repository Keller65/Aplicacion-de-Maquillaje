import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import React from 'react';
import { Button, View } from 'react-native';
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

  return (
    <View style={LoginStyle.LoginScreen}>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}