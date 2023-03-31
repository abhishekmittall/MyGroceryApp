import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const CustomButton = ({bg, title, onClick, color}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.btn, {backgroundColor: bg}]}
      onPress={() => {
        onClick();
      }}>
      <Text
        style={{
          color: color,
          fontSize: 18,
          fontWeight: '500',
          fontFamily: 'Manrope-SemiBold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    width: width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
});
