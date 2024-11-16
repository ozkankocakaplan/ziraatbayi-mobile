import {View, TouchableOpacity, Platform, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import {LogoIcon} from '../assets/logo';
import {SIZES} from '../constant/theme';

export default function LoginScreen(props: any) {
  const ref = React.useRef<FormContainerRef>(null);

  return (
    <Container header title="Giriş Yap">
      <Form>
        <LoginContainer>
          <IconContainer>
            <Image source={LogoIcon} style={{height: 200, width: 200}} />
          </IconContainer>
          <FormContainer style={{gap: 10}} formContainerRef={ref}>
            <Input
              autoCapitalize="none"
              id="email"
              required
              icon={faEnvelope}
              placeholder="E-posta"
            />
            <Input
              required
              id="password"
              icon={faLock}
              placeholder="Şifre"
              secureTextEntry={true}
            />
          </FormContainer>
          <ForgotPassword>
            <CustomText color="secondary">Şifremi Unuttum</CustomText>
          </ForgotPassword>
          <View style={{marginBottom: 10}}>
            <Button text="Giriş Yap" />
          </View>
        </LoginContainer>
        <RegisterContainer>
          <RegisterTextContainer>
            <CustomText color="secondary">Hesabınız yok mu?</CustomText>
          </RegisterTextContainer>
          <Button
            onPress={() => {
              props.navigation.navigate('RegisterScreen');
            }}
            outline
            text="Kayıt Ol"
          />
        </RegisterContainer>
      </Form>
    </Container>
  );
}
const Form = styled(View)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 20px;
  flex: 1;
`;
const LoginContainer = styled(View)`
  flex: 2;
  justify-content: center;
`;
const IconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 30px;
  flex: 1;
  justify-content: flex-end;
`;
const RegisterTextContainer = styled(View)`
  margin-bottom: 10px;
  align-items: center;
`;
const ForgotPassword = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-vertical: 10px;
`;
