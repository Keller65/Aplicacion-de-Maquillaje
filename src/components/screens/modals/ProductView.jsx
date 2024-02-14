import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, Animated, Easing, Image, View, ScrollView } from 'react-native';
import Style from './style';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSvg from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductView = ({ productDetails, closeProductView }) => {
  const [fontloaded] = useFonts({
    Regular: require('../../../../assets/fonts/MontserratAlternates-Regular.ttf')
  });

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

  if (!fontloaded) {
    return null;
  }

  const AddToCart = async () => {
    try {
      const itemToAdd = {
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
  return (
    <Animated.View style={[Style.Screen, { opacity: fadeAnim }]}>
      {
        productDetails.descuento ?
          <View style={Style.Badge}>
            <IconSvg name='ticket-percent' size={20} color='#000' />
            <Text style={{ fontFamily: 'Regular', fontSize: 11 }}> -{(productDetails?.descuento / productDetails.precio * 100).toFixed(0)}%</Text>
          </View>
          :
          null
      }

      <View>
        <ScrollView horizontal={true} style={Style.ContainerImageView}>
          <View style={Style.ImageView}>
            <Image source={{ uri: productDetails.imagenProduct }} style={{ width: '100%', height: '100%' }} />
          </View>

          {productDetails.tonoImage ? (
            <View style={Style.TonoImage}>
              <Image source={{ uri: productDetails.tonoImage }} style={{ width: '100%', height: '100%' }} />
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View style={Style.ConatinerProductoInfo}>
        <Text style={{ fontFamily: 'Regular', fontSize: 16 }}>{productDetails.producto}</Text>
        <Text style={{ fontFamily: 'Regular', fontSize: 16 }}>{productDetails.marca}</Text>

        <Text style={{ fontFamily: 'Regular', fontSize: 16, position: 'absolute', right: 0 }}>
          L. {productDetails.precio - productDetails?.descuento}
        </Text>
      </View>

      <Text style={{ fontFamily: 'Regular', fontSize: 16, marginTop: 30, textAlign: 'justify' }}>
        {productDetails.descripcion}
      </Text>

      <TouchableOpacity onPress={handleModalClose} style={{ position: 'absolute', top: 20, right: 15 }}>
        <Icon name='close' color='rgba(0,0,0,0.5)' size={25} />
      </TouchableOpacity>

      <View style={Style.ContainerTonos}>
        <Text style={[Style.TextTonos, { fontFamily: 'Regular' }]}>tonos</Text>
        <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
          {productDetails.tonos.map((tono, index) => (
            <Text key={index} style={{ height: 20, width: 20, backgroundColor: tono, borderRadius: 50 }}></Text>
          ))}
        </View>
      </View>

      <View style={Style.ContainerShopping}>
        <TouchableOpacity onPress={AddToCart} style={Style.ButtonShopping}>
          <MaterialIcons name='shopping-bag' size={25} color='#fff' />
          <Text style={{ color: '#fff', fontFamily: 'Regular' }}>agregar a la cesta</Text>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
};

export default ProductView;