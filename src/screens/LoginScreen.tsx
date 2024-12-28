import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../components/Input/Input';

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
import {checkObject} from '../helper/Helper';

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
    const fetchDeviceInfo = async () => {
      const uniqueId = await DeviceInfo.getUniqueId();
      const deviceModel = DeviceInfo.getModel();
      const deviceBrand = DeviceInfo.getBrand();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();

      console.log('Unique ID:', uniqueId);
      console.log('Model:', deviceModel);
      console.log('Brand:', deviceBrand);
      console.log('OS:', systemName);
      console.log('OS Version:', systemVersion);
    };

    fetchDeviceInfo();
  }, []);

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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Container bgColor="#ffffff" mx={10} mt={30}>
          <Container bgColor="#ffffff">
            <Container
              noFlex
              jContent="center"
              aItems="center"
              bgColor="#ffffff">
              <Image
                source={LogoIcon}
                style={{width: 175, height: 175}}
                resizeMode="contain"
              />
            </Container>
            <Container bgColor="#ffffff" gap={15}>
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

              <CustomText
                color="secondary"
                onPress={() => {
                  props.navigation.navigate('ForgotPasswordScreen');
                }}>
                Şifremi Unuttum
              </CustomText>
              <Button
                isDisabled={checkObject({
                  email: loginRequest.email,
                  password: loginRequest.password,
                })}
                onPress={login}
                text="Giriş Yap"
              />
            </Container>
          </Container>

          <Container flex={0.15} bgColor="#ffffff">
            <CustomText sx={{marginBottom: 10}} center color="secondary">
              Hesabınız yok mu?
            </CustomText>
            <Button
              onPress={() => {
                props.navigation.navigate('RegisterScreen');
              }}
              outline
              text="Kayıt Ol"
            />
          </Container>
        </Container>
      </ScrollView>
    </Page>
  );
}
