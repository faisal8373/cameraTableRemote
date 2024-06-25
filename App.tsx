/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import DefaultView from './src/screens/camera/DefaultView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPhotos from './src/screens/gallery/AllPhotos';

export type RootStackPramList = {
  DefaultView: undefined;
  AllPhotos: undefined;
};

const Stack = createNativeStackNavigator<RootStackPramList>();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="DefaultView">
        <Stack.Screen name="DefaultView" component={DefaultView} />
        <Stack.Screen name="AllPhotos" component={AllPhotos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
