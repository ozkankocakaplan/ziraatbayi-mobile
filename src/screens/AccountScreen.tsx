import React from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import Button from '../components/Button/Button';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {ScrollView, View} from 'react-native';

export default function AccountScreen() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(AuthActions.setUser(null));
  };
  return (
    <View style={{marginTop: 'auto'}}>
      <Button
        onPress={() => {
          AlertDialog.showLogoutModal(logOut);
        }}
        text="Çıkış Yap"
      />
    </View>
  );
}
