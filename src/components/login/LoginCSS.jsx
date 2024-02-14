import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const LoginStyle = StyleSheet.create({
    LoginScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    SignWithGoogle: {
        width: '90%',
        backgroundColor: 'rgb(0, 0, 0)',
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 12,
    },
})

export default LoginStyle;