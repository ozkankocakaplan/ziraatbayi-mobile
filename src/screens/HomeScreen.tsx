import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Button from '../components/Button/Button';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(AuthActions.setUser(null));
  };

  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          AlertDialog.showLogoutModal(logOut);
        }}
        text="Çıkış Yap"
      />
    </SafeAreaView>
  );
}
