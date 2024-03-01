import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, Animated, Easing, Image, View, ScrollView } from 'react-native';
import Style from './style';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSvg from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductView = ({ productDetails, closeProductView }) => {
  const [fontloaded] = useFonts({
    Regular: require('../../../../assets/fonts/MontserratAlternates-Regular.ttf'),
    Medium: require('../../../../assets/fonts/PoppinsRegular.ttf')
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
      <View style={{ width: '100%', position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleModalClose} style={Style.Close}>
          <Icon name='chevron-left' color='#000' size={33} />
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontFamily: 'Medium' }}>{productDetails.marca}</Text>

        {
          productDetails.descuento ?
            <View style={Style.Badge}>
              <IconSvg name='ticket-confirmation' size={20} color='#D4A373' />
              <Text style={{ fontFamily: 'Regular', fontSize: 11, color: '#D4A373' }}> -{(productDetails?.descuento / productDetails.precio * 100).toFixed(0)}%</Text>
            </View>
            :
            null
        }
      </View>

      <View>
        <ScrollView horizontal={true} style={Style.ContainerImageView} showsHorizontalScrollIndicator={false}>
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
          L. {(productDetails.precio - productDetails?.descuento).toFixed(0)}
        </Text>
      </View>

      <Text style={{ fontFamily: 'Regular', fontSize: 16, marginTop: 20, textAlign: 'justify', color: '#747474'  }}>
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
        <TouchableOpacity onPress={AddToCart} style={Style.ButtonShopping}>
          <MaterialIcons name='shopping-bag' size={25} color='#fff' />
          <Text style={{ color: '#fff', fontFamily: 'Regular' }}>agregar a la cesta</Text>
        </TouchableOpacity>
      </View>

    </Animated.View>
  );
};

export default ProductView;