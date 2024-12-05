import {View, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import {LogoIcon} from '../assets/logo';

export default function ForgotPasswordScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>,
) {
  var ref = useRef<FormContainerRef>(null);

  return (
    <Page header title="Şifremi Unuttum" showGoBack>
      <Form>
        <PasswordContainer>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={LogoIcon}
              style={{width: 200, height: 200}}
              resizeMode="contain"
            />
          </View>
          <FormContainer formContainerRef={ref}>
            <Input
              autoCapitalize="none"
              id="email"
              required
              icon={faEnvelope}
              placeholder="E-posta"
            />
          </FormContainer>

          <View style={{marginTop: 15}}>
            <Button text="Gönder" />
          </View>
        </PasswordContainer>
      </Form>
    </Page>
  );
}
const Form = styled(View)`
  margin-horizontal: 20px;
  flex: 1;
`;
const PasswordContainer = styled(View)`
  margin-top: 50px;
`;
