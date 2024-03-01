import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const width = Dimensions.get('window').width;

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
        gap: 8,
        position: 'relative'
    },

    ContainerTonos: {
        paddingTop: 10,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 20
    },

    TextTonos: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        width: 72,
        paddingVertical: 5,
        paddingHorizontal: 18,
        borderRadius: 10,
        color: 'rgba(0,0,0,0.3)',
        fontSize: 11
    },

    Badge: {
        backgroundColor: '#FFF5E7',
        width: 85, // 85
        height: 40,
        padding: 10,
        borderRadius: 50,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
    },

    Close: {
        height: 40,
        width: 40,
        backgroundColor: 'rgba(0,0,0,0.04)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        position: 'absolute',
        left: 0,
    },
})

export default Style;