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
})

export default HomeStyle;