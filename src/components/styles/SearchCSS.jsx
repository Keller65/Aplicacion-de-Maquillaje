import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const HEIGHT_POST = Dimensions.get('screen').height;
const WIDTH_POST = Dimensions.get('screen').width;

const SearchStyle = StyleSheet.create({
    SearchScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        //paddingVertical: 20,
        paddingHorizontal: 10,
    },

    SearchScreenOn: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingTop: Constants.statusBarHeight,
        //paddingVertical: 20,
        paddingHorizontal: 10,
    },

    InputSearch: {
        paddingLeft: 8,
        height: '100%',
    },

    ContainerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 45,
        paddingLeft: 10,
        borderRadius: 12,
        width: '85%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.09)'
    },

    filtroSelected: {
        backgroundColor: '#faf7f0',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f7daa1',
    },

    closeIcon: {
        position: 'absolute',
        right: 10
    },

    //Card UI products

    CardProduct: {
        marginHorizontal: 5,
        width: 185,
        height: 'auto',
        overflow: 'hidden',
    },

    ImagenProduct: {
        width: '100%',
        height: 185,
        backgroundColor: '#f0ece691',
        borderRadius: 12
    },

    ContainerPrice: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },

    //Pantalla de Busqueda no encontrada

    NoResultsContainer: {
        height: HEIGHT_POST,
        width: WIDTH_POST,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        position: 'absolute',
        zIndex: -999
    },

    FilterButton: {
        height: 45,
        width: 45,
        backgroundColor: 'rgb(0, 0, 0)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    FiltersContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 8
    },

    FilterMarcas: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.09)',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    FilterTrue: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    TextMarca: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Poppins',
        fontSize: 11,
    },

    TextTrue: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 11,
    },

    Post: {
        height: 'auto',
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        gap: 10,
    },

    PostImage: {
        width: 280,
        height: 'auto',
        aspectRatio: '1.85/1',
        borderRadius: 20,
    },

    ModalFilter: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    close: {
        backgroundColor: '#f0f0f0',
        padding: 3,
        borderRadius: 10,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SearchStyle;