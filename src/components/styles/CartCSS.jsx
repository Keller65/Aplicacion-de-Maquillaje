import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const CartStyle = StyleSheet.create({
    CartScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight || 0,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
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
        marginTop: 5,
        flexDirection: 'row',
        position: 'relative'
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
        borderRadius: 12,
        flexDirection: 'row',
        gap: 10,
    },

    TaxesContainer: {
        gap: 10,
    },

    Total: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
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
    }
})

export default CartStyle;