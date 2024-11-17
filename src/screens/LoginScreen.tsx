import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {LogoIcon} from '../assets/logo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import LoginRequest from '../payload/request/LoginRequest';

export default function LoginScreen(
  props: NativeStackScreenProps<RootStackParamList, 'LoginScreen'>,
) {
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: '',
  });

  const ref = React.useRef<FormContainerRef>(null);

  const login = () => {
    let result = ref.current?.validate({
      email: 'E-posta adresi boş bırakılamaz',
      password: 'Şifre boş bırakılamaz',
    });
    if (result) {
      if (loginRequest.email === 'test' && loginRequest.password === 'test1') {
        console.log('Giriş başarılı!');
      } else {
        console.log('Hatalı e-posta veya şifre.');
      }
    }
  };
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
              value={loginRequest.email}
              onChangeText={text =>
                setLoginRequest({...loginRequest, email: text})
              }
            />
            <Input
              required
              id="password"
              icon={faLock}
              placeholder="Şifre"
              secureTextEntry={true}
              value={loginRequest.password}
              onChangeText={text =>
                setLoginRequest({...loginRequest, password: text})
              }
            />
          </FormContainer>
          <ForgotPassword>
            <CustomText
              color="secondary"
              onPress={() => {
                props.navigation.navigate('ForgotPasswordScreen');
              }}>
              Şifremi Unuttum
            </CustomText>
          </ForgotPassword>
          <View style={{marginBottom: 10}}>
            <Button onPress={login} text="Giriş Yap" />
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
