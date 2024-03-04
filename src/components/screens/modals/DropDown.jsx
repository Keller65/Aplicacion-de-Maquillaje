import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Pressable } from 'react-native';
import Close from 'react-native-vector-icons/Ionicons';
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const MyCustomDropdown = ({ items, onSelect, visible, setVisible, font }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const animationValues = items.map(() => useSharedValue(0));

  const animatedStyles = (index) => useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(animationValues[index].value * 20, { duration: 80 }) }],
    };
  });

  const toggleSwitch = (index) => {
    const isSelected = selectedIndices.includes(index);
    
    if (isSelected) {
      // Deselect the item
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
      animationValues[index].value = withTiming(0, { duration: 100 });
    } else {
      // Select the item
      setSelectedIndices([...selectedIndices, index]);
      animationValues[index].value = withTiming(1, { duration: 100 });
    }
  };

  return (
    <View>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.dropdown}>

            <Pressable style={styles.close} onPress={() => setVisible(false)}>
              <Close name='close-outline' color='#adacac' size={20} />
            </Pressable>

            <ScrollView>
              {items.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  onSelect(item.value);
                  setVisible(false);
                }}>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Pressable onPress={() => toggleSwitch(index)} activeOpacity={0.7}>
                      <View style={[styles.switch, { backgroundColor: selectedIndices.includes(index) ? '#000' : 'rgb(200, 200, 200)' }]}>
                        <Reanimated.View style={[styles.circle, animatedStyles(index)]} />
                      </View>
                    </Pressable>
                    <Text style={[styles.item, { fontFamily: font }]}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 15
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    width: '100%',
    height: 250
  },
  item: {
    paddingVertical: 5,
    fontSize: 16,
  },
  close: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#f0f0f0',
    padding: 3,
    borderRadius: 50
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default MyCustomDropdown;
