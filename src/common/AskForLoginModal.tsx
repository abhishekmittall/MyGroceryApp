import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const AskForLoginModal = ({
  modalVisible,
  onClickLogin,
  onClickSignup,
  onClose,
}: any) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 50}]}
            onPress={() => {
              onClickLogin();
            }}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginBottom: 20, marginTop: 20}]}
            onPress={() => {
              onClickSignup();
            }}>
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearbtn}
            onPress={() => {
              onClose();
            }}>
            <Image
              source={require('../images/clear.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
  },
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: '#FF9A0C',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Manrope-SemiBold',
  },
  clearbtn: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
