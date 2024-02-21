import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Swiper = ({ onDelete }) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: 'blue', justifyContent: 'center', paddingTop: 100 }}>
        <Swipeable renderRightActions={renderRightActions} friction={1}>
            <View style={styles.item}>
                <Text>Swiper</Text>
            </View>
        </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'gray',
    position: 'relative',
    height: 80,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    position: 'relative'
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Swiper;