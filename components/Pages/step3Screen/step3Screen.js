import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { set } from 'react-native-reanimated';
import { Overlay } from 'react-native-elements';

import AppButton from './../../AppButton/AppButton';
import { Alert } from 'react-native';
import { variables } from './../../../variables';

import * as firebase from 'firebase';

const step3Screen = ({ route, navigation }) => {
  const [state, setstate] = useState('');
  const [district, setdistrict] = useState('');
  const [postal_code, setpostalcode] = useState('');
  const [loading, setloading] = useState(true);

    const {
      Firstname,
      Lastname,
      Age,
      Phone_number,
      Adhaar_number,
      Longitude,
      Latitude,
    } = route.params;

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const options = {
          method: 'GET',
          url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
          params: { location: `${Latitude}, ${Longitude}`, language: 'en' },
          headers: {
            'x-rapidapi-key': variables.rapidapikey,
            'x-rapidapi-host': variables.rapidapihost,
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            const adressData = response.data;
            const userdata = adressData.results[0];
            const district = userdata.area;
            const postal_code = userdata.postal_code;
            const state = userdata.region;
            setdistrict(district);
            setpostalcode(postal_code);
            setstate(state);
            setloading(false);
          })
          .catch(function (error) {
            console.error(error);
          });

        // const adressData = await axios.get(
        //   `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${Latitude}%2C${Longitude}&lang=en-US&apikey=aOWGmpl9jwhiNfBD-n8qQkZtjHoHkAndvHDXNXAbUzE`
        // );
      } catch (error) {}
    })();
  }, []);


  const nextButtonhandler = () => {
    const data = {
      Firstname: Firstname,
      Lastname: Lastname,
      Age: Age,
      Phone_number: Phone_number,
      Adhaar_number: Adhaar_number,
      Longitude: Longitude,
      Latitude: Latitude,
      District: district,
      State: state,
      Postal_code: postal_code,
    };
    navigation.navigate('Image Upload', data);
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
              {Longitude}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Latitude - </Text>
              {Latitude}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>District - </Text>
              {district}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>State - </Text>
              {state}
            </Text>
            <Text style={styles.subtext}>
              <Text style={styles.bold_text}>Postal Code - </Text>
              {postal_code}
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
    height: 450,
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

export default step3Screen;
