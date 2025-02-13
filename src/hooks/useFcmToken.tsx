import {View, Text, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
export default function useFcmToken() {
  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    if (Platform.OS === 'ios') {
      registerForRemoteMessages();
    } else {
      requestPermissions();
    }
  }, []);
  const registerForRemoteMessages = () => {
    firebase
      .messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        requestPermissions();
      });
  };
  const requestPermissions = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        if (status === 1) {
          getToken();
        } else {
        }
      });
  };
  const getToken = async () => {
    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
      });
  };

  return {fcmToken};
}
