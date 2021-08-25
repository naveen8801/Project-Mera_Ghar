import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ImageBackground,
} from 'react-native';
import AppButton from './../../AppButton/AppButton';
import  variables  from './../../../variables';
const Home = ({ navigation }) => {

  return (
    <ImageBackground
      source={{
        uri: 'https://u01.appmifile.com/images/2019/08/14/9e7beced-79af-4549-ac28-737424caf858.jpeg',
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.btn_conainer}>
          <AppButton
            ButtonText="New Entry"
            onpress={() => navigation.navigate('New Entry')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_conainer: {
    backgroundColor: '#f0f3f7',
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 120,
  },
});

export default Home;
