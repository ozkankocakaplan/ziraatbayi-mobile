import React, {useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import CheckInput from '../components/CheckInput/CheckInput';
import Button from '../components/Button/Button';
import styled from 'styled-components';
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
import {AuthApi} from '../services/authService';
import CreateDealerRequest from '../payload/request/CreateDealerRequest';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';

export default function RegisterScreen(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  var ref = useRef<FormContainerRef>(null);
  const [useRegister] = AuthApi.useCreateDealerMutation();
  const {width} = Dimensions.get('window');

  const [registerRequest, setRegisterRequest] = useState<CreateDealerRequest>({
    firstName: '',
    lastName: '',
    companyName: ' ',
    email: '',
    phone: '',
    gnlNumber: '',
    taxNumber: '',
    taxOffice: '',
    address: '',
  });

  const handleRegister = async () => {
    try {
      console.log('Kayıt işlemi başlatılıyor...', registerRequest);
      const response = await useRegister(registerRequest).unwrap();
      console.log('Kayıt başarılı:', response);
    } catch (error) {
      console.error('Kayıt sırasında bir hata oluştu:', error);
    }
  };

  return (
    <Page header title={'Kayıt Ol'} showGoBack>
      <Form formContainerRef={ref}>
        <Input
          required
          id="firstName"
          icon={faUser}
          placeholder="Ad"
          value={registerRequest.firstName}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, firstName: text})
          }
        />
        <Input
          required
          id="lastName"
          icon={faUser}
          placeholder="Soyad"
          value={registerRequest.lastName}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, lastName: text})
          }
        />
        <Input
          required
          id="companyName"
          icon={faHouse}
          placeholder="FirmaAdı"
          value={registerRequest.companyName}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, companyName: text})
          }
        />
        <Input
          required
          id="email"
          autoCapitalize="none"
          icon={faEnvelope}
          placeholder="E-posta"
          validation="email"
          value={registerRequest.email}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, email: text})
          }
        />
        <Input
          required
          id="phone"
          icon={faPhone}
          validation="phone"
          keyboardType="phone-pad"
          placeholder="Telefon Numarası"
          value={registerRequest.phone}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, phone: text})
          }
        />
        <Input
          required
          id="glnNumber"
          icon={faBarcode}
          keyboardType="phone-pad"
          placeholder="GLN Numarası"
          value={registerRequest.gnlNumber}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, gnlNumber: text})
          }
        />
        <Input
          required
          id="taxNumber"
          icon={faFileLines}
          placeholder="Vergi Numarası"
          keyboardType="phone-pad"
          value={registerRequest.taxNumber}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, taxNumber: text})
          }
        />
        <Input
          required
          id="taxOffice"
          icon={faBuilding}
          placeholder="Vergi Dairesi"
          keyboardType="phone-pad"
          value={registerRequest.taxOffice}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, taxOffice: text})
          }
        />
        <Input
          required
          id="address"
          multiline
          icon={faLocationDot}
          placeholder="Firma Adresi"
          value={registerRequest.address}
          onChangeText={text =>
            setRegisterRequest({...registerRequest, address: text})
          }
          style={{height: 100}}
        />
        <CheckInput
          id="contract"
          type="checkbox"
          value={false}
          errorMessage=""
          label="Gizlilik ve Kullanım Koşullarını okudum kabul ediyorum."
          clickedLabel="Gizlilik ve Kullanım Koşullarını"
          clickLabel={() => console.log('clicked')}
        />
        <RegisterContainer>
          <Button
            onPress={() => {
              // let result = ref.current?.validate({
              //   firstName: 'Lütfen adınızı giriniz.',
              //   lastName: 'Lütfen soyadınızı giriniz.',
              //   companyName: 'Lütfen firma adınızı giriniz.',
              //   email: 'Lütfen e-posta adresinizi giriniz.',
              //   phone: 'Lütfen telefon numaranızı giriniz.',
              //   glnNumber: 'Lütfen GLN numaranızı giriniz.',
              //   taxNumber: 'Lütfen vergi numaranızı giriniz.',
              //   taxOffice: 'Lütfen vergi dairesi adını giriniz.',
              //   address: 'Lütfen firma adresinizi giriniz.',
              //   contract: 'Gizlilik ve Kullanım Koşullarını kabul etmelisiniz.',
              // });
              // console.log('result', result);
              // if (result) {

              // }
              props.navigation.navigate('BottomTabMenu');
              handleRegister();
            }}
            text="Kayıt Ol"
          />
        </RegisterContainer>
      </Form>
    </Page>
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
