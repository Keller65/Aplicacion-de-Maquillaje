import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductView from './modals/ProductView';
import app from '../../DB/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchStyle from '../styles/SearchCSS';

const Search = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../../assets/fonts/MontserratAlternates-Regular.ttf'),
    Poppins: require('../../../assets/fonts/PoppinsMedium.ttf'),
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductView, setShowProductView] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

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
    if (searchValue.trim() !== '') {
      const productosFiltrados = productos.filter((producto) => {
        const productoLowerCase = (producto.producto || '').toLowerCase();
        const marcaLowerCase = (producto.marca || '').toLowerCase();
        const tipoLowerCase = (producto.tipo || '').toLowerCase();
        const precioLowerCase = String(producto.precio - (producto.descuento || 0)).toLowerCase();

        return (
          productoLowerCase.includes(searchValue.toLowerCase()) ||
          marcaLowerCase.includes(searchValue.toLowerCase()) ||
          tipoLowerCase.includes(searchValue.toLowerCase()) ||
          precioLowerCase.includes(searchValue.toLowerCase())
        );
      });

      setFilteredProductos(productosFiltrados);
    } else {
      setFilteredProductos([]);
    }
  }, [searchValue, productos]);

  const DelteSearch = () => {
    setSearchValue('');
  };

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

  const handleSearch = (text) => {
    setSearchValue(text);
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

  const ChangeFilter = (filterName) => {
    setActiveFilter(filterName);
  };

  return (
    <View style={SearchStyle.SearchScreen}>
      <View style={{ flexDirection: 'row', gap: 10, width: '100%', marginVertical: 10 }}>
        <View style={SearchStyle.ContainerSearch}>
          <TextInput
            onChange={(e) => handleSearch(e.nativeEvent.text)}
            value={searchValue}
            style={[SearchStyle.InputSearch, { fontFamily: 'Poppins', width: '85%' }]}
            placeholder='Buscar Producto'
            keyboardType='default'
          />

          {searchValue ? <AntDesign onPress={DelteSearch} style={SearchStyle.closeIcon} name='close' size={15} color='rgba(0, 0, 0, 0.5)' /> : ''}
        </View>

        <TouchableOpacity style={SearchStyle.FilterButton}>
          <Image style={{ height: 25, width: 25 }} source={require('../../../assets/filter.png')} />
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={SearchStyle.FiltersContainer}>
            <TouchableOpacity onPress={() => ChangeFilter('Todo')} style={activeFilter === 'Todo' ? SearchStyle.FilterTrue : SearchStyle.FilterMarcas}>
              <Text style={activeFilter === 'Todo' ? SearchStyle.TextTrue : SearchStyle.TextMarca}>Todo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ChangeFilter('Chanel')} style={activeFilter === 'Chanel' ? SearchStyle.FilterTrue : SearchStyle.FilterMarcas}>
              <Text style={activeFilter === 'Chanel' ? SearchStyle.TextTrue : SearchStyle.TextMarca}>Chanel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ChangeFilter('Dior')} style={activeFilter === 'Dior' ? SearchStyle.FilterTrue : SearchStyle.FilterMarcas}>
              <Text style={activeFilter === 'Dior' ? SearchStyle.TextTrue : SearchStyle.TextMarca}>Dior</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ChangeFilter('Sephora')} style={activeFilter === 'Sephora' ? SearchStyle.FilterTrue : SearchStyle.FilterMarcas}>
              <Text style={activeFilter === 'Sephora' ? SearchStyle.TextTrue : SearchStyle.TextMarca}>Sephora</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ChangeFilter('Kiko Milano')} style={activeFilter === 'Kiko Milano' ? SearchStyle.FilterTrue : SearchStyle.FilterMarcas}>
              <Text style={activeFilter === 'Kiko Milano' ? SearchStyle.TextTrue : SearchStyle.TextMarca}>Kiko Milano</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ChangeFilter('Saint Laurent')} style={activeFilter === 'Saint Laurent' ? SearchStyle.FilterTrue : SearchStyle.FilterMarcas}>
              <Text style={activeFilter === 'Saint Laurent' ? SearchStyle.TextTrue : SearchStyle.TextMarca}>Saint Laurent</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {searchValue === '' ? (
        <View style={{ paddingBottom: 10 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={SearchStyle.Post}>
              <Image source={require('../../../assets/PostLogo.png')} style={SearchStyle.PostImage} />
              <Image source={require('../../../assets/edit.png')} style={SearchStyle.PostImage} />
            </View>
          </ScrollView>
        </View>
      ) : ''}

      {searchValue !== '' ? (
        filteredProductos.length > 0 ? (
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

                  <Text style={{ fontFamily: 'Poppins' }}>{item.producto}</Text>

                  <View style={SearchStyle.ContainerPrice}>
                    <Text style={{ fontFamily: 'Poppins' }}>{item.marca}</Text>
                    <Text style={{ fontFamily: 'Poppins' }}>L. {(item.precio - (item.descuento || 0)).toFixed(0)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={{ width: '100%', alignItems: 'center' }}
          />
        ) : (
          <View style={SearchStyle.NoResultsContainer}>
            <Text style={[SearchStyle.NoResultsText, { fontFamily: 'Poppins', color: '#bababa' }]}>Producto no encontrado</Text>
          </View>
        )
      ) : (
        <View style={SearchStyle.NoResultsContainer}>
          <Icon name='sparkles-sharp' size={17} />
          <Text style={[SearchStyle.NoResultsText, { fontFamily: 'Poppins' }]}>Buscar productos</Text>
        </View>
      )}

      {showProductView && (
        <ProductView productDetails={productos.find((p) => p.id === selectedProductId)} closeProductView={closeProductView} />
      )}
    </View>
  );
};

export default Search;