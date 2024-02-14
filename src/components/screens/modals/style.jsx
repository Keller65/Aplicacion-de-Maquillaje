import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Style = StyleSheet.create({
    Screen: {
        height: '100%',
        width: width,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15,
        position: 'absolute',
        marginTop: Constants.statusBarHeight
    },

    ContainerImageView: {
        width: '100%',
        height: 350,
        flexDirection: 'row',
    },

    ImageView: {
        width: 380,
        height: 380,
    },

    TonoImage: {
        width: 380,
        height: 380,
    },

    ConatinerProductoInfo: {
        width: '100%',
        flexDirection: 'row',
        gap: 15,
        position: 'relative'
    },

    ContainerTonos: {
        paddingTop: 20,
        gap: 10
    },

    ContainerShopping: {
        width: width,
        position: 'absolute',
        bottom: 0,
        padding: 10
    },

    ButtonShopping: {
        width: '100%',
        backgroundColor: '#000',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 50
    },

    TextTonos: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        width: 72,
        paddingVertical: 5,
        paddingHorizontal: 18,
        borderRadius: 50,
        color: 'rgba(0,0,0,0.3)',
        fontSize: 11
    },

    Badge: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        width: 85, // 85
        height: 45,
        padding: 10,
        borderRadius: 50,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
})

export default Style;