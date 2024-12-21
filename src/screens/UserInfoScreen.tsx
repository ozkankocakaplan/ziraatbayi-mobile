import React, {useState, useEffect} from 'react';
import Page from '../components/Page/Page';
import styled from 'styled-components';
import Input from '../components/Input/Input';
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
import {TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {checkObject} from '../helper/Helper';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {DealerApi} from '../services/dealerService';
import Container from '../components/Container/Container';
import usePhoto from '../hooks/usePhoto';
import ProductImage from '../components/Advert/ProductImage';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function UserInfoScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {initLaunchImage, photos} = usePhoto();
  const {dealer} = useSelector((x: RootState) => x.dealer);
  const [updateDealer, {isLoading, isSuccess, isError}] =
    DealerApi.useUpdateDealerMutation();
  const [updateImage] = DealerApi.useUploadDealerImageMutation();
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);

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
    if (photos.length > 0) {
      uploadFile();
    }
  }, [photos]);

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
  const uploadFile = async () => {
    var data = new FormData();

    data.append('file', {
      uri: photos[0].uri,
      name: photos[0].fileName,
      type: 'image/jpeg',
    });
    try {
      AlertDialog.showLoading();
      const response = await updateImage(data).unwrap();

      setUploadedImageUri(photos[0].uri);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      AlertDialog.hideLoading();
    }
  };

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
      <Container mx={10} mt={10} gap={10}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              initLaunchImage(false);
            }}
            style={{
              width: 100,
              height: 100,
              overflow: 'hidden',
              borderRadius: 100,
            }}>
            <ProductImage
              borderRadius={100}
              imageUrl={uploadedImageUri || dealer?.companyImage || 'error'}
            />
          </TouchableOpacity>
        </View>
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
      </Container>
      <Container mx={10} flex={0.15}>
        <Button
          isDisabled={checkObject(formData)}
          text="Kaydet"
          onPress={handleUpdate}
        />
      </Container>
    </Page>
  );
}
