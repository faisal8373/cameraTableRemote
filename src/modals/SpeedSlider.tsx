import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';

interface SpeedSliderProps {
  speedSliderVisible: boolean;
  setSpeedSliderVisible: (visible: boolean) => void;
}
const SpeedSlider: React.FC<SpeedSliderProps> = ({
  speedSliderVisible,
  setSpeedSliderVisible,
}) => {
  const [range, setRange] = useState(1);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={speedSliderVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setSpeedSliderVisible(!speedSliderVisible);
      }}>
      <View style={styles.slideContainer}>
        <Pressable onPress={null} style={[styles.twistBtn, {}]}>
          <Text style={styles.btnText}>speed:</Text>
        </Pressable>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={4}
          minimumTrackTintColor="rgba(224, 72, 49, .38)"
          maximumTrackTintColor="#E04831"
          thumbTintColor="#E04831"
          onValueChange={value => setRange(value)}
          step={1}
        />
        <Pressable
          style={[styles.twistBtn, {marginRight: 15, padding: 0}]}
          onPress={null}>
          <Text style={[styles.btnText]}>{range}</Text>
        </Pressable>
        <Pressable onPress={() => setSpeedSliderVisible(!speedSliderVisible)}>
          <Text style={[styles.btnText, {fontSize: 14}]}>X</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default SpeedSlider;

const styles = StyleSheet.create({
  slideContainer: {
    marginTop: 500,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 16,
    // height: 50,
  },
  slider: {
    width: 224,
  },
  twistBtn: {
    // width: 68,
    // height: 28,
    // width: 54,
    backgroundColor: '#2B2930',
    paddingHorizontal: 12,
    paddingVertical: 2,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2B2930',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
  },
});
