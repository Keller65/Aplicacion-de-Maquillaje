import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductView from './modals/ProductView';
import app from '../../DB/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchStyle from '../styles/SearchCSS';

const Search = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../../assets/fonts/MontserratAlternates-Regular.ttf'),
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductView, setShowProductView] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const toggleFavoriteProduct = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        saveToFavorites(productId, true);
        return prevSelected.filter((id) => id !== productId);
      } else {
        saveToFavorites(productId, false);
        return [...prevSelected, productId];
      }
    });
  };

  const openProductView = (product) => {
    setShowProductView(true);
    setSelectedProductId(product.id);
  };

  const closeProductView = () => {
    setShowProductView(false);
    setSelectedProductId('');
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = getFirestore(app);
        const productosCollection = collection(db, 'Productos');
        const querySnapshot = await getDocs(productosCollection);

        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const productosFiltrados = searchValue
        ? productos.filter((producto) => {
          const productoLowerCase = (producto.producto || '').toLowerCase();
          const marcaLowerCase = (producto.marca || '').toLowerCase();
          const tipoLowerCase = (producto.tipo || '').toLowerCase();
          const precioLowerCase = String(producto.precio - producto.descuento).toLowerCase();

          return (
            productoLowerCase.includes(searchValue.toLowerCase()) ||
            marcaLowerCase.includes(searchValue.toLowerCase()) ||
            tipoLowerCase.includes(searchValue.toLowerCase()) ||
            precioLowerCase.includes(searchValue.toLowerCase())
          );
        })
        : productos;

      setFilteredProductos(productosFiltrados);
    }, 550);

    return () => clearTimeout(timeoutId);
  }, [searchValue, productos]);

  const DelteSearch = () => {
    setSearchValue('');
  };

  const saveToFavorites = async (id, isAdd) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      const selectedProductDetails = productos.find((p) => p.id === id);

      if (selectedProductDetails) {
        const productToSave = {
          imagenProduct: selectedProductDetails.imagenProduct,
          precio: selectedProductDetails.precio,
          marca: selectedProductDetails.marca,
          producto: selectedProductDetails.producto,
        };

        if (isAdd) {
          if (favoritesArray.some((fav) => fav.id === id)) {
            favoritesArray = favoritesArray.filter((fav) => fav.id !== id);
          } else {
            favoritesArray.push({ id, ...productToSave });
          }
        } else {
          favoritesArray = favoritesArray.filter((fav) => fav.id !== id);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      }
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={SearchStyle.SearchScreen}>

      <View style={{ flexDirection: 'row', gap: 10, width: '100%', marginVertical: 10 }}>
        <View style={SearchStyle.ContainerSearch}>
          <TouchableOpacity style={SearchStyle.filter}>
            <Feather name='search' size={20} color='rgba(0, 0, 0, 0.5)' />
          </TouchableOpacity>

          <TextInput
            onChange={(e) => handleSearch(e.nativeEvent.text)}
            value={searchValue}
            style={[SearchStyle.InputSearch, { fontFamily: 'Montserrat', width: '85%' }]}
            placeholder='Buscar Producto'
            keyboardType='default'
          />

          {searchValue ? <AntDesign onPress={DelteSearch} style={SearchStyle.closeIcon} name='close' size={18} color='rgba(0, 0, 0, 0.5)' /> : ''}
        </View>

        <TouchableOpacity style={SearchStyle.FilterButton}>
          <Material name='filter' size={20} color='rgba(0, 0, 0, 0.5)' />
        </TouchableOpacity>
      </View>

      {searchValue !== '' ? (
        filteredProductos.length > 0 ? (
          <View style={{ width: '100%', alignItems: 'center', paddingBottom: 25 }}>
            <FlatList
              data={filteredProductos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openProductView(item)}>
                  <View style={SearchStyle.CardProduct}>
                    <TouchableOpacity style={SearchStyle.Icon} onPress={() => toggleFavoriteProduct(item.id)}>
                      <Icon name={selectedProducts.includes(item.id) ? 'heart-outline' : 'heart'} size={20} />
                    </TouchableOpacity>

                    {item.imagenProduct && <Image style={SearchStyle.ImagenProduct} source={{ uri: item.imagenProduct }} />}

                    <Text style={{ fontFamily: 'Montserrat' }}>{item.producto}</Text>

                    <View style={SearchStyle.ContainerPrice}>
                      <Text style={{ fontFamily: 'Montserrat' }}>{item.marca}</Text>
                      <Text style={{ fontFamily: 'Montserrat' }}>L. {(item.precio - item.descuento).toFixed(0)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0, gap: 10, paddingBottom: 30 }}
            />
          </View>
        ) : (
          <View style={SearchStyle.NoResultsContainer}>
            <Material name='file-find' size={25} color='#bababa' />
            <Text style={[SearchStyle.NoResultsText, { fontFamily: 'Montserrat', color: '#bababa' }]}>Producto no encontrado</Text>
          </View>
        )
      ) : (
        <View style={SearchStyle.NoResultsContainer}>
          <Icon name='sparkles-sharp' size={17} />
          <Text style={[SearchStyle.NoResultsText, { fontFamily: 'Montserrat' }]}>Buscar productos</Text>
        </View>
      )}

      {showProductView && (
        <ProductView productDetails={productos.find((p) => p.id === selectedProductId)} closeProductView={closeProductView} />
      )}
    </View>
  );
};

export default Search;