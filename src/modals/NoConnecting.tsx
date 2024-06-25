import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';

interface NoConnectingProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}
const NoConnecting: React.FC<NoConnectingProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const optoions = [
    require('../assets/flash_icon.png'),
    require('../assets/light_mode.png'),
    require('../assets/scale.png'),
    require('../assets/zoom.png'),
    require('../assets/timer_off.png'),
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalView}>
        <View style={styles.modal}></View>
        <View style={styles.modalBar}>
          <Text style={styles.wifiTxt}>
            Please connect the device to your WIFI
          </Text>
          <Pressable style={styles.instructionBtn} onPress={null}>
            <Text>Open setup instructions</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default NoConnecting;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    height: 445,
  },
  modalView: {
    backgroundColor: 'rgba(146, 146, 146, .8)',
    height: 610,
    width: '100%',
    borderRadius: 24,
  },
  modalBar: {
    paddingVertical: 12,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  slider: {
    width: 224,
    height: 20,
  },
  wifiTxt: {
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 14,
    fontWeight: '400',
    fontSize: 16,
    color: '#ffffff',
  },
  instructionBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
