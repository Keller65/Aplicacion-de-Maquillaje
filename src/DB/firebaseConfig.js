import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBbDkuy2JM4M6f7TqW_8q4hNgr0pw15qVQ",
    authDomain: "margie-store.firebaseapp.com",
    databaseURL: "https://margie-store-default-rtdb.firebaseio.com",
    projectId: "margie-store",
    storageBucket: "margie-store.appspot.com",
    messagingSenderId: "382215266798",
    appId: "1:382215266798:web:5d9d6971ff59561a8b2eff",
    measurementId: "G-HS4Z5CDSV0"
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app)

// Android : 382215266798-othco7p3f8osddil7jpb41rpldjl4eae.apps.googleusercontent.com
// Web : 382215266798-17vskdgpc77n6a7us2uv8hv0sgu5c66g.apps.googleusercontent.com