import {View, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import {LogoIcon} from '../assets/logo';
import {checkObject} from '../helper/Helper';
import {UserApi} from '../services/userService';
import Logo from '../components/Logo/Logo';

export default function ForgotPasswordScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>,
) {
  const [email, setEmail] = useState('');

  const [forgotPassword] = UserApi.useForgotPasswordMutation();

  const handleSubmit = async () => {
    const {data} = await forgotPassword(email);
    if (data) {
      setEmail('');
    }
  };

  return (
    <Page header title="Şifremi Unuttum" showGoBack>
      <Container mt={50} mx={10} gap={10}>
        <Container noFlex jContent="center" aItems="center">
          <Logo />
        </Container>
        <Input
          autoCapitalize="none"
          id="email"
          required
          icon={faEnvelope}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
        />

        <Container>
          <Button
            text="Gönder"
            isDisabled={checkObject({email})}
            onPress={handleSubmit}
          />
        </Container>
      </Container>
    </Page>
  );
}
