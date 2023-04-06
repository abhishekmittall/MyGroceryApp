import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';

const {height, width} = Dimensions.get('window');

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const navigation: any = useNavigation();

  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<any>(
    'Please select address',
  );

  const items: any = useSelector<any>(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map((item: any) => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(2);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);

  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title="Checkout"
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Added Items</Text>
      <View>
        <FlatList
          data={cartItems}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.productItems}
                onPress={() => {
                  navigation.navigate('ProductDetail', {data: item});
                }}>
                <Image source={{uri: item.image}} style={styles.itemImage} />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 25
                      ? item.title.substring(0, 25) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.description}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text>
                  <View style={styles.qtyView}>
                    <Text style={styles.price}>{'$' + item.price}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(reduceItemFromCart(item));
                        } else {
                          dispatch(removeItemFromCart(index));
                        }
                      }}>
                      <Text style={styles.btnTxt}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        dispatch(addItemToCart(item));
                      }}>
                      <Text style={styles.btnTxt}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.title}>Total</Text>
        <Text style={[styles.title, {marginRight: 20}]}>
          {'$' + getTotal()}{' '}
        </Text>
      </View>
      <Text style={styles.title}>Select Payment Mode</Text>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(0);
        }}>
        <Image
          source={
            selectedMethod == 0
              ? require('../images/radio.png')
              : require('../images/radio_not.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 0 ? 'orange' : '#000'},
          ]}
        />
        <Text style={styles.paymentMethodsText}>Credit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(1);
        }}>
        <Image
          source={
            selectedMethod == 1
              ? require('../images/radio.png')
              : require('../images/radio_not.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 1 ? 'orange' : '#000'},
          ]}
        />
        <Text style={styles.paymentMethodsText}>Debit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(2);
        }}>
        <Image
          source={
            selectedMethod == 2
              ? require('../images/radio.png')
              : require('../images/radio_not.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 2 ? 'orange' : '#000'},
          ]}
        />
        <Text style={styles.paymentMethodsText}>UPI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(3);
        }}>
        <Image
          source={
            selectedMethod == 3
              ? require('../images/radio.png')
              : require('../images/radio_not.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 3 ? 'orange' : '#000'},
          ]}
        />
        <Text style={styles.paymentMethodsText}>Cash on Delivery</Text>
      </TouchableOpacity>
      <View style={styles.addressView}>
        <Text style={styles.title}>Address</Text>
        <Text
          style={[
            styles.title,
            {textDecorationLine: 'underline', color: '#0269A0FB'},
          ]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          Edit Address
        </Text>
      </View>
      <Text
        style={[styles.title, {marginTop: 10, fontSize: 16, color: '#636363'}]}>
        {selectedAddress}
      </Text>
      <CustomButton bg={'green'} title="Pay & Order" color="#fff" />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
    color: '#000',
    fontFamily: 'Manrope-SemiBold',
  },
  productItems: {
    width: width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    fontFamily: 'Manrope-SemiBold',
  },
  description: {
    marginLeft: 20,
    fontFamily: 'Manrope-Medium',
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    fontFamily: 'Manrope-Regular',
  },
  btn: {
    padding: 5,
    borderWidth: 0.5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  btnTxt: {
    fontSize: 20,
    fontFamily: 'Manrope-Regular',
    fontWeight: '600',
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Manrope-Regular',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.3,
    borderBottomColor: '#B7B7B7',
  },
  paymentMethods: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentMethodsText: {
    fontSize: 15,
    marginLeft: 20,
    color: '#000',
    fontFamily: 'Manrope-SemiBold',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
});
