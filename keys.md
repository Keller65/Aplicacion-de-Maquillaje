Configuration: Build Credentials X3u4J4vHq_ (Default)
Keystore
Type                JKS
Key Alias           093ec4ee2f24ad87c4d6e8e6cdc51058
MD5 Fingerprint     A7:E5:1C:25:97:50:5D:7F:4E:EA:7E:44:4A:75:FF:CF
SHA1 Fingerprint    B5:39:EB:BC:37:98:BD:25:E1:CC:3F:EF:23:BF:46:DD:72:BC:4A:90
SHA256 Fingerprint  36:DB:E4:10:EB:F6:86:E8:F9:05:32:DC:FE:B0:D4:C7:98:77:11:CB:2E:B7:BC:82:D3:18:0D:47:6F:24:B7:FE
Updated             -4 second ago

Client ID:          382215266798-othco7p3f8osddil7jpb41rpldjl4eae.apps.googleusercontent.com


//
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Animated, Easing, Image, View, ScrollView } from 'react-native';
import Style from './style';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSvg from 'react-native-vector-icons/MaterialCommunityIcons'

const ProductView = ({ productDetails, closeProductView }) => {
  useFonts({
    Regular: require('../../../../assets/fonts/MontserratAlternates-Regular.ttf')
  })

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleModalClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 90,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      closeProductView();
    });
  };

  return (
    <Animated.View style={[Style.Screen, { opacity: fadeAnim }]}>
      {productDetails.descuento ? <IconSvg name='ticket-percent' size={25} color='#000' /> : null}

      <View style={Style.ContainerImageView}>
        <View style={Style.ImageView}>
          <Image source={{ uri: productDetails.imagenProduct }} style={{ width: '100%', height: '100%' }} />
          {productDetails.tonoImage ? <Image source={{ uri: productDetails.tonoImage }} style={{ width: '100%', height: '100%' }} /> : ''}
        </View>
      </View>

      <View style={Style.ConatinerProductoInfo}>
        <Text style={{ fontFamily: 'Regular', fontSize: 16 }}>{productDetails.producto}</Text>
        <Text style={{ fontFamily: 'Regular', fontSize: 16 }}>{productDetails.marca}</Text>

        <Text style={{ fontFamily: 'Regular', fontSize: 16, position: 'absolute', right: 0 }}>L. {productDetails.precio}.00</Text>
      </View>

      <Text style={{ fontFamily: 'Regular', fontSize: 16, marginTop: 30, textAlign: 'justify' }}>{productDetails.descripcion}</Text>

      <TouchableOpacity onPress={handleModalClose} style={{ position: 'absolute', top: 20, right: 15 }}>
        <Icon name='close' color='rgba(0,0,0,0.5)' size={25} />
      </TouchableOpacity>

      <View style={Style.ContainerTonos}>
        <Text style={Style.TextTonos}>tonos</Text>
        <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
          {productDetails.tonos.map((tono, index) => (
            <Text key={index} style={{ height: 20, width: 20, backgroundColor: tono, borderRadius: 50 }}></Text>
          ))}
        </View>
      </View>

      <View style={Style.ContainerShopping}>
        <TouchableOpacity style={Style.ButtonShopping}>
          <MaterialIcons name='shopping-bag' size={25} color='#fff' />
          <Text style={{ color: '#fff', fontFamily: 'Regular' }}>agregar a la cesta</Text>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
};

export default ProductView;

//styles
import { Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";

const SearchStyle = StyleSheet.create({
    SearchScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10
    },

    InputSearch: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        paddingVertical: 8, /*14 IOS y 8 Android*/
        paddingRight: 35,
        paddingHorizontal: 20,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        width: '85%'
    },

    ContainerSearch: {
        flexDirection: 'row',
        gap: 0,
        position: 'relative',
        alignItems: 'center',
    },

    filter: {
        height: 45,
        width: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderTopStartRadius: 12,
        borderBottomStartRadius: 12,
        alignItems: 'center', 
        justifyContent: 'center'
    },

    closeIcon: {
        position: 'absolute',
        right: 25
    },

    //Card UI products

    CardProduct: {
        margin: 5,
        width: 180,
        height: 'auto',
        overflow: 'hidden',
        position: 'relative',
    },

    ImagenProduct: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0ece691',
        borderRadius: 8
    },

    ContainerPrice: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },

    Icon: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 99,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    //Pantalla de Busqueda no encontrada

    NoResultsContainer: {
        height: '90%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    },
})

export default SearchStyle;

// Config

const config = {
  issuer: 'https://accounts.google.com',
  clientId: 'GOOGLE_OAUTH_APP_GUID.apps.googleusercontent.com',
  redirectUrl: 'com.googleusercontent.apps.GOOGLE_OAUTH_APP_GUID:/oauth2redirect/google',
  scopes: ['openid', 'profile']
};

// Log in to get an authentication token
const authState = await authorize(config);

// Refresh token
const refreshedState = await refresh(config, {
  refreshToken: authState.refreshToken
});

// Revoke token
await revoke(config, {
  tokenToRevoke: refreshedState.refreshToken
});