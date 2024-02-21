import { View, Text, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CartStyle from '../styles/CartCSS';
import Icon from 'react-native-vector-icons/Feather';
import Ticket from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const Cart = () => {
  const [productos, setProductos] = useState([]);
  const [enabled, setEnabled] = useState(false);

  useFonts({
    Montserrat: require('../../../assets/fonts/MontserratAlternates-Regular.ttf'),
    Montserrat2: require('../../../assets/fonts/MontserratAlternates-Medium.ttf'),
    Poppins: require('../../../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    const ChangeCarrito = async () => {
      try {
        const favorites = await AsyncStorage.getItem('Carrito');
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          setProductos(parsedFavorites);
          console.log(parsedFavorites);
        }
      } catch (error) {
        console.error('Error al obtener productos del AsyncStorage:', error);
      }
    };

    ChangeCarrito();
  }, []);

  const Check = () => {
    setEnabled(!enabled);
  }

  const renderRightActions = (index) => (
    <View style={CartStyle.DeleteFavoritos}>
      <TouchableWithoutFeedback onPress={Check}>
        <View style={[enabled === false ? CartStyle.Disabled : CartStyle.Enabled]}>
          {enabled === true ? <Icon name='minus' size={11} color='#fff' /> : ''}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const handleDeleteItem = (index) => {
  };

  const renderItem = ({ item, index }) => (
    <Swipeable key={index} renderRightActions={() => renderRightActions(index)} friction={1}>
      <View style={CartStyle.Producto}>
        <Image style={CartStyle.ImagenProduct} source={{ uri: item.imagen }} />
        <View style={{ justifyContent: 'space-evenly' }}>
          <View>
            <Text style={{ fontFamily: 'Montserrat', fontSize: 13 }}>{item.producto}</Text>
            <Text style={{ fontFamily: 'Montserrat', fontSize: 10, lineHeight: 10 }}>{item.marca}</Text>
          </View>
          <View style={[CartStyle.tono, { fontFamily: 'Montserrat', backgroundColor: item.tono }]}></View>
          <Text style={{ fontFamily: 'Montserrat2', fontSize: 10, lineHeight: 10 }}>L. {(item.precio).toFixed(0)}</Text>
        </View>
        {item.estado ?
          <View style={CartStyle.TagEstado}>
            <Ticket size={15} name='ticket-percent' color='#2fad33' />
            <Text style={{ fontFamily: 'Montserrat', fontSize: 8, color: '#2fad33' }}>Descuento</Text>
          </View> : ''}
      </View>
    </Swipeable>
  );

  return (
    <View style={CartStyle.CartScreen}>
      <View style={{ height: 380, width: '100%' }}>
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 15 }}
        />
      </View>
    </View>
  );
}

export default Cart;