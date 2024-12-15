import React, {useRef, useState, useEffect} from 'react';
import Page from '../components/Page/Page';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import {FormContainerRef} from 'react-native-form-container';
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
import {AuthApi} from '../services/authService';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {checkObject} from '../helper/Helper';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

export default function UserInfoScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {dealer} = useSelector((x: RootState) => x.dealer);
  const [updateDealer, {isLoading, isSuccess, isError}] =
    AuthApi.useUpdateDealerMutation();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (dealer) {
      setFormData({
        firstName: dealer.firstName || '',
        lastName: dealer.lastName || '',
        companyName: dealer.companyName || '',
        email: dealer.email || '',
        phone: dealer.phone || '',
        gnlNumber: dealer.gnlNumber || '',
        taxNumber: dealer.taxNumber || '',
        taxOffice: dealer.taxOffice || '',
        address: dealer.address || '',
      });
    }
  }, [dealer]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const handleUpdate = async () => {
    try {
      const response = await updateDealer(formData).unwrap();
    } catch (error) {}
  };

  return (
    <Page header showGoBack title="Kullanıcı Bilgilerim">
      <Form>
        <Input
          required
          id="firstName"
          icon={faUser}
          placeholder="Ad"
          value={formData.firstName}
          onChangeText={text => handleInputChange('firstName', text)}
        />
        <Input
          required
          id="lastName"
          icon={faUser}
          placeholder="Soyad"
          value={formData.lastName}
          onChangeText={text => handleInputChange('lastName', text)}
        />
        <Input
          required
          id="companyName"
          icon={faHouse}
          placeholder="Firma Adı"
          value={formData.companyName}
          onChangeText={text => handleInputChange('companyName', text)}
        />
        <Input
          required
          id="email"
          autoCapitalize="none"
          icon={faEnvelope}
          placeholder="E-posta"
          validation="email"
          value={formData.email}
          editable={false}
          onChangeText={text => handleInputChange('email', text)}
          style={{color: '#ddd'}}
        />
        <Input
          required
          id="phone"
          icon={faPhone}
          validation="phone"
          keyboardType="phone-pad"
          placeholder="Telefon Numarası"
          value={formData.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />
        <Input
          required
          id="glnNumber"
          icon={faBarcode}
          keyboardType="phone-pad"
          placeholder="GNL Numarası"
          value={formData.gnlNumber}
          onChangeText={text => handleInputChange('gnlNumber', text)}
        />

        <Input
          required
          id="taxNumber"
          icon={faFileLines}
          placeholder="Vergi Numarası"
          keyboardType="phone-pad"
          value={formData.taxNumber}
          onChangeText={text => handleInputChange('taxNumber', text)}
        />
        <Input
          required
          id="taxOffice"
          icon={faBuilding}
          placeholder="Vergi Dairesi"
          keyboardType="phone-pad"
          value={formData.taxOffice}
          onChangeText={text => handleInputChange('taxOffice', text)}
        />
        <Input
          required
          id="address"
          multiline
          icon={faLocationDot}
          placeholder="Firma Adresi"
          style={{height: 100}}
          value={formData.address}
          onChangeText={text => handleInputChange('address', text)}
        />
        <RegisterContainer>
          <Button
            isDisabled={checkObject(formData)}
            text="Kaydet"
            onPress={handleUpdate}
          />
        </RegisterContainer>
      </Form>
    </Page>
  );
}

const Form = styled(View)`
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
