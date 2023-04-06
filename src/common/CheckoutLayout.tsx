import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

const CheckoutLayout = ({total, items}: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.itemTotalText}>{`( Items + ${items} )`}</Text>
        <Text style={styles.itemTotalText}>{'Total: $ ' + total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <Text style={styles.checkoutTxt}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  itemTotalText: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: '80%',
    height: '60%',
    borderRadius: 10,
    backgroundColor: '#FF9A0C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutTxt: {
    color: '#fff',
    fontFamily: 'Manrope-SemiBold',
  },
});
