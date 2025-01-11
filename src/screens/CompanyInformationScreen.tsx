import React, {useState, useEffect} from 'react';
import Page from '../components/Page/Page';
import Input from '../components/Input/Input';
import {
  faBarcode,
  faBuilding,
  faFileLines,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {checkObject} from '../helper/Helper';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {DealerApi} from '../services/dealerService';
import Container from '../components/Container/Container';
export default function CompanyInformationScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {dealer} = useSelector((x: RootState) => x.dealer);
  const [updateDealer, {isLoading, isSuccess, isError}] =
    DealerApi.useUpdateDealerMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    glnNumber: '',
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
        glnNumber: dealer.glnNumber || '',
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
      await updateDealer(formData).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 50}
      behavior={'padding'}>
      <Page header showGoBack title="Firma Detayları">
        <Container mx={10} mt={10} mb={10}>
          <Container gap={10} mb={10}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 10}}>
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
                value={formData.taxOffice}
                onChangeText={text => handleInputChange('taxOffice', text)}
              />
              <Input
                required
                id="glnNumber"
                icon={faBarcode}
                keyboardType="phone-pad"
                placeholder="GLN Numarası"
                value={formData.glnNumber}
                onChangeText={text => handleInputChange('glnNumber', text)}
              />
              <Input
                required
                id="address"
                multiline
                icon={faLocationDot}
                placeholder="Firma Adresi"
                value={formData.address}
                onChangeText={text => handleInputChange('address', text)}
                style={{height: 70, textAlignVertical: 'top', paddingTop: 13}}
              />
              <Button
                isDisabled={checkObject(formData)}
                text="Kaydet"
                onPress={handleUpdate}
              />
            </ScrollView>
          </Container>
        </Container>
      </Page>
    </KeyboardAvoidingView>
  );
}
