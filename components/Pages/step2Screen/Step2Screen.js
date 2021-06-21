import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Overlay } from 'react-native-elements';
import * as Location from 'expo-location';

import AppButton from './../../AppButton/AppButton';

const Step2Screen = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [latitude, setlatitude] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        } else {
          setloading(true);
          let location = await Location.getCurrentPositionAsync({});
          setLocation(JSON.stringify(location));
          setlongitude(location.coords.longitude);
          setlatitude(location.coords.latitude);
          setloading(false);
        }
      } catch (error) {
        Alert.alert('Please allow location for next Step !');
        console.log(error)
        navigation.navigate('New Entry');
      }
    })();
  }, []);

  const {
    Firstname,
    Lastname,
    Age,
    Phone_number,
    Adhaar_number,
  } = route.params;

  const nextButtonhandler = () => {
    const data = {
      Firstname: Firstname,
      Lastname: Lastname,
      Age: Age,
      Phone_number: Phone_number,
      Adhaar_number: Adhaar_number,
      Longitude: longitude,
      Latitude: latitude,
    };
    navigation.navigate('Step 3', data);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Overlay isVisible={loading}>
          <Text>loading</Text>
        </Overlay>
      ) : (
        <View>
          <Text style={styles.mainheading}>User Data</Text>
          <View style={styles.sub_view}>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Firstname - </Text>
              {Firstname}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Lastname - </Text>
              {Lastname}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Age - </Text>
              {Age}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Phone no. - </Text>
              {Phone_number}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Adhaar No. - </Text>
              {Adhaar_number}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Longitude - </Text>
              {longitude}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Latitude - </Text>
              {latitude}
            </Text>
          </View>
        </View>
      )}
      <AppButton ButtonText="Next" onpress={nextButtonhandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1eaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainheading: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  sub_view: {
    backgroundColor: '#f0f3f7',
    justifyContent: 'center',
    padding: 30,
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  subtext: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 7,
  },
  bold_text: {
    fontWeight: 'bold',
  },
});

export default Step2Screen;
