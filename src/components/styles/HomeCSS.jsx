import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const HomeStyle = StyleSheet.create({
    HomeScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10
    },

    StatusBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },

    Oferts: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20
    },

    CardItem: {
        height: 'auto',
        width: 'auto',
        margin: 2
    },

    Badge: {
        height: 'auto',
        width: 'auto',
        backgroundColor: '#F4D9B5',
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1,
        borderRadius: 50,
        padding: 5
    },

    Pricing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
})

export default HomeStyle;