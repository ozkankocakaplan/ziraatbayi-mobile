import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import Input from '../components/Input/Input';
import CheckInput from '../components/CheckInput/CheckInput';
import Button from '../components/Button/Button';
import styled from 'styled-components';
import {FormContainerRef} from 'react-native-form-container';
import {
  faBarcode,
  faBuilding,
  faEnvelope,
  faFileLines,
  faLocationDot,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import CreateDealerRequest from '../payload/request/CreateDealerRequest';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import {checkObject} from '../helper/Helper';
import Container from '../components/Container/Container';
import {DealerApi} from '../services/dealerService';

export default function RegisterScreen(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  var ref = useRef<FormContainerRef>(null);
  const [useRegister] = DealerApi.useCreateDealerMutation();
  const [isContractChecked, setIsContractChecked] = useState(false);
  const [registerRequest, setRegisterRequest] = useState<CreateDealerRequest>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    gnlNumber: '',
    taxNumber: '',
    taxOffice: '',
    address: '',
  });

  const handleRegister = async () => {
    try {
      const response = await useRegister(registerRequest).unwrap();
    } catch (error) {}
  };

  return (
    <Page header title={'Kayıt Ol'} showGoBack>
      <Container mx={10} mt={10} gap={10}>
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
          icon={faBuilding}
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
          value={isContractChecked}
          onPress={() => setIsContractChecked(!isContractChecked)}
          label="Gizlilik ve Kullanım Koşullarını okudum kabul ediyorum."
          clickedLabel="Gizlilik ve Kullanım Koşullarını"
          clickLabel={() => console.log('clicked')}
        />
        <RegisterContainer>
          <Button
            isDisabled={checkObject({
              ...registerRequest,
              isContractChecked: isContractChecked ? 'secildi' : '',
            })}
            onPress={() => {
              handleRegister();
            }}
            text="Kayıt Ol"
          />
        </RegisterContainer>
      </Container>
    </Page>
  );
}

const RegisterContainer = styled(View)`
  margin-bottom: 40px;
  flex: 1;
  justify-content: flex-end;
`;
