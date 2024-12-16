import {View} from 'react-native';
import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';

import FormContainer, {FormContainerRef} from 'react-native-form-container';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {faLock} from '@fortawesome/free-solid-svg-icons';

import AlertDialog from '../components/AlertDialog/AlertDialog';
import {UserApi} from '../services/userService';
import Container from '../components/Container/Container';

export default function ChangePasswordScreen() {
  var ref = useRef<FormContainerRef>(null);
  const [updatePassword] = UserApi.useUpdatePasswordMutation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      AlertDialog.showModal({
        title: 'Hata',
        message: 'Eski şifre, yeni şifre ve şifre tekrarı boş bırakılamaz!',
        type: 'error',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      AlertDialog.showModal({
        title: 'Hata',
        message: 'Yeni şifreler eşleşmiyor!',
        type: 'error',
      });
      return;
    }

    try {
      const response = await updatePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      if (response.isSuccessful) {
        AlertDialog.showModal({
          title: 'Başarılı',
          message: 'Şifre başarıyla güncellendi!',
          type: 'success',
        });
      } else {
        AlertDialog.showModal({
          title: 'Başarısız',
          message: 'Şifre güncelleme başarısız!',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      AlertDialog.showModal({
        title: 'Hata',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        type: 'error',
      });
    }
  };

  return (
    <Page header showGoBack title="Şifremi Değiştir">
      <Container mx={10} mt={10} gap={10}>
        <Input
          required
          id="oldPassword"
          icon={faLock}
          placeholder="Mevcut Şifre"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Input
          required
          id="newPassword"
          icon={faLock}
          placeholder="Yeni Şifre"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Input
          required
          id="confirmPassword"
          icon={faLock}
          placeholder="Tekrardan Yeni Şifre"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button text="Kaydet" onPress={handleSave} />
      </Container>
    </Page>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 10px;
  flex: 1;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 50px;
  flex: 1;
  justify-content: flex-end;
`;
