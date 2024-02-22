import { View, Text, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CartStyle from '../styles/CartCSS';
import Icon from 'react-native-vector-icons/Feather';
import Ticket from 'react-native-vector-icons/MaterialCommunityIcons';
import Trash from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const Cart = () => {
  const [productos, setProductos] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

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
        }
      } catch (error) {
        console.error('Error al obtener productos del AsyncStorage:', error);
      }
    };

    ChangeCarrito();
  }, []);

  const Check = (index) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(index)) {
      updatedSelectedItems.delete(index);
    } else {
      updatedSelectedItems.add(index);
    }
    setSelectedItems(updatedSelectedItems);
  }

  const renderRightActions = (index) => (
    <View style={CartStyle.DeleteFavoritos}>
      <TouchableWithoutFeedback onPress={() => Check(index)}>
        <View style={[selectedItems.has(index) ? CartStyle.Enabled : CartStyle.Disabled]}>
          {selectedItems.has(index) ? <Icon name='minus' size={11} color='#fff' /> : ''}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const handleDeleteItem = async () => {
    const updatedProducts = productos.filter((_, index) => !selectedItems.has(index));

    try {
      await AsyncStorage.setItem('Carrito', JSON.stringify(updatedProducts));
      setProductos(updatedProducts);
      setSelectedItems(new Set());
    } catch (error) {
      console.error('Error al eliminar productos del AsyncStorage:', error);
    }
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

  const renderDeleteSection = () => {
    if (selectedItems.size > 0) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontFamily: 'Montserrat' }}>
            {`Eliminar ${selectedItems.size} producto${selectedItems.size > 1 ? 's' : ''}`}
          </Text>
          <TouchableOpacity onPress={handleDeleteItem}>
            <Trash name='trash-bin' size={20} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={CartStyle.CartScreen}>
      {renderDeleteSection()}
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