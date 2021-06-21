import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const AppButton = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} style={props.disabled?styles.appButtonContainerdisabled:styles.appButtonContainer} onPress={props.onpress}>
      <Text style={styles.buttonText}>{props.ButtonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 15,
    backgroundColor: '#1176f2',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    height: 45,
    margin: 15,
  },
  appButtonContainerdisabled: {
    backgroundColor: '#d6cece',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    height: 45,
    margin: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default AppButton;
