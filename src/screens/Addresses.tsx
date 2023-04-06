import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addresses = () => {
  const navigation: any = useNavigation();

  const addressList: any = useSelector<any>(state => state.address);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(addressList);
  }, [isFocused]);

  const defaultAddress = async (item: any) => {
    await AsyncStorage.setItem(
      'MY_ADDRESS',
      '' +
        item.name +
        ' ' +
        item.mobile +
        ' ' +
        item.home +
        ' ' +
        item.city +
        ' ' +
        item.pincode +
        ' ' +
        item.state +
        'Type' +
        item.type,
    );
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title="My Address"
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={addressList.data}
        renderItem={({item, index}: any) => {
          return (
            <ScrollView>
              <TouchableOpacity
                style={styles.addressView}
                onPress={() => {
                  defaultAddress(item);
                }}>
                <Text style={styles.addressText}>{`Name : ${item.name}`}</Text>
                <Text
                  style={styles.addressText}>{`Mobile : ${item.mobile}`}</Text>
                <Text
                  style={styles.addressText}>{`Address : ${item.home}`}</Text>
                <Text style={styles.addressText}>{`City : ${item.city}`}</Text>
                <Text
                  style={
                    styles.addressText
                  }>{`Pin Code : ${item.pincode}`}</Text>
                <Text
                  style={styles.addressText}>{`State : ${item.state}`}</Text>
                <Text style={[styles.addressText, styles.addTypeText]}>
                  {item.type}
                </Text>
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={[styles.bottomIcon, {marginRight: 10}]}>
                    <Image
                      source={require('../images/edit.png')}
                      style={styles.bottomIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomIcon}>
                    <Image
                      source={require('../images/delete.png')}
                      style={styles.bottomIcon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAddress');
        }}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addressView: {
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 0.8,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addressText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Manrope-Medium',
  },
  addTypeText: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#B1BFF5',
    borderRadius: 10,
    padding: 8,
    fontSize: 13,
  },
  bottomView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  bottomIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF9A0C',
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    fontSize: 35,
    color: '#fff',
    fontFamily: 'Manrope-Regular',
  },
});
