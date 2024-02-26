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

    EntregaButton: {
        height: 100,
        width: 180,
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },

    EntrgaActive: {
        height: 100,
        width: 180,
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgb(0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },

    Badge: {
        backgroundColor: '#FFE8CD',
        position: 'absolute',
        left: 7,
        top: 7,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 6,
    },

    BuyBtn: {
        backgroundColor: '#000',
        flexDirection: 'row',
        width: '70%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 18,
        position: 'relative'
    },

    PriceBuy: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        width: 'auto',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    TaxesContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderBottomColor: 'rgba(0,0,0,0.05)',
        marginBottom: 5,
    },

    PromoCode: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: 2.5,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        height: 50,
        marginTop: 10
    },

    PromoCodeError: {
        width: '100%',
        backgroundColor: '#ffdedb',
        padding: 2.5,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 84, 84, 0.7)',
        height: 50,
        marginTop: 10,
        color: '#ff6e6e',
    },

    ErrorText: {
        paddingLeft: 15,
        color: '#ff6e6e',
        width: '70%',
    },

    InputText: {
        paddingLeft: 15,
        color: '#000',
        width: '70%',
    },

    PromoCodeBtn: {
        height: '100%',
        width: 'auto',
        backgroundColor: '#000',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 10,
    },
})

export default CartStyle;