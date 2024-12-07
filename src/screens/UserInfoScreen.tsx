import React, {useRef} from 'react';
import Page from '../components/Page/Page';
import CustomText from '../components/Text/Text';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {
  faBarcode,
  faBuilding,
  faEnvelope,
  faFileLines,
  faHouse,
  faLocationDot,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import {View} from 'react-native';

export default function UserInfoScreen() {
  const ColTitle = ({title}: {title: string}) => {
    return (
      <CustomText sx={{marginBottom: 15}} color="black" fontSizes="body3">
        {title}
      </CustomText>
    );
  };
  var ref = useRef<FormContainerRef>(null);
  return (
    <Page header showGoBack title="Kullanıcı Bilgilerim">
      <Form formContainerRef={ref}>
        <Input required id="firstName" icon={faUser} placeholder="Ad" />
        <Input required id="lastName" icon={faUser} placeholder="Soyad" />
        <Input
          required
          id="companyName"
          icon={faHouse}
          placeholder="Firma Adı"
        />
        <Input
          required
          id="email"
          autoCapitalize="none"
          icon={faEnvelope}
          placeholder="E-posta"
          validation="email"
        />
        <Input
          required
          id="phone"
          icon={faPhone}
          validation="phone"
          keyboardType="phone-pad"
          placeholder="Telefon Numarası"
        />
        <Input
          required
          id="glnNumber"
          icon={faBarcode}
          keyboardType="phone-pad"
          placeholder="GLN Numarası"
        />
        <Input
          required
          id="taxNumber"
          icon={faFileLines}
          placeholder="Vergi Numarası"
          keyboardType="phone-pad"
        />
        <Input
          required
          id="taxOffice"
          icon={faBuilding}
          placeholder="Vergi Dairesi"
          keyboardType="phone-pad"
        />
        <Input
          required
          id="address"
          multiline
          icon={faLocationDot}
          placeholder="Firma Adresi"
          style={{height: 100}}
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
