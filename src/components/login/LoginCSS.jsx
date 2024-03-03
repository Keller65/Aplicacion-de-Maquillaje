import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const LoginStyle = StyleSheet.create({
    LoginScreen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },

    Next: {
        width: '90%',
        backgroundColor: '#fff',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 15
    },
})

export default LoginStyle;