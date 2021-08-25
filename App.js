import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Pages/Home/Home';
import NewEntry from './components/Pages/NewEntry/NewEntry';
import Step2Screen from './components/Pages/step2Screen/Step2Screen';
import step3Screen from './components/Pages/step3Screen/step3Screen';
import UploadImages from './components/Pages/UploadImages/UploadImages';
import FinalScreen from './components/Pages/FinalScreen/FinalScreen';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#f0f3f7',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="New Entry"
          component={NewEntry}
          options={{
            headerStyle: {
              backgroundColor: '#f0f3f7',
            },
            headerTintColor: '#1176f2',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
            },
          }}
        />
        <Stack.Screen
          name="Step 2"
          component={Step2Screen}
          options={{
            headerStyle: {
              backgroundColor: '#f0f3f7',
            },
            headerTintColor: '#1176f2',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
            },
          }}
        />
        <Stack.Screen
          name="Step 3"
          component={step3Screen}
          options={{
            headerStyle: {
              backgroundColor: '#f0f3f7',
            },
            headerTintColor: '#1176f2',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
            },
          }}
        />
        <Stack.Screen
          name="Image Upload"
          component={UploadImages}
          options={{
            headerStyle: {
              backgroundColor: '#f0f3f7',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Final Screen"
          component={FinalScreen}
          options={{
            headerStyle: {
              backgroundColor: '#f0f3f7',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            },
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
