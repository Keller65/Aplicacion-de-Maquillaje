import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const Style = StyleSheet.create({
    ScreenLoading: {
        paddingTop: Constants.statusBarHeight,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

});

export default Style;