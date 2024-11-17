import React, {useRef} from 'react';
import {Dimensions, View} from 'react-native';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import CheckInput from '../components/CheckInput/CheckInput';
import Button from '../components/Button/Button';
import styled from 'styled-components';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {
  faBarcode,
  faEnvelope,
  faFileLines,
  faHouse,
  faLock,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function RegisterScreen() {
  var ref = useRef<FormContainerRef>(null);
  const {width} = Dimensions.get('window');
  return (
    <Container header title={'Kayıt Ol'} goBackShow>
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
        <TaxContainer>
          <Input
            required
            id="taxNumber"
            icon={faFileLines}
            placeholder="Vergi Numarası"
            keyboardType="phone-pad"
            style={{width: width * 0.43}}
          />
          <Input
            required
            id="taxOffice"
            icon={faFileLines}
            placeholder="Vergi Dairesi"
            keyboardType="phone-pad"
            style={{width: width * 0.43}}
          />
        </TaxContainer>
        <Input
          required
          id="address"
          icon={faHouse}
          placeholder="Firma Adresi"
          style={{
            height: 80,
            textAlign: 'left',

            flexDirection: 'row',
          }}
        />
        <CheckInput
          id="contract"
          type="checkbox"
          errorMessage=""
          label="Gizlilik ve Kullanım Koşullarını okudum kabul ediyorum."
          clickedLabel="Gizlilik ve Kullanım Koşullarını"
          clickLabel={() => console.log('clicked')}
        />
        <RegisterContainer gap={10} mx={20} mt={20}>
          <Button
            onPress={() => {
              let result = ref.current?.validate({
                firstName: 'Lütfen adınızı giriniz.',
                lastName: 'Lütfen soyadınızı giriniz.',
                companyName: 'Lütfen firma adınızı giriniz.',
                email: 'Lütfen e-posta adresinizi giriniz.',
                phone: 'Lütfen telefon numaranızı giriniz.',
                glnNumber: 'Lütfen GLN numaranızı giriniz.',
                taxNumber: 'Zorunlu alan',
                taxOffice: 'Zorunlu alan',
                address: 'Lütfen firma adresinizi giriniz.',
              });
              if (!result) {
                return;
              }
            }}
            text="Kayıt Ol"
          />
        </RegisterContainer>
      </Form>
    </Container>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 20px;
  flex: 1;
`;
const TaxContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 30px;
  flex: 1;
  justify-content: flex-end;
`;
