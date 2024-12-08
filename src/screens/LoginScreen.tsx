import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import LoginRequest from '../payload/request/LoginRequest';
import {AuthApi} from '../services/authService';
import Page from '../components/Page/Page';
import {LogoIcon} from '../assets/logo';

export default function LoginScreen(
  props: NativeStackScreenProps<RootStackParamList, 'LoginScreen'>,
) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email: 'ozkankocakaplan07@gmail.com',
    password: '123456',
  });

  const [loginMutation, {isLoading, isError, error}] =
    AuthApi.useLoginMutation();

  const login = async () => {
    await loginMutation(loginRequest).unwrap();
  };

  return (
    <Page bgColor="#ffff" header title="Giriş Yap">
      <Form>
        <LoginContainer>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={LogoIcon}
              style={{width: 200, height: 200}}
              resizeMode="contain"
            />
          </View>

          <View style={{gap: 10}}>
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
          </View>
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
    </Page>
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
