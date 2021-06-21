import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../../AppButton/AppButton';
import { Overlay } from 'react-native-elements';
import * as firebase from 'firebase';
import { Alert } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';
import ImageResizer from 'react-native-image-resizer';

import {
  fetch,
  bundleResourceIO,
  decodeJpeg,
} from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import * as ImageManipulator from 'expo-image-manipulator';

const UploadImages = ({ route, navigation }) => {
  const {
    Firstname,
    Lastname,
    Age,
    Phone_number,
    Adhaar_number,
    Longitude,
    Latitude,
    District,
    State,
    Postal_code,
  } = route.params;
  const [image_1, setImage1] = useState(null);
  const [image_2, setImage2] = useState(null);
  const [image_3, setImage3] = useState(null);
  const [image_4, setImage4] = useState(null);
  const [loading, setloading] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [model, setmodel] = useState(null);
  const [prediction, setprediciton] = useState(null);
  useEffect(() => {
    loadmyModel();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const loadmyModel = async () => {
    setloading(true);
    console.log('**** Loading Image classfication model !');
    await tf.ready();
    const modleljson = await require('./../../../assets/model.json');
    const modelweight = await require('./../../../assets/group1-shard.bin');
    const classifiermodel = await tf.loadLayersModel(
      bundleResourceIO(modleljson, modelweight)
    );
    setmodel(classifiermodel);
    console.log('********** LOADING DONE************');
    setloading(false);

    /* {'Framing': 0, 'Roofing': 1, 'SitePreparation': 2} */
  };

  const pickImage1 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // const uri_main = result.uri;
      // setImage1(uri_main);

      const uri_main = result.uri;
      const manipResult = await ImageManipulator.manipulateAsync(uri_main, [
        { resize: { width: 150, height: 150 } },
      ]);
      setImage1(manipResult.uri);
    }
    try {
      uploadImage(result.uri, '1');
    } catch (error) {}
  };

  const pickImage2 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // const uri_main = result.uri;
      // setImage2(uri_main);

      const uri_main = result.uri;
      const manipResult = await ImageManipulator.manipulateAsync(uri_main, [
        { resize: { width: 150, height: 150 } },
      ]);
      setImage2(manipResult.uri);
    }
    try {
      uploadImage(result.uri, '2');
    } catch (error) {}
  };

  const pickImage3 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // const uri_main = result.uri;
      // setImage3(uri_main);
      const uri_main = result.uri;
      const manipResult = await ImageManipulator.manipulateAsync(uri_main, [
        { resize: { width: 150, height: 150 } },
      ]);
      console.log(manipResult);
      setImage3(manipResult.uri);
    }
    try {
      uploadImage(result.uri, '3');
    } catch (error) {}
  };

  const pickImage4 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // const uri_main = result.uri;
      // setImage4(uri_main);

      const uri_main = result.uri;
      const manipResult = await ImageManipulator.manipulateAsync(uri_main, [
        { resize: { width: 150, height: 150 } },
      ]);
      console.log(manipResult);
      setImage4(manipResult.uri);
    }
    try {
      uploadImage(result.uri, '4');
    } catch (error) {}
  };

  const uploadImage = async (uri, name) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(`${Adhaar_number}/${name}`);
    const s = await ref.put(blob);
    blob.close();
    return uri;
  };

  const imageToTensorf = (rawImageData) => {
    console.log('Converting Image to tensor');
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    console.log(`width of the image -> ${width} and ${height}`);

    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    const normed = [];
    for (let i = 0; i < buffer.length; i++) normed[i] = buffer[i] / 244.0; // Normalize

    return tf.tensor3d(normed, [height, width, 3]).expandDims();
  };

  const ImageToTensor = async (imagedata) => {
    const imgB64 = await FileSystem.readAsStringAsync(imagedata, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = imageToTensorf(raw);
    console.log(imageTensor);
    let result = await model.predict(imageTensor).data();
    return result;
  };

  const givemainclass = (predictionarray) => {
    /* {'Framing': 0, 'Roofing': 1, 'SitePreparation': 2} */

    let i = predictionarray.indexOf(Math.max.apply(null, predictionarray));

    return i;
  };

  const submitHandler = async () => {
    setloading(true);
    console.log('********** PREDICT FUNCTION************');
    const result1 = await ImageToTensor(image_1);
    const result2 = await ImageToTensor(image_2);
    const result3 = await ImageToTensor(image_3);
    const result4 = await ImageToTensor(image_4);

    const class_index1 = await givemainclass(result1);
    const class_index2 = await givemainclass(result2);
    const class_index3 = await givemainclass(result3);
    const class_index4 = await givemainclass(result4);
    let _roofing = 0;
    let _framing = 0;
    let _siteprep = 0;
    if (class_index1 == 0) {
      _framing += 1;
    } else if (class_index1 == 1) {
      _roofing += 1;
    } else {
      _siteprep += 1;
    }

    if (class_index2 == 0) {
      _framing += 1;
    } else if (class_index2 == 1) {
      _roofing += 1;
    } else {
      _siteprep += 1;
    }

    if (class_index3 == 0) {
      _framing += 1;
    } else if (class_index3 == 1) {
      _roofing += 1;
    } else {
      _siteprep += 1;
    }

    if (class_index4 == 0) {
      _framing += 1;
    } else if (class_index4 == 1) {
      _roofing += 1;
    } else {
      _siteprep += 1;
    }

    let m = Math.max(_roofing, _siteprep, _framing);
    let class_ = '';
    if (m == 0) {
      class_ = 'Framing';
    } else if (m == 1) {
      class_ = 'Roofing';
    } else {
      class_ = 'Site Preparation';
    }
    setprediciton(class_);
    setloading(false);
    const data = await {
      Firstname: Firstname,
      Lastname: Lastname,
      Age: Age,
      Phone_number: Phone_number,
      Adhaar_number: Adhaar_number,
      Longitude: Longitude,
      Latitude: Latitude,
      District: District,
      State: State,
      Postal_code: Postal_code,
      Stage: class_,
    };
    console.log(data);
    navigation.navigate('Final Screen', data);
  };

  return (
    <View style={styles.UploadEntry_view}>
      <Text style={styles.text}>Select 4 images of your house from different angles</Text>

      {loading ? (
        <Overlay isVisible={loading}>
          <Text>loading</Text>
        </Overlay>
      ) : null}

      <View style={styles.sub_view}>
        {image_1 === null ? (
          <AppButton ButtonText="Upload Img 1" onpress={pickImage1} />
        ) : (
          <Text style={styles.text_done}>Saved</Text>
        )}
        {image_2 === null ? (
          <AppButton ButtonText="Upload Img 2" onpress={pickImage2} />
        ) : (
          <Text style={styles.text_done}>Saved</Text>
        )}
        {image_3 === null ? (
          <AppButton ButtonText="Upload Img 3" onpress={pickImage3} />
        ) : (
          <Text style={styles.text_done}>Saved</Text>
        )}
        {image_4 === null ? (
          <AppButton ButtonText="Upload Img 4" onpress={pickImage4} />
        ) : (
          <Text style={styles.text_done}>Saved</Text>
        )}
      </View>
      <AppButton
        ButtonText="Submit"
        disabled={
          image_1 == null ||
          image_2 == null ||
          image_3 == null ||
          image_4 == null
            ? // prediction == null
              true
            : false
        }
        onpress={submitHandler}
      />
    </View>
  );
};

export default UploadImages;

const styles = StyleSheet.create({
  UploadEntry_view: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d1eaff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_view: {
    backgroundColor: '#f0f3f7',
    width: 370,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 220,
  },
  text_done: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#28df99',
    width: 170,
    borderRadius: 18,
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    textAlign : 'center',
    marginBottom:16
  },
});
