import {View} from 'react-native';
import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';
import {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {faLock} from '@fortawesome/free-solid-svg-icons';

import AlertDialog from '../components/AlertDialog/AlertDialog';
import {UserApi} from '../services/userService';
import Container from '../components/Container/Container';
import {checkObject} from '../helper/Helper';

export default function ChangePasswordScreen() {
  const ref = useRef<FormContainerRef>(null);
  const [updatePassword] = UserApi.useUpdatePasswordMutation();

  // Tüm state'leri bir nesnede birleştiriyoruz
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Değer güncellemeleri için bir yardımcı fonksiyon
  const handleChange = (field: string, value: string) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      AlertDialog.showModal({
        title: 'Hata',
        message: 'Yeni şifreler eşleşmiyor!',
        type: 'error',
      });
      return;
    }

    await updatePassword({
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    }).unwrap();
  };

  return (
    <Page header showGoBack title="Şifremi Değiştir">
      <Container mx={10} mt={10} gap={10}>
        <Input
          required
          id="oldPassword"
          icon={faLock}
          placeholder="Mevcut Şifre"
          value={passwords.oldPassword}
          onChangeText={value => handleChange('oldPassword', value)}
        />
        <Input
          required
          id="newPassword"
          icon={faLock}
          placeholder="Yeni Şifre"
          value={passwords.newPassword}
          onChangeText={value => handleChange('newPassword', value)}
        />
        <Input
          required
          id="confirmPassword"
          icon={faLock}
          placeholder="Tekrardan Yeni Şifre"
          value={passwords.confirmPassword}
          onChangeText={value => handleChange('confirmPassword', value)}
        />

        <Button
          isDisabled={checkObject(passwords)}
          text="Kaydet"
          onPress={handleSave}
        />
      </Container>
    </Page>
  );
}
