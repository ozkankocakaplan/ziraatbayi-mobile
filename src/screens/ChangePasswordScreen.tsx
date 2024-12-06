import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import Page from '../components/Page/Page';
import CustomText from '../components/Text/Text';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {faLock} from '@fortawesome/free-solid-svg-icons';

export default function ChangePasswordScreen() {
  const ColTitle = ({title}: {title: string}) => {
    return (
      <CustomText sx={{marginBottom: 15}} color="black" fontSizes="body3">
        {title}
      </CustomText>
    );
  };
  var ref = useRef<FormContainerRef>(null);
  return (
    <Page header showGoBack title="Şifremi Değiştir">
      <Form formContainerRef={ref}>
        <ColTitle title="Şifremi Değiştir" />
        <Input required id="firstName" icon={faLock} placeholder="Yeni Şifre" />
        <Input
          required
          id="lastName"
          icon={faLock}
          placeholder="Tekrardan Yeni Şifre"
        />

        <RegisterContainer>
          <Button text="GÜNCELLE" />
        </RegisterContainer>
      </Form>
    </Page>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 10px;
  flex: 1;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 50px;
  flex: 1;
  justify-content: flex-end;
`;
