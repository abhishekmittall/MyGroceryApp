import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

import {useSelector} from 'react-redux';
import Header from '../../common/Header';

const Wishlist = () => {
  const items: any = useSelector(state => state.wishlist);
  const [wishlistItems, setWishlistItems] = useState(items.data);
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        title={'Wishlist Items'}
        rightIcon={require('../../images/cart.png')}
        isCart={true}
      />
      <FlatList
        data={wishlistItems}
        renderItem={({item, index}: any) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItems}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.images[0]}} style={styles.itemImage} />
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
                <Text style={styles.price}>{'$' + item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    fontFamily: 'Manrope-Regular',
  },
});
