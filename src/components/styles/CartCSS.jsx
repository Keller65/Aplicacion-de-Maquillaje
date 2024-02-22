import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const screen = Dimensions.get('window').width;

const CartStyle = StyleSheet.create({
    CartScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: 10,
        position: 'relative'
    },

    Producto: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#fff'
    },

    ImagenProduct: {
        height: 80,
        width: 80,
        backgroundColor: '#f0ece6',
        borderRadius: 15
    },

    DeleteFavoritos: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        right: 0,
        backgroundColor: '#fff'
    },

    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },

    Enabled: {
        height: 22,
        width: 22,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    Disabled: {
        height: 22,
        width: 22,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000'
    },

    TagEstado: {
        position: 'absolute',
        right: 10,
        top: 10,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9effa1',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50
    },

    tono: {
        height: 12,
        width: 12,
        borderRadius: 50
    },
})

export default CartStyle;