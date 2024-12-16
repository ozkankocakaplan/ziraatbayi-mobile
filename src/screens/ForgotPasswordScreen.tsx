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

export default function ForgotPasswordScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>,
) {
  const [email, setEmail] = useState('');
  return (
    <Page header title="Şifremi Unuttum" showGoBack>
      <Container mx={10} bgColor="white">
        <PasswordContainer>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={LogoIcon}
              style={{width: 200, height: 200}}
              resizeMode="contain"
            />
          </View>
          <Input
            autoCapitalize="none"
            id="email"
            required
            icon={faEnvelope}
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
          />

          <View style={{marginTop: 15}}>
            <Button text="Gönder" isDisabled={checkObject({email})} />
          </View>
        </PasswordContainer>
      </Container>
    </Page>
  );
}

const PasswordContainer = styled(View)`
  margin-top: 50px;
`;
