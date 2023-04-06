import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addAddress, updateAddress} from '../redux/slices/AddressSlice';

import uuid from 'react-native-uuid';

const AddAddress = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const [type, setType] = useState(
    route.params.type === 'edit'
      ? route.params.data.type == 'Home'
        ? 1
        : 2
      : 1,
  );
  const [name, setName] = useState(
    route.params.type === 'edit' ? route.params.data.name : '',
  );
  const [mobile, setMobile] = useState(
    route.params.type === 'edit' ? route.params.data.mobile : '',
  );
  const [home, setHome] = useState(
    route.params.type === 'edit' ? route.params.data.home : '',
  );
  const [city, setCity] = useState(
    route.params.type === 'edit' ? route.params.data.city : '',
  );
  const [pincode, setPincode] = useState(
    route.params.type === 'edit' ? route.params.data.pincode : '',
  );
  const [state, setState] = useState(
    route.params.type === 'edit' ? route.params.data.state : '',
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={
          route.params.type === 'edit' ? 'Edit Address' : 'Add New Address'
        }
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        placeholder="Enter Full Name"
        style={styles.input}
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
      />
      <TextInput
        placeholder="Enter Mobile Number"
        keyboardType={'number-pad'}
        maxLength={10}
        style={styles.input}
        value={mobile}
        onChangeText={txt => {
          setMobile(txt);
        }}
      />
      <TextInput
        placeholder="Home Address"
        style={styles.input}
        value={home}
        onChangeText={txt => {
          setHome(txt);
        }}
      />
      <TextInput
        placeholder="Enter City"
        style={styles.input}
        value={city}
        onChangeText={txt => {
          setCity(txt);
        }}
      />
      <TextInput
        placeholder="Enter Pin Code"
        keyboardType={'number-pad'}
        maxLength={6}
        style={styles.input}
        value={pincode}
        onChangeText={txt => {
          setPincode(txt);
        }}
      />
      <TextInput
        placeholder="Enter State"
        style={styles.input}
        value={state}
        onChangeText={txt => {
          setState(txt);
        }}
      />
      <View style={styles.typeView}>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {borderWidth: 0.3, borderColor: type == 1 ? 'orange' : '#000'},
          ]}
          onPress={() => {
            setType(1);
          }}>
          <Image
            source={
              type == 1
                ? require('../images/radio.png')
                : require('../images/radio_not.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {borderWidth: 0.3, borderColor: type == 2 ? 'orange' : '#000'},
          ]}
          onPress={() => {
            setType(2);
          }}>
          <Image
            source={
              type == 2
                ? require('../images/radio.png')
                : require('../images/radio_not.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>Office</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bg={'#FF9A0C'}
        title={'Save Address'}
        color={'#fff'}
        onClick={() => {
          if (route.params.type === 'edit') {
            dispatch(
              updateAddress({
                name: name,
                mobile: mobile,
                home: home,
                city: city,
                pincode: pincode,
                state: state,
                type: type == 1 ? 'Home' : 'Office',
                id: route.params.data.id,
              }),
            );
            navigation.goBack();
          } else {
            dispatch(
              addAddress({
                name: name,
                mobile: mobile,
                home: home,
                city: city,
                pincode: pincode,
                state: state,
                type: type == 1 ? 'Home' : 'Office',
                id: uuid.v4(),
              }),
            );
            navigation.goBack();
          }
        }}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
    fontFamily: 'Manrope-SemiBold',
  },
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  typeBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
});
