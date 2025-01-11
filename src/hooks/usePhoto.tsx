import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
interface PhotoType {
  fileName: string;
  uri: string;
}
export default function usePhoto() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);

  const initLaunchImage = (isMultiple = false) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
      },
      response => {
        if (response.assets) {
          let uri = response.assets[0].uri as string;
          let fileName = response.assets[0].fileName as string;
          if (isMultiple) {
            setPhotos([
              ...photos,
              {
                fileName: fileName,
                uri: uri,
              },
            ]);
          } else {
            setPhotos([
              {
                fileName: fileName,
                uri: uri,
              },
            ]);
          }
        }
      },
    );
  };

  const initLaunchCamera = () => {
    requestCameraPermission();
  };

  const handleLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
      },
      response => {
        if (response.assets) {
          let uri = response.assets[0].uri as string;
          let fileName = response.assets[0].fileName as string;
          setPhotos([
            ...photos,
            {
              fileName: fileName,
              uri: uri,
            },
          ]);
        }
      },
    );
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleLaunchCamera();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const deletePhoto = (index: number) => {
    let newPhotos = photos.filter((photo, i) => i !== index);
    setPhotos(newPhotos);
  };
  const resetPhotos = () => {
    setPhotos([]);
  };
  return {
    photos,
    deletePhoto,
    initLaunchImage,
    initLaunchCamera,
    setPhotos,
    resetPhotos,
  };
}
