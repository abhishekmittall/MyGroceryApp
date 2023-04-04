import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

import Header from '../common/Header';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CheckoutLayout from '../common/CheckoutLayout';

const Cart = () => {
  const navigation: any = useNavigation();
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

  return (
    <View style={styles.container}>
      <Header
        title={'Cart Items'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
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
      {cartItems.length < 1 && (
        <View style={styles.noItems}>
          <Text style={styles.noItemsText}>No Items in Cart</Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <CheckoutLayout items={cartItems.length} total={getTotal()} />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontFamily: 'Manrope-SemiBold',
    color: '#000',
    fontSize: 18,
  },
});
