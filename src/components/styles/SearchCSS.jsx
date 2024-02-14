import { Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";

const SearchStyle = StyleSheet.create({
    SearchScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    InputSearch: {
        paddingLeft: 15
    },

    ContainerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 45,
        paddingLeft: 10,
        borderRadius: 8
    },

    filter: {
        borderTopStartRadius: 12,
        borderBottomStartRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    filtros: {
        width: '100%',
        gap: 20,
        flexDirection: 'row'
    },

    closeIcon: {
        position: 'absolute',
        right: 10
    },

    //Card UI products

    CardProduct: {
        margin: 5,
        width: 180,
        height: 'auto',
        overflow: 'hidden',
    },

    ImagenProduct: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0ece691',
        borderRadius: 8
    },

    ContainerPrice: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },

    Icon: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 99,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    //Pantalla de Busqueda no encontrada

    NoResultsContainer: {
        height: '90%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    },
})

export default SearchStyle;