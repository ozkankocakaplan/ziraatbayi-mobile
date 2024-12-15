import {View, Text, Linking, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {URL} from 'react-native-url-polyfill';
import Page from '../components/Page/Page';
import Container from '../components/Container/Container';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {Image} from 'react-native';
import {LogoIcon} from '../assets/logo';
import Divider from '../components/Divider/Divider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';

export default function ResetPassword(
  props: NativeStackScreenProps<RootStackParamList, 'ResetPassword'>,
) {
  const [query, setQuery] = useState<string | null>(null);
  useEffect(() => {
    const fetchDeeplink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsedUrl = new URL(url);
        setQuery(parsedUrl.searchParams.get('query'));
      }
    };

    fetchDeeplink();
  }, []);

  return (
    <Page header title="Şifre Sıfırlama">
      <Container mx={20} bgColor="white" mt={20}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={LogoIcon}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
        </View>

        <View style={{gap: 10}}>
          <Input
            required
            id="password"
            icon={faLock}
            placeholder="Şifre"
            secureTextEntry={true}
          />
          <Input
            required
            id="password"
            icon={faLock}
            placeholder="Şifre Tekrarı"
            secureTextEntry={true}
          />
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Button text="Şifreyi Sıfırla" />
        </View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <Divider text="veya" />
        </View>
        <View style={{width: 170, alignSelf: 'center'}}>
          <Button
            onPress={() => {
              props.navigation.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              });
            }}
            outline
            text="Giriş Yap"></Button>
        </View>
      </Container>
    </Page>
  );
}
