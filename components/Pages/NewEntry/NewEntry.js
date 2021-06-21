import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AppButton from '../../AppButton/AppButton';

const NewEntry = ({ navigation }) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [age, setage] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [adhaar_number, setadhaar_number] = useState('');


  const [error, seterror] = useState(true);

  const nextButtonhandler = () => {
    const data = {
      Firstname: firstname.trim(),
      Lastname: lastname.trim(),
      Age: age.trim(),
      Phone_number: phone_number.trim(),
      Adhaar_number: adhaar_number.trim(),
    };
    navigation.navigate('Step 2', data);
  };

  useEffect(() => {
    if (firstname.trim() === '') {
      seterror(true);
    } else if (lastname.trim() === '') {
      seterror(true);
    } else if (age < 18 || age.trim() === '') {
      seterror(true);
    } else if (adhaar_number.trim() === '') {
      seterror(true);
    } else {
      seterror(false);
    }
  }, [firstname, lastname, age, phone_number, adhaar_number]);

  return (
    <View style={styles.NewEntry_view}>
      <TextInput
        style={styles.input}
        onChangeText={(newname) => setfirstname(newname)}
        value={firstname}
        placeholder="Firstname"
      />
      <TextInput
        style={styles.input}
        onChangeText={(newname) => setlastname(newname)}
        value={lastname}
        placeholder="Lastname"
      />
      <TextInput
        style={styles.input}
        onChangeText={(newage) => setage(newage)}
        value={age}
        placeholder="Age"
        keyboardType={'numeric'}
        maxLength={3}
      />
      <TextInput
        style={styles.input}
        onChangeText={(newnumber) => setphone_number(newnumber)}
        value={phone_number}
        placeholder="10 digit Phone Number"
        keyboardType={'numeric'}
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        onChangeText={(newnumber) => setadhaar_number(newnumber)}
        value={adhaar_number}
        placeholder="12 digit Adhaar Number"
        keyboardType={'numeric'}
        maxLength={12}
      />
      <AppButton
        disabled={error}
        ButtonText="Next"
        onpress={nextButtonhandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  NewEntry_view: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d1eaff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1176f2',
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
  },
});

export default NewEntry;
