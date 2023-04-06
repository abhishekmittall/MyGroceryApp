import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../common/Header';

import {useNavigation} from '@react-navigation/native';

const User = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <Image
        source={require('../../images/default_user.png')}
        style={styles.user}
      />
      <Text style={styles.name}>{'Abhishek'}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
        {'Abhishek@gmail.com'}
      </Text>
      <TouchableOpacity style={[styles.tab, {marginTop: 50}]}>
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.text}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          navigation.navigate('Addresses');
        }}>
        <Text style={styles.text}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.text}>Payment Method</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 70,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Manrope-SemiBold',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontFamily: 'Manrope-SemiBold',
  },
});
