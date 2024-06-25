import {StyleSheet, Text, View, Pressable, Image, Modal} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

interface BrightnessProps {
  brightness: boolean;
  setBrightness: (visible: boolean) => void;
}
const Brightness: React.FC<BrightnessProps> = ({brightness, setBrightness}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={brightness}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setBrightness(!brightness);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalBar}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={360}
              minimumTrackTintColor="#79767D"
              maximumTrackTintColor="#E04831"
              thumbTintColor="#E04831"
            />

            {/* 
            <Pressable onPress={null}>
              <Image source={require('../assets/flash_icon.png')} />
            </Pressable> */}
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

export default Brightness;

const styles = StyleSheet.create({
  slider: {},
  modalView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 500,
    width: '100%',
    borderRadius: 24,
    // marginTop: 22,
  },
  modalBar: {
    // margin: 20,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    // paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    justifyContent: 'space-evenly',
    // opacity: 0.3,
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
});
