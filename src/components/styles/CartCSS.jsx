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
        zIndex: 1
    },

    itemProductoCard: {
        width: '100%',
        backgroundColor: 'transparent', // #f0ece691
        borderRadius: 15,
        width: '100%',
        gap: 10,
        padding: 5,
        flexDirection: 'row',
        position: 'relative',
        marginTop: 5,
        alignItems: 'center'
    },

    SwipedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },

    tono: {
        height: 12,
        width: 12,
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
        gap: 8,
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

    ContainerBuy: {
        width: screen,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        gap: 10,
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
})

export default CartStyle;