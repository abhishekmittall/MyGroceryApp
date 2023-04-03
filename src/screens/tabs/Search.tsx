import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';

import Header from '../../common/Header';

const {height, width} = Dimensions.get('window');

const Search = () => {
  const products: any = useSelector(state => state);

  const navigation: any = useNavigation();

  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState(products.product.data);
  const [searchList, setSearchList] = useState(oldData);

  const filterData = (txt: any) => {
    let newData = oldData.filter((item: any) => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchList(newData);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Search Items'}
        rightIcon={require('../../images/cart.png')}
        isCart={true}
      />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.icon}
          />
          <TextInput
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder="Search items here.."
            style={styles.input}
          />
        </View>
        {search != '' && (
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              setSearch('');
              filterData('');
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={{height: 20, width: 20, resizeMode: 'center'}}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: 10}}>
        <FlatList
          data={searchList}
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
                  <Text style={styles.price}>{'$' + item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  input: {
    width: '80%',
    marginLeft: 10,
    fontFamily: 'Manrope-Regular',
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
