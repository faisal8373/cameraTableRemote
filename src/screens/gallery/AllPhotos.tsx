import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import React, {act, useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackPramList} from '../../../App';

type AllPhotosProps = NativeStackScreenProps<RootStackPramList, 'AllPhotos'>;
const AllPhotos = ({navigation}: AllPhotosProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeSelection, setActiveSelection] = useState(false);
  const [selectCount, setSelectCount] = useState(0);

  const pickImages = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 10},
      response => {
        if (response.assets) {
          const imageUris = response.assets.map(asset => asset.uri);
          setImages(imageUris);
          // console.log(imageUris);
        }
      },
    );
  };

  const toggleSelection = () => {
    setSelectCount(0);
    setSelectedImages({});
    setActiveSelection(!activeSelection);
  };
  const updateSelectCount = () => {
    setSelectCount(selectCount + 1);
  };
  const updateSelected = (item: string) => {
    setSelectedImages(prevState => ({
      ...prevState,
      [item]: !prevState[item],
    }));
    const selected = Object.values(selectedImages).filter(
      value => value,
    ).length;
    setSelectCount(selected);
  };
  useEffect(() => {
    pickImages();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Pressable>
          <Image source={require('../../assets/settings.png')} />
        </Pressable>
        <Text style={styles.headerTxt}>ALL PHOTOS</Text>
        <Pressable onPress={toggleSelection}>
          {activeSelection ? (
            <Image source={require('../../assets/clear.png')} />
          ) : (
            <Image source={require('../../assets/check_circle_outline.png')} />
          )}
        </Pressable>
      </View>
      <View style={styles.gallery}>
        {/* <ScrollView contentContainerStyle={styles.scrollView}>
          {images.map((imageUri, index) => (
            <Pressable style={styles.imageBtn} key={index}>
              <Image
                style={styles.image}
                key={index}
                source={{uri: imageUri}}
              />
            </Pressable>
          ))}
        </ScrollView> */}

        <FlatList
          data={images}
          numColumns={3}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <Pressable
              disabled={!activeSelection}
              style={[item ? styles.imageBtn : {}]}
              key={index}
              onPress={() => {
                updateSelectCount();
                updateSelected(item);
                console.log('selected', selectedImages[item]);
              }}>
              <View style={{}}>
                <Image
                  style={[
                    styles.image,
                    selectedImages[item] === true ? {opacity: 0.5} : {},
                  ]}
                  key={index}
                  source={{uri: item}}
                />
              </View>
            </Pressable>
          )}
        />
      </View>
      <View style={styles.cameraBtn}>
        <Pressable onPress={() => navigation.navigate('DefaultView')}>
          <Image source={require('../../assets/camera_alt.png')} />
        </Pressable>
      </View>
      {activeSelection ? (
        <View style={styles.footer}>
          <Text style={[styles.footerTxt, selectCount ? {opacity: 1} : {}]}>
            {selectCount} Selected
          </Text>
          <Pressable>
            <Image
              style={[styles.footerImage, selectCount ? {opacity: 1} : {}]}
              source={require('../../assets/share.png')}
            />
          </Pressable>

          <Pressable onPress={() => setSelectCount(0)}>
            <Image
              style={[styles.footerImage, selectCount ? {opacity: 1} : {}]}
              source={require('../../assets/delete.png')}
            />
          </Pressable>
        </View>
      ) : null}
      <View
        style={[
          styles.bottomBarContainer,
          activeSelection ? {backgroundColor: '#000000'} : {},
        ]}>
        <View
          style={[
            styles.bottomBar,
            activeSelection && selectCount
              ? {borderColor: '#ffffff', opacity: 1}
              : activeSelection && !selectCount
              ? {opacity: 0.3, borderColor: '#ffffff'}
              : {},
          ]}></View>
      </View>
    </View>
  );
};

export default AllPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  titleBar: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 10,
  },
  gallery: {
    flex: 1,
    // padding: 2,
  },
  headerTxt: {
    fontWeight: '500',
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },

  image: {
    width: 129,
    height: 129,
  },
  imageBtn: {
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(0,0,0,.8)',
  },
  cameraBtn: {
    width: 64,
    height: 64,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  footer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginBottom: 100,
    height: 56,
    gap: 30,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footerTxt: {
    textAlign: 'left',
    color: '#ffffff',
    marginRight: 181,
    opacity: 0.3,
  },
  footerImage: {
    width: 24,
    height: 24,
    opacity: 0.3,
  },
  bottomBar: {
    borderWidth: 2.5,
    borderColor: '#000000',
    borderRadius: 10,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 8,
    // marginTop: 13,
  },
  bottomBarContainer: {
    backgroundColor: '#ffffff',
  },
});
