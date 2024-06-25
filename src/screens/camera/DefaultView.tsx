import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  AppState,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useAppState} from '@react-native-community/hooks';
// import {useIsFocused} from '@react-navigation/native';
import {
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  Camera,
  PhotoFile,
} from 'react-native-vision-camera';
import Slider from '@react-native-community/slider';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
// import Reanimated, {
//   useAnimatedProps,
//   useSharedValue,
// } from 'react-native-reanimated';
// import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Default4_3 from '../../modals/Default4_3';
import SpeedSlider from '../../modals/SpeedSlider';
import {RootStackPramList} from '../../../App';
import NoConnecting from '../../modals/NoConnecting';
// Reanimated.addWhitelistedNativeProps({
//   zoom: true,
// });
// const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
type DefaultViewProps = NativeStackScreenProps<
  RootStackPramList,
  'DefaultView'
>;

const DefaultView = ({navigation}: DefaultViewProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [speedSliderVisible, setSpeedSliderVisible] = useState(false);
  const [noCnnectingVisible, setNoConnectingVisible] = useState(false);
  const [picture, setPicture] = useState<PhotoFile>();
  const [isActive, setIsActive] = useState(AppState.currentState === 'active');
  const [angle, setAngle] = useState(0);

  const device = useCameraDevice('back');
  // const zoom = useSharedValue(device?.neutralZoom);
  const camera = useRef<Camera>(null);
  // const isFocused = useIsFocused();
  // const appState = useAppState();

  const {hasPermission, requestPermission} = useCameraPermission();

  // const {
  //   hasPermission: microphonePermission,
  //   requestPermission: requestMicrophonePermission,
  // } = useMicrophonePermission();

  // requestMicrophonePermission();

  // console.log(hasPermission);

  // if (!hasPermission) return <Text>Need permission of Camera</Text>;
  // if (device == null) return <Text>No device found</Text>;

  // let options = {
  //   saveToPhotos: true,
  //   mediaType: 'photo',
  // };
  // const openGallery = async () => {
  //   // You can also use as a promise without 'callback':
  //   const result = await launchImageLibrary(options);
  //   navigation.navigate('AllPhotos');
  // };
  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, []),
  );
  const takePicture = async () => {
    try {
      const photo = await camera.current?.takePhoto({
        flash: 'on', // auto, off
      });
      if (photo) {
        setPicture(photo);
        console.log('photo taken with details:', photo);
        console.log('state: ', picture);
        setIsActive(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const toggleSpeedSliderVisibility = () => {
    setSpeedSliderVisible(!speedSliderVisible);
  };
  const toggleNoConnectingVisibility = () => {
    setNoConnectingVisible(!noCnnectingVisible);
  };

  useEffect(() => {
    const requestCameraPermission = async () => {
      await requestPermission();
    };
    setIsActive(AppState.currentState === 'background');
    requestCameraPermission();
  }, [AppState.currentState]);

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View>
        <Text style={{textAlign: 'center', marginTop: '70%'}}>
          Loading camera...
        </Text>
      </View>
    );
  }

  return (
    <>
      {picture ? (
        <>
          <Image
            source={{uri: `file://${picture.path}`}}
            style={StyleSheet.absoluteFill}
          />
        </>
      ) : (
        <View style={styles.container}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              photo={true}
              photoQualityBalance="speed"
            />
          </View>
          <Default4_3
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <NoConnecting
            modalVisible={noCnnectingVisible}
            setModalVisible={setNoConnectingVisible}
          />
          <View style={styles.toolsContainer}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>
              Current position 0.00
            </Text>

            {speedSliderVisible ? (
              <View style={[styles.twist, {paddingVertical: 16, marginTop: 5}]}>
                <SpeedSlider
                  speedSliderVisible={speedSliderVisible}
                  setSpeedSliderVisible={setSpeedSliderVisible}
                />
              </View>
            ) : (
              <View style={styles.twist}>
                <Pressable
                  onPress={toggleNoConnectingVisibility}
                  style={[styles.twistBtn, {marginRight: 150}]}>
                  <Text style={styles.btnText}>reset</Text>
                </Pressable>
                <Pressable style={styles.twistBtn}>
                  <Image source={require('../../assets/play_circle.png')} />
                  <Text style={[styles.btnText, {marginLeft: 5}]}>twist</Text>
                </Pressable>
                <Pressable
                  onPress={toggleSpeedSliderVisibility}
                  style={[styles.twistBtn, {backgroundColor: '#2B2930'}]}>
                  <Text style={styles.btnText}>speed:2</Text>
                </Pressable>
              </View>
            )}
            <View style={styles.slideContainer}>
              <Pressable style={styles.twistBtn}>
                <Image source={require('../../assets/left.png')} />
                <Text style={[styles.btnText, {marginLeft: 5}]}>left</Text>
              </Pressable>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={360}
                step={1}
                minimumTrackTintColor="#79767D"
                maximumTrackTintColor="#79767D61"
                thumbTintColor="#79767D"
                onValueChange={value => setAngle(value)}
              />
              <Pressable
                style={[
                  styles.twistBtn,
                  {backgroundColor: '#2B2930', paddingVertical: 1},
                ]}>
                <Text style={styles.btnText}>{angle}°</Text>
              </Pressable>
              <Pressable onPress={null} style={[styles.twistBtn, {width: 75}]}>
                <Image source={require('../../assets/right.png')} />
                <Text style={[styles.btnText, {marginLeft: 5}]}>right</Text>
              </Pressable>
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable onPress={() => navigation.navigate('AllPhotos')}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/pictureGallery.png')}
                />
              </Pressable>
              <Pressable onPress={takePicture}>
                <Image
                  style={styles.cameraBtn}
                  source={require('../../assets/Shutter.png')}
                />
              </Pressable>
              <Pressable onPress={toggleModalVisibility}>
                <Image
                  style={styles.bottomImage}
                  source={require('../../assets/AddSteps.png')}
                />
              </Pressable>
            </View>
            <View style={styles.bottomTextContainer}>
              <Pressable onPress={null}>
                <Text style={styles.bottomText}>PHOTO </Text>
              </Pressable>
              <Text style={[styles.bottomText, {opacity: 0.3}]}>VIDEO</Text>
            </View>
            <View style={styles.bottomBar}></View>
          </View>
        </View>
      )}
    </>
  );
};

export default DefaultView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraContainer: {
    height: 460,
  },
  toolsContainer: {
    paddingTop: 20,
  },
  twist: {
    width: 370,
    flexDirection: 'row',
    margin: 10,
    // backgroundColor: 'pink',
    gap: 10,
  },
  twistBtn: {
    // width: 68,
    // height: 28,
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
  slideContainer: {
    flexDirection: 'row',
    width: 358,
    margin: 16,
    gap: 7,
  },
  slider: {
    width: 144,
    height: 28,
  },
  buttonsContainer: {
    // flex: 0.3,
    // height: 200,
    // marginTop: 600,
    // backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    gap: 79,
  },
  bottomImage: {
    width: 64,
    height: 64,
  },
  cameraBtn: {
    // color: '#ffffff',
    // position: 'absolute',
    // alignSelf: 'center',
    // bottom: 50,
    width: 72,
    height: 72,
    // backgroundColor: '#ffffff',
    // borderRadius: 55.33,
    // borderColor: 'red',
    // borderWidth: 4,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'grey',
    marginVertical: 16,
    // backgroundColor: 'pink',
  },
  bottomText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#ffffff',
  },
  bottomBar: {
    borderWidth: 2.5,
    borderColor: '#ffffff',
    borderRadius: 10,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 13,
  },
});
