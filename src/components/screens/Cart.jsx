import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity, Dimensions, TextInput, Vibration, LayoutAnimation, UIManager, Keyboard } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CartStyle from '../styles/CartCSS';
import Icon from 'react-native-vector-icons/Feather';
import Ticket from 'react-native-vector-icons/MaterialCommunityIcons';
import Trash from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loaderCart from '../../../assets/cart.png';
import Store from '../../../assets/store.png';
import app from '../../DB/firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFonts } from 'expo-font';

// El carrito Carga los productos del local storage

const large = Dimensions.get('window').width;
const BtnImg = 35;
const SizeText = 11;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const Cart = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [discount, setDiscount] = useState(0);

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

  useEffect(() => {
    const calcularTotal = () => {
      let totalCalculado = 0;

      productos.forEach((producto) => {
        const precioProducto = producto.precio - (producto.descuento || 0);
        totalCalculado += precioProducto;
      });

      setTotal(totalCalculado);
    };

    calcularTotal();
  }, [productos]);

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

  const [entrega, setEntrega] = useState(false);
  const VIBRATION = 7;

  const TypeEntrga = (value) => {
    setEntrega(value);
    Vibration.vibrate(VIBRATION);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  const tax = total * 0.15;
  const SubTotal = total;
  const Delivery = entrega ? 230 : 0;
  const Total = tax + SubTotal + Delivery;

  const handleSwipeDown = () => {
    Keyboard.dismiss();
  };

  const CaptureCode = (text) => {
    setInputValue(text);
    console.log('Valor del input:', text);
  }

  const DescuentoCode = async () => {
    const db = getFirestore(app);
    const promoCodeCollection = collection(db, 'PromoCode');

    try {
      const querySnapshot = await getDocs(promoCodeCollection);

      if (querySnapshot.empty) {
        console.log('No hay documentos en la colección PromoCode.');
      } else {
        const matchingDocs = querySnapshot.docs.filter(doc => doc.id === inputValue);

        if (matchingDocs.length > 0) {
          const discountValue = matchingDocs[0].data().discount;
          console.log('Descuento encontrado:', discountValue);
          setDiscount(discountValue);
        } else {
          console.log('No se encontraron documentos con el id proporcionado.');
        }
      }
    } catch (error) {
      console.error('Error al buscar en la colección PromoCode:', error);
    }
  };

  return (
    <View style={CartStyle.CartScreen}>
      <Text>{productos.length} Productos en Carrito</Text>
      {renderDeleteSection()}
      <View style={{ height: 190, width: '100%', marginTop: 20 }}>
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 15 }}
        />
      </View>

      <View style={CartStyle.PromoCode}>
        <TextInput
          style={{ paddingLeft: 15 }}
          placeholder='Codigo Promocional'
          keyboardType='default'
          autoCapitalize='characters'
          maxLength={8}
          onChangeText={CaptureCode}
          value={inputValue}
        />

        <TouchableOpacity onPress={DescuentoCode} style={CartStyle.PromoCodeBtn}>
          <Text style={{ color: '#fff', fontFamily: 'Poppins', fontSize: 11, width: '100%' }}>Canjear</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10 }}>
        <TouchableWithoutFeedback onPress={() => TypeEntrga(true)}>
          <View style={entrega === true ? CartStyle.EntrgaActive : CartStyle.EntregaButton}>
            <Image source={loaderCart} style={{ width: BtnImg, height: BtnImg }} />
            <Text style={{ fontFamily: 'Poppins', marginBottom: -15, width: '100%', textAlign: 'center' }}>Delivery</Text>
            <View style={CartStyle.Badge}>
              <Trash name='gift' color='#C69255' size={13} />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => TypeEntrga(false)}>
          <View style={entrega === false ? CartStyle.EntrgaActive : CartStyle.EntregaButton}>
            <Image source={Store} style={{ width: BtnImg, height: BtnImg, }} />
            <Text style={{ fontFamily: 'Poppins', marginBottom: -15, width: '100%', textAlign: 'center' }}>En Tienda</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ position: 'absolute', bottom: 0, width: large, paddingHorizontal: 10, gap: 10 }}>

        <View>
          <View style={CartStyle.TaxesContainer}>
            <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>ISV</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>L. {(tax).toFixed(0)}</Text>
          </View>

          <View style={CartStyle.TaxesContainer}>
            <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>SubTotal</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>L. {(SubTotal).toFixed(0)}</Text>
          </View>

          {expanded && entrega === true && (
            <View style={CartStyle.TaxesContainer}>
              <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>Entrega</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>{Delivery}</Text>
            </View>
          )}

          {discount === true ? (
            <View style={CartStyle.TaxesContainer}>
              <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>Descuento Especial</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: SizeText }}>L. {discount}</Text>
            </View>
          ) : ''}

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={CartStyle.BuyBtn}>
            <Text style={{ color: '#fff' }}>Hacer Pedido</Text>
          </TouchableOpacity>

          <View style={CartStyle.PriceBuy}>
            <Text style={{ fontFamily: 'Montserrat', fontSize: 13 }}>L. {(Total).toFixed(2)}</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

export default Cart;