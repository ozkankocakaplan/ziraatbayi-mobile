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

export default function ForgotPasswordScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>,
) {
  const [email, setEmail] = useState('');

  const [forgotPassword] = UserApi.useForgotPasswordMutation();

  const handleSubmit = async () => {
    await forgotPassword({email}).unwrap();
  };

  return (
    <Page header title="Şifremi Unuttum" showGoBack>
      <Container mt={50} mx={10} bgColor="white" gap={10}>
        <Container noFlex jContent="center" aItems="center" bgColor="#ffffff">
          <Image
            source={LogoIcon}
            style={{width: 175, height: 175}}
            resizeMode="contain"
          />
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

        <Container bgColor="white">
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
