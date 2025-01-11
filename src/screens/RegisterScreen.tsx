import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
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
import ContractBottomSheet from '../components/BottomSheet/ContractBottomSheet';
import {BottomSheetRef} from '../components/BottomSheet/CustomBottomSheet';

export default function RegisterScreen(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  var ref = useRef<BottomSheetRef>(null);
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
    await useRegister(registerRequest).unwrap();
  };

  return (
    <>
      <Page header title={'Kayıt Ol'} showGoBack>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Container mx={10} mt={10}>
            <Container gap={10} mb={10}>
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
                style={{height: 70, textAlignVertical: 'top', paddingTop: 13}}
              />
              <CheckInput
                bgColor="#fff"
                id="contract"
                type="checkbox"
                value={isContractChecked}
                onPress={() => setIsContractChecked(!isContractChecked)}
                label="Gizlilik ve Kullanım Koşullarını okudum kabul ediyorum."
                clickedLabel="Gizlilik ve Kullanım Koşullarını"
                clickLabel={() => ref.current?.open()}
              />
            </Container>

            <Container flex={0.55}>
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
            </Container>
          </Container>
        </ScrollView>
      </Page>
      <ContractBottomSheet contractBottomSheetRef={ref} />
    </>
  );
}
