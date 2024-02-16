import { SafeAreaView, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const BoardOne = () => {
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', }}>
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.5, 0.6]}
                style={{ height: '100%' }}
                colors={['#4c669f', '#000', '#000']}
            >
                <Text>Sign in with Facebook</Text>
            </LinearGradient>

        </SafeAreaView>
    )
}

export default BoardOne