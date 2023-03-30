import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../common/Header';

import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';

import {useDispatch} from 'react-redux';
import {addItemToWishlist} from '../redux/slices/WishlistSlice';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route: any = useRoute();

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          leftIcon={require('../images/back.png')}
          rightIcon={require('../images/cart.png')}
          titles={'Product Detail'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
        />
        <Image
          source={{uri: route.params.data.images[0]}}
          style={styles.banner}
        />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.description}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price: '}</Text>
          <Text style={styles.price}>{'$' + route.params.data.price}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.wishlistBtn}
          onPress={() => {
            // dispatch(addItemToWishlist(route.params.data));
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
          onClick={() => {}}
        />
      </View>
    </ScrollView>
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
    top: 80,
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
});
