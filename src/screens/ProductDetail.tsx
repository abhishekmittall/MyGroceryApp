import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';

import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';

import {useDispatch} from 'react-redux';
import {addItemToWishlist} from '../redux/slices/WishlistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';

const ProductDetail = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const checkUserStatus = async () => {
    let isUserLoggedIn = false;
    const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    if (status === null) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    return isUserLoggedIn;
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.description}>{route.params.data.description}</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price: '}</Text>
          <Text style={styles.price}>{'$' + route.params.data.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={styles.btnTxt}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Text style={styles.btnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.wishlistBtn}
          onPress={() => {
            if (!checkUserStatus()) {
              dispatch(addItemToWishlist(route.params.data));
            } else {
              setModalVisible(true);
            }
          }}>
          <Image
            source={require('../images/wishlist.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <CustomButton
          bg={'#FF9A0C'}
          title={'Add To Cart'}
          color={'#fff'}
          onClick={() => {
            // if (!checkUserStatus()) {
            //   dispatch(addItemToCart({...route.params.data, qty}));
            // } else {
            //   setModalVisible(true);
            // }
            dispatch(addItemToCart({...route.params.data, qty}));
          }}
        />
      </ScrollView>
      <AskForLoginModal
        modalVisible={modalVisible}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
        onClickSignup={() => {
          setModalVisible(false);
          navigation.navigate('Signup');
        }}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    marginTop: 10,
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Manrope-SemiBold',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'justify',
    fontFamily: 'Manrope-Regular',
  },
  price: {
    color: 'green',
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Manrope-Regular',
  },
  wishlistBtn: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
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
});
