import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ticket from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import app from '../../DB/firebaseConfig';
import HomeStyle from '../styles/HomeCSS';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación no otorgado');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
          const countryName = reverseGeocode[0].country + " " + reverseGeocode[0].subregion;
          const pais = reverseGeocode[0].country;
          setCountry(countryName);
          await AsyncStorage.setItem('country', pais);
        }
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación: ' + error.message);
      }
    })();
  }, []);

  const [productos, setProductos] = useState([]);
  const [fontsLoaded] = useFonts({
    Poppins: require('../../../assets/fonts/PoppinsRegular.ttf'),
    Montserrat: require('../../../assets/fonts/MontserratAlternates-Regular.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const db = getFirestore(app);
        const productosCollection = collection(db, 'Carrusel');
        const querySnapshot = await getDocs(productosCollection);

        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosData);
        //console.log('Productos:', productosData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }

    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    } else {
      fetchProductos();
    }
  }, [fontsLoaded]);

  const photoUri = 'https://lh3.googleusercontent.com/a/ACg8ocLvMGoBe_d7HwbYpeZphxMpu4Y58yKusXAQ0UYNW0rf8qo=s96-c';

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={HomeStyle.HomeScreen}>
      <View style={HomeStyle.StatusBar}>
        <Icon name='grid' size={26} color='#000' />
        <Text style={{ fontFamily: 'Poppins' }}>¡Bienvenido otra vez!</Text>
        <Image source={{ uri: photoUri }} style={{ width: 50, height: 50, borderRadius: 50 }} />
      </View>

      <Text>{country}</Text>

      <Image style={{ width: '100%', height: 130, borderRadius: 20 }} source={require('../../../assets/post.png')} />

      <View>
        <ScrollView style={HomeStyle.Oferts} horizontal={true} showsHorizontalScrollIndicator={false}>
          {productos.map((item) => (
            <View key={item.id} style={HomeStyle.CardItem}>
              <View style={{ height: 150, width: 150, position: 'relative' }}>
                <View style={HomeStyle.Badge}>
                  <Ticket name='ticket-confirmation' size={15} color='#a39367' />
                </View>
                <Image source={{ uri: item.imagen }} style={{ height: '100%', width: '100%', backgroundColor: '#f0ece691', borderRadius: 15 }} />
              </View>

              <View style={HomeStyle.Pricing}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 12, textDecorationLine: 'line-through', color: '#a39367' }}>L. {(item.price).toFixed(0)}</Text>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 12 }}>L. {(item.price - item.descuento).toFixed(0)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;