import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Animated, Easing, Image, View, ScrollView, Pressable } from 'react-native';
import Style from './style';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconSvg from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bag from '../../../../assets/bag.png';

const ProductView = ({ productDetails, closeProductView }) => {
  const [fontloaded] = useFonts({
    Regular: require('../../../../assets/fonts/MontserratAlternates-Regular.ttf'),
    Medium: require('../../../../assets/fonts/PoppinsRegular.ttf'),
    Bold: require('../../../../assets/fonts/PoppinsMedium.ttf')
  });

  const [fadeAnim] = useState(new Animated.Value(0));
  const [fav, setFav] = useState(false);

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

  if (!fontloaded) {
    return null;
  }

  const AddToCart = async () => {
    try {
      const itemToAdd = {
        id: productDetails.id,
        precio: productDetails.precio - productDetails?.descuento,
        imagen: productDetails.imagenProduct,
        producto: productDetails.producto,
        marca: productDetails.marca,
        tono: productDetails?.tonos[0],
        estado: productDetails.estado,
      };

      const currentCart = JSON.parse(await AsyncStorage.getItem('Carrito')) || [];
      currentCart.push(itemToAdd);
      await AsyncStorage.setItem('Carrito', JSON.stringify(currentCart));

      console.log('Se agregó al carrito:', itemToAdd);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  }

  const toggleFavoriteProduct = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      const isProductInFavorites = favoritesArray.some(
        (fav) => fav.id === productDetails.id
      );

      if (isProductInFavorites) {
        favoritesArray = favoritesArray.filter(
          (fav) => fav.id !== productDetails.id,
          console.error('se elimino de favoritos: ', productDetails.id)
        );
      } else {
        const productToSave = {
          id: productDetails.id,
          imagenProduct: productDetails.imagenProduct,
          precio: productDetails.precio - productDetails?.descuento,
          marca: productDetails.marca,
          producto: productDetails.producto,
        };
        favoritesArray.push(productToSave);
        console.info('se agrego a favoritos: ', productToSave);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

      setFav(!fav);
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  return (
    <Animated.View style={[Style.Screen, { opacity: fadeAnim }]}>

      <View style={{ width: '100%', position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleModalClose} style={Style.Close}>
          <Icon name='chevron-left' color='#000' size={33} />
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontFamily: 'Medium' }}>{productDetails.marca}</Text>

        {productDetails.descuento ?
          <View style={Style.Badge}>
            <IconSvg name='ticket-confirmation' size={20} color='#D4A373' />
            <Text style={{ fontFamily: 'Regular', fontSize: 11, color: '#D4A373' }}> -{(productDetails?.descuento / productDetails.precio * 100).toFixed(0)}%</Text>
          </View>
          :
          null}
      </View>

      <View>
        <ScrollView horizontal={true} style={Style.ContainerImageView} showsHorizontalScrollIndicator={false}>
          <View style={Style.ImageView}>
            <Image source={{ uri: productDetails.imagenProduct }} style={{ width: '100%', height: '100%', aspectRatio: '1' }} />
          </View>

          {productDetails.tonoImage ? (
            <View style={Style.TonoImage}>
              <Image source={{ uri: productDetails.tonoImage }} style={{ width: '100%', height: '100%', aspectRatio: '1' }} />
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View style={Style.ConatinerProductoInfo}>
        <Text style={{ fontFamily: 'Regular', fontSize: 16 }}>{productDetails.producto}</Text>

        <Pressable onPress={toggleFavoriteProduct} style={Style.PressableFav}>
          {fav === true ? <Heart name='heart' size={20} color='#000' /> : <Heart name='heart-outline' size={20} color='#000' />}
        </Pressable>
      </View>

      <Text style={{ fontFamily: 'Regular', fontSize: 16, marginTop: 20, textAlign: 'justify', color: '#747474' }}>
        {productDetails.descripcion}
      </Text>

      <View style={Style.ContainerTonos}>
        <Text style={[Style.TextTonos, { fontFamily: 'Regular' }]}>tonos</Text>
        <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
          {productDetails?.tonos.map((tono, index) => (
            <Text key={index} style={{ height: 20, width: 20, backgroundColor: tono, borderRadius: 50 }}></Text>
          ))}
        </View>
      </View>

      <View style={Style.ContainerShopping}>
        <View style={Style.ContainerPriceStyle}>
          <Text style={{ fontSize: 11, fontFamily: 'Medium', color: '#C6C6C6', lineHeight: 17 }}>Precio Total</Text>
          <Text style={{ fontFamily: 'Bold', lineHeight: 19, fontSize: 17, letterSpacing: -1 }}>L .{(productDetails.precio - productDetails?.descuento).toFixed(2)}</Text>
        </View>

        <TouchableOpacity onPress={AddToCart} style={Style.ButtonShopping}>
          <Image source={Bag} style={{ height: 25, width: 25 }} />
          <Text style={{ color: '#fff', fontFamily: 'Regular' }}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
};

export default ProductView;