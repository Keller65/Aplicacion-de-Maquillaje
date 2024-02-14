import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const OrdersStyle = StyleSheet.create({
    OrdersScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
})

export default OrdersStyle;