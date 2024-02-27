import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation()
  
  return (
    <View>
      <Text onPress={()=> navigation.navigate('Details')}>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen;