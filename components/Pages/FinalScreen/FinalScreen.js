import React, { useEffect, useState } from 'react';
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
import { submitrequest } from './../../../api';

const FinalScreen = ({ route, navigation }) => {
  const [submitted, setsubmitted] = useState(false);
  const {
    Firstname,
    Lastname,
    Phone_number,
    Adhaar_number,
    Longitude,
    Latitude,
    District,
    State,
    Postal_code,
    Stage,
    photo,
  } = route.params;

  const SubmitHandler = async () => {
    setsubmitted(false);
    const data = {
      firstname: Firstname,
      lastname: Lastname,
      adhaar_no: Adhaar_number,
      phone_number: Phone_number,
      long: Longitude,
      lat: Latitude,
      pincode: Postal_code,
      district: District,
      state: State,
      stage_predicted: Stage,
      photos: photo,
    };
    try {
      fetch(
        'https://cedd-2401-4900-421c-fe19-18fb-4852-2d8-48a3.ngrok.io/submit-request',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.status === 200) {
            setsubmitted(true);
          }
          if (json.status === 400) {
            if (json.key) {
              Alert.alert(`${json.key[0]} is already registered`);
            }
          }
          console.log(json);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const nextButtonhandler = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.finalscreen_view}>
      <View style={styles.conainer}>
        {submitted ? (
          <Text style={styles.text}>
            You have successfully submitted the data
          </Text>
        ) : (
          <Text style={styles.text}>Click below to submit your data</Text>
        )}
        {submitted ? (
          <Image
            source={greenTick}
            style={{ marginTop: 36, width: 205, height: 159 }}
          />
        ) : null}
      </View>
      {submitted ? (
        <AppButton ButtonText="Done" onpress={nextButtonhandler} />
      ) : (
        <AppButton ButtonText="Submit" onpress={SubmitHandler} />
      )}
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
