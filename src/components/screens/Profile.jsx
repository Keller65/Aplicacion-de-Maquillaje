import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, FlatList, TouchableHighlight } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heart from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileStyle from '../styles/ProfileCSS';

export default function Profile() {
  useFonts({
    PoppinsLigth: require('../../../assets/fonts/PoppinsRegular.ttf'),
    Montserrat: require('../../../assets/fonts/MontserratAlternates-Regular.ttf')
  });

  const bottomSheetModalRef = useRef(null);
  const FavRef = useRef(null);

  const snapPoints = ['40%'];
  const FavsPoinst = ['75%', '85%'];

  const [isModalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []);

  function handlePresentModal() {
    setModalVisible(true);
    bottomSheetModalRef.current?.present();
  }

  function handlePresentFavoritos() {
    setModalVisible(true);
    FavRef.current?.present();
  }

  function handleModalChange(index) {
    if (index === -1) {
      setModalVisible(false);
    }
  }

  function handleModalFavs(index) {
    if (index === -1) {
      setModalVisible(false);
    }
  }

  const [country, setCountry] = useState('');

  useEffect(() => {
    const GetLocation = async () => {
      try {
        const storedCountry = await AsyncStorage.getItem('country');
        if (storedCountry) {
          setCountry(storedCountry);
          console.log(storedCountry);
        }
      } catch (error) {
        console.error('Error loading country from AsyncStorage:', error);
      }
    };

    GetLocation();
  }, []);

  const photoUri = 'https://lh3.googleusercontent.com/a/ACg8ocLvMGoBe_d7HwbYpeZphxMpu4Y58yKusXAQ0UYNW0rf8qo=s96-c';

  return (
    <GestureHandlerRootView style={isModalVisible ? ProfileStyle.ProfileScreenBlur : ProfileStyle.ProfileScreen}>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, position: 'relative' }}>
        <Image style={ProfileStyle.PhotoUser} source={{ uri: photoUri }} />

        <View style={{ gap: -5 }}>
          <Text style={{ fontFamily: 'PoppinsLigth', fontSize: 18, color: '#B1B1B1' }}>Hello</Text>

          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', fontFamily: 'PoppinsLigth', }}>
            <Image style={ProfileStyle.ChechBadge} source={require('../../../assets/badgeCheck.png')} />
            <Text>Aerley Lopez</Text>
          </View>
        </View>

        <TouchableHighlight style={ProfileStyle.LogOutButton} onPress={handlePresentModal}>
          <Text style={{ color: '#fff', fontFamily: 'PoppinsLigth', }}>salir</Text>
        </TouchableHighlight>
      </View>

      <View style={ProfileStyle.ContainerTags}>

        <View style={ProfileStyle.ContainerTag}>
          <View style={ProfileStyle.tagheart}>
            <Heart name='heart' size={25} color='#cf82ff' />
            {
              favorites.length ?
                <View style={ProfileStyle.BadgeFavoritosTotal}>
                  <Text style={{ fontSize: 7, color: '#fff' }}>{favorites.length}</Text>
                </View>
                : null
            }
          </View>
          <Text style={{ fontFamily: 'PoppinsLigth' }} onPress={handlePresentFavoritos} >ver favoritos</Text>
        </View>

        <View style={ProfileStyle.ContainerTag}>
          <View style={ProfileStyle.tagwallet}>
            <Image style={{ height: 25, width: 25 }} source={require('../../../assets/wallet-cards.png')} />
          </View>
          <Text style={{ fontFamily: 'PoppinsLigth' }}>$2,570.78</Text>
        </View>

        <View style={ProfileStyle.ContainerTag}>
          <View style={ProfileStyle.tagOwner}>
            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={require('../../../assets/margie.jpg')} />
            <Image style={ProfileStyle.TagOwerCheck} source={require('../../../assets/ownerCheck.png')} />
          </View>

          <View>
            <Text style={{ fontFamily: 'PoppinsLigth', lineHeight: 15, color: '#B1B1B1' }}>Margie Lopez</Text>
            <Text style={{ fontFamily: 'PoppinsLigth', lineHeight: 15, fontSize: 12 }}>@margie_lopez.wwh</Text>
          </View>

          <Entypo name='chevron-thin-right' size={23} style={{ position: 'absolute', right: 0 }} />
        </View>

      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={(index) => handleModalChange(index)}
        >
          <View style={{ paddingHorizontal: 20, height: '100%', position: 'relative', alignItems: 'center' }}>
            <View style={ProfileStyle.ConatinerUp}>
              <Image style={ProfileStyle.PhotoUser} source={{ uri: photoUri }} />

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={ProfileStyle.badge}>
                  <Text style={{ fontFamily: 'PoppinsLigth', fontSize: 12, color: '#7d7d7d' }}>Aerley Lopez</Text>
                </View>

                <View style={ProfileStyle.badge}>
                  <Text style={{ fontFamily: 'PoppinsLigth', fontSize: 12, color: '#7d7d7d' }}>{country}</Text>
                </View>
              </View>

            </View>
            <TouchableHighlight style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: 5 }}>
              <View style={ProfileStyle.CerrarSesion}>
                <Icon name='logout' color='#fff' size={20} />
                <Text style={{ color: '#fff', fontSize: 15 }}>cerrar sesion</Text>
              </View>
            </TouchableHighlight>
          </View>
        </BottomSheetModal>

        <BottomSheetModal
          ref={FavRef}
          index={0}
          snapPoints={FavsPoinst}
          onChange={(index) => handleModalFavs(index)}
        >
          <View>
            <Text style={{ fontFamily: 'PoppinsLigth', fontSize: 12 }}>{favorites.length} Productos Agregados</Text>

            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={ProfileStyle.CardFavorito}>
                  {item.imagenProduct && <Image style={ProfileStyle.FavoritoImagen} source={{ uri: item.imagenProduct }} />}

                  <View style={ProfileStyle.ConatinerPriceFavoritos}>
                    <Text style={{ fontFamily: 'Montserrat', fontSize: 12 }}>{item.producto}</Text>
                    <Text style={{ fontFamily: 'Montserrat', fontSize: 12 }}>{item.precio}</Text>
                  </View>
                </View>
              )}

              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ alignItems: 'center' }}
              scrollEnabled={true}
              nestedScrollEnabled={true}
            />
          </View >
        </BottomSheetModal>

      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}