// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

// Import Image Picker
import ImagePicker from 'react-native-image-picker';

const ImagePickerComponent = () => {
  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <div style={styles.titleText}>
        Example of Image Picker in React Native
      </div>
      <div style={styles.container}>
        {/*<img 
          src={{ uri: filePath.path}} 
          style={{width: 100, height: 100}} />*/}
        <img
          src={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        />
        <img
          src={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <div style={styles.textStyle}>
          {filePath.uri}
        </div>
        {/*
          <Button
            title="Choose File"
            onClick={chooseFile} />
        */}
        <Button
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onClick={chooseFile}>
          <div style={styles.textStyle}>
            Choose Image
          </div>
        </Button>
      </div>
    </SafeAreaView>
  );
};

export default ImagePickerComponent;

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});