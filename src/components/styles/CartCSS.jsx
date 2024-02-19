import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const screen = Dimensions.get('window').width;

const CartStyle = StyleSheet.create({
    CartScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
        position: 'relative'
    },

    ContainerCarritoCards: {
        gap: 10,
    },

    itemProductoCard: {
        width: '100%',
        backgroundColor: '#f0ece691', // #DEDEC5
        borderRadius: 15,
        width: '100%',
        gap: 10,
        padding: 5,
        flexDirection: 'row',
        position: 'relative',
        marginTop: 5
    },

    tono: {
        height: 15,
        width: 15,
        borderRadius: 50
    },

    BuyButton: {
        width: '100%',
        backgroundColor: '#000',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        gap: 10,
    },

    TaxesContainer: {
        gap: 10,
    },

    ViewIcon: {
        flexDirection: 'row',
        gap: 10
    },

    Total: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 5
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

    ContainerOpenCart: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },

    ContainerBuy: {
        width: screen,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        gap: 10
    },
})

export default CartStyle;