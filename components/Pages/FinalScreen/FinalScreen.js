import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';
import AppButton from './../../AppButton/AppButton';
import greenTick from './../../../assets/Green-Tick-PNG-Pic.png';
import * as SMS from 'expo-sms';
import * as Random from 'expo-random';

const FinalScreen = ({ route, navigation }) => {
  const { Firstname, Lastname, Age, Phone_number, Adhaar_number, Stage } =
    route.params;

  const sendsms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    const application_id = await Random.getRandomBytesAsync(12);
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [Phone_number],
        `Thanks ${Firstname} for applying for PMAY. Your application has been sumbitted successfully. Use ${application_id} as your application id to login to dashboard
        and see your status`,
        {
          // attachments: {
          //   uri: 'path/myfile.png',
          //   mimeType: 'image/png',
          //   filename: 'myfile.png',
          // },
        }
      );
      console.log('Message sent ' + result);
    }
  };

  useEffect(() => {
    sendsms();
  }, []);
  const nextButtonhandler = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.finalscreen_view}>
      <Text>{Stage}</Text>
      <View style={styles.conainer}>
        <Text style={styles.text}>
          You have successfully submitted the data
        </Text>
        <Image
          source={greenTick}
          style={{ marginTop: 36, width: 205, height: 159 }}
        />
      </View>
      <AppButton ButtonText="Submit" onpress={nextButtonhandler} />
    </View>
  );
};
const styles = StyleSheet.create({
  finalscreen_view: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d1eaff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conainer: {
    // backgroundColor: '#f0f3f7',
    width: 320,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 120,
    // backgroundColor: '#28df99',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
});

export default FinalScreen;
