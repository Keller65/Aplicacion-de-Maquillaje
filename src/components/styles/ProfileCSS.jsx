import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const ProfileStyle = StyleSheet.create({
    ProfileScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10
    },

    ProfileScreenBlur: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        paddingTop: Constants.statusBarHeight || 0,
        paddingVertical: 20,
        paddingHorizontal: 10
    },

    PhotoUser: {
        height: 60,
        width: 60,
        borderRadius: 100
    },

    ChechBadge: {
        height: 23,
        width: 23,
    },

    ConatinerUp: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    badge: {
        backgroundColor: '#dedede',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 1
    },

    CerrarSesion: {
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 50,
        flexDirection: 'row',
        gap: 10
    },

    CardFavorito: {
        height: 'auto',
        width: 180,
        margin: 5
    },

    ConatinerPriceFavoritos: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    FavoritosScreen: {
        paddingHorizontal: 20,
    },

    FavoritoImagen: {
        height: 180,
        width: 180,
        backgroundColor: '#f0ece691',
    },

    LogOutButton: {
        backgroundColor: '#59abf8',
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 50,
        position: 'absolute',
        right: 0
    },

    ContainerTags: {
        width: '100%',
        height: '100%',
        gap: 15,
        marginTop: 25
    },

    ContainerTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        position: 'relative'
    },

    BadgeFavoritosTotal: {
        position: 'absolute',
        top: -8,
        left: -8,
        backgroundColor: '#cf82ff',
        borderRadius: 50,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff'
    },

    // Tags #faedcd, #d4a373

    tagheart: {
        height: 50,
        width: 50,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#cf82ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },

    tagwallet: {
        height: 50,
        width: 50,
        backgroundColor: '#faedcd',
        borderWidth: 1,
        borderColor: '#faedcd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },

    tagOwner: {
        position: 'relative'
    },

    TagOwerCheck: {
        height: 23,
        width: 23,
        position: 'absolute',
        bottom: -5,
        right: 0
    },
})

export default ProfileStyle;