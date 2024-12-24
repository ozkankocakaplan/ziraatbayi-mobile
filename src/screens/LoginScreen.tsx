import {View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import Container from '../components/Container/Container';
import DeviceInfo from 'react-native-device-info';
import DeviceInfoComponent from '../components/DeviceInfo/DeviceInfoComponent';

export default function LoginScreen(
  props: NativeStackScreenProps<RootStackParamList, 'LoginScreen'>,
) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email:
      process.env.NODE_ENV === 'development' ? 'ferizaocal60@gmail.com' : '',
    password: process.env.NODE_ENV === 'development' ? '123fb' : '',
    uniqueId: '',
    deviceBrand: '',
    deviceId: '',
    deviceOs: '',
    deviceOsVersion: '',
    devicePlatform: '',
  });

  const [loginMutation] = AuthApi.useLoginMutation();

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      await deviceInfo();
    });
  }, []);

  const login = async () => {
    await loginMutation(loginRequest).unwrap();
  };
  const deviceInfo = async () => {
    const uniqueId = await DeviceInfo.getUniqueId();
    const deviceBrand = DeviceInfo.getBrand();
    const deviceId = DeviceInfo.getDeviceId();
    const deviceOs = DeviceInfo.getSystemName();
    const deviceOsVersion = DeviceInfo.getSystemVersion();
    const devicePlatform = DeviceInfo.getSystemName();

    setLoginRequest(prevState => ({
      ...prevState,
      uniqueId,
      deviceBrand,
      deviceId,
      deviceOs,
      deviceOsVersion,
      devicePlatform,
    }));
  };

  return (
    <Page bgColor="#ffff" header title="Giriş Yap">
      <Container bgColor="white" mx={10}>
        <DeviceInfoComponent />
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
      </Container>
    </Page>
  );
}

const LoginContainer = styled(View)`
  flex: 2;
  justify-content: center;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 50px;
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
