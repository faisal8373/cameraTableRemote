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

interface Default16_9Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const Default16_9: React.FC<Default16_9Props> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [birghtness, setBrightness] = useState(false);

  const optoions = [
    require('../assets/flash_icon.png'),
    require('../assets/light_mode.png'),
    require('../assets/scale.png'),
    require('../assets/zoom.png'),
    require('../assets/timer_off.png'),
  ];

  // const toggleBrightnessVisibility = () => {
  //   setBrightness(!birghtness);
  // };

  // const Bright = () => {
  //   return (
  //     <View>
  //       <Slider
  //         style={styles.slider}
  //         minimumValue={0}
  //         maximumValue={360}
  //         minimumTrackTintColor="#79767D"
  //         maximumTrackTintColor="#E04831"
  //         thumbTintColor="#E04831"
  //       />
  //     </View>
  //   );
  // };

  // const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {/* <Brightness
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            /> */}
        <View style={styles.modalView}>
          <View style={styles.modalBar}>
            {optoions.map((option, index) => (
              <Pressable key={index} onPress={null}>
                <Image style={{}} source={option} />
              </Pressable>
            ))}

            {/* 
                <Pressable onPress={null}>
                  <Image source={require('../assets/flash_icon.png')} />
                </Pressable> */}
          </View>
          <View style={styles.modal}></View>

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

export default Default16_9;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    height: 472,
  },
  modalView: {
    backgroundColor: 'rgba(146, 146, 146, .8)',
    height: 688,
    width: '100%',
    borderRadius: 24,
  },
  //   modalView: {

  //     backgroundColor: '#ffffff',
  //     height: 500,
  //     width: '100%',
  //     borderRadius: 24,
  //   },
  modalBar: {
    // margin: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  slider: {
    width: 224,
    height: 20,
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
