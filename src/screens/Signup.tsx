import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Sign up'}</Text>
      <TextInput placeholder="Enter Name" style={styles.input} />
      <TextInput placeholder="Enter Email" style={styles.input} />
      <TextInput placeholder="Enter Mobile" style={styles.input} />
      <TextInput placeholder="Enter Password" style={styles.input} />
      <TextInput placeholder="Enter Confirm Password" style={styles.input} />
      <CustomButton
        bg={'#FF9A0C'}
        title={'Sign up'}
        color={'#fff'}
        onClick={() => {}}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        {'Login'}
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    fontFamily: 'Manrope-SemiBold',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    fontFamily: 'Manrope-Regular',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Manrope-SemiBold',
    textDecorationLine: 'underline',
  },
});
