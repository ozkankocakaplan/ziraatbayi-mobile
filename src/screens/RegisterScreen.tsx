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

export default function RegisterScreen() {
  var ref = useRef<FormContainerRef>(null);
  const [useRegister] = AuthApi.useCreateDealerMutation();
  const {width} = Dimensions.get('window');

  const [registerRequest, setRegisterRequest] = useState<CreateDealerRequest>({
    firstName: 'feriza',
    lastName: 'öcal',
    companyName: 'feriza şirket',
    email: 'f@gmail.com',
    phone: '123',
    gnlNumber: '456',
    taxNumber: '789',
    taxOffice: '01234',
    address: 'yozgat',
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
    <Container header title={'Kayıt Ol'} goBackShow>
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
          placeholder="Firma Adı"
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
        <TaxContainer>
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
            style={{width: width * 0.43}}
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
            style={{width: width * 0.43}}
          />
        </TaxContainer>
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
          errorMessage=""
          label="Gizlilik ve Kullanım Koşullarını okudum kabul ediyorum."
          clickedLabel="Gizlilik ve Kullanım Koşullarını"
          clickLabel={() => console.log('clicked')}
        />
        <RegisterContainer>
          <Button
            onPress={() => {
              console.log('Validasyon başladı.');
              let result = ref.current?.validate({
                firstName: 'Lütfen adınızı giriniz.',
                lastName: 'Lütfen soyadınızı giriniz.',
                companyName: 'Lütfen firma adınızı giriniz.',
                email: 'Lütfen e-posta adresinizi giriniz.',
                phone: 'Lütfen telefon numaranızı giriniz.',
                glnNumber: 'Lütfen GLN numaranızı giriniz.',

                address: 'Lütfen firma adresinizi giriniz.',
              });
              console.log('Validasyon sonucu:', result);
              if (!result) {
                console.log('Validasyon hatası. Alanların durumu:');
                console.log('firstName:', registerRequest.firstName);
                console.log('lastName:', registerRequest.lastName);
                console.log('companyName:', registerRequest.companyName);
                console.log('email:', registerRequest.email);
                console.log('phone:', registerRequest.phone);
                console.log('glnNumber:', registerRequest.gnlNumber);
                console.log('taxNumber:', registerRequest.taxNumber);
                console.log('taxOffice:', registerRequest.taxOffice);
                console.log('address:', registerRequest.address);
                return;
              }

              console.log('Validasyon başarılı, kayıt işlemi başlatılıyor...');
              handleRegister();
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
