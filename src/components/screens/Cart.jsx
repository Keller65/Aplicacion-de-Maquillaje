import { Image, Text, View, FlatList, TouchableHighlight, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CartStyle from '../styles/CartCSS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Ticket from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFonts } from 'expo-font';

const Cart = () => {

  useFonts({
    Montserrat: require('../../../assets/fonts/MontserratAlternates-Regular.ttf'),
    Montserrat2: require('../../../assets/fonts/MontserratAlternates-Medium.ttf'),
    Poppins: require('../../../assets/fonts/Poppins-Light.ttf'),
  })

  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const ChangeCartItems = async () => {
      const items = await AsyncStorage.getItem('Carrito');
      console.log('items del carrito', items);

      const parsedItems = JSON.parse(items);
      setProductos(parsedItems || []);
    }

    ChangeCartItems();
  }, []);

  useEffect(() => {
    const deleteItems = async () => {
      const items = await AsyncStorage.removeItem('Carrito');
      console.log('items del carrito', items);

      const parsedItems = JSON.parse(items);
      setProductos(parsedItems || []);
    }

    //deleteItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = productos.reduce((acc, item) => acc + parseFloat(item.precio), 0);
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [productos]);

  const renderItem = ({ item, index }) => (
    <View key={index} style={CartStyle.itemProductoCard}>

      {
        item.estado ?
          <View style={CartStyle.TagEstado}>
            <Ticket size={15} name='ticket-percent' color='#2fad33' />
            <Text style={{ fontFamily: 'Montserrat', fontSize: 8, color: '#2fad33' }}>Descuento</Text>
          </View> : ''
      }

      <View>
        <Image source={{ uri: item.imagen }} style={{ height: 120, width: 120, backgroundColor: '#f0ece6', borderRadius: 10 }} />
      </View>

      <View style={{ justifyContent: 'space-evenly' }}>
        <View>
          <Text style={{ fontFamily: 'Montserrat', fontSize: 13 }}>{item.producto}</Text>
          <Text style={{ fontFamily: 'Montserrat', fontSize: 13 }}>{item.marca}</Text>
        </View>

        <View style={[CartStyle.tono, { fontFamily: 'Montserrat', backgroundColor: item.tono }]}></View>

        <View>
          <Text style={{ fontFamily: 'Montserrat2', fontSize: 10 }}>L. {(item.precio).toFixed(0)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={CartStyle.CartScreen}>

      <View style={CartStyle.ContainerCarritoCards}>
        <Text>{productos.length} Productos en el Carrito</Text>
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ height: '37%', width: '100%' }}
        //numColumns={2}
        //columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>

      <View style={{ gap: 15 }}>
        <View style={CartStyle.TaxesContainer}>

          <View style={CartStyle.Total}>
            <Text style={{ fontFamily: 'Poppins', width: 'auto' }}>Subtotal</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>L. {total.toFixed(2)}</Text>
          </View>

          <View style={CartStyle.Total}>
            <Text style={{ fontFamily: 'Poppins' }}>ISV</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>L. {(total * 0.15).toFixed(2)}</Text>
          </View>

          <View style={CartStyle.Total}>
            <Text style={{ fontFamily: 'Poppins' }}>Descuento</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>L. {productos.length >= 3 ? (total * 0.15).toFixed(2) : ''}</Text>
          </View>

          <View style={CartStyle.Total}>
            <Text style={{ fontFamily: 'Poppins' }}>Total</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>L. {(total * 0.15 + total).toFixed(2)}</Text>
          </View>

        </View>

        <View style={{ width: '100%', height: 65, alignItems: 'center', }}>
          <TouchableOpacity style={CartStyle.BuyButton}>
            <Icon name='shopping-bag' size={26} color='#fff' />
            <Text style={{ color: '#fff' }} >Reservar Pedido</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}

export default Cart;