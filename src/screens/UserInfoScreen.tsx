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
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedbackComponent,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {checkObject} from '../helper/Helper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {DealerApi} from '../services/dealerService';
import Container from '../components/Container/Container';
import usePhoto from '../hooks/usePhoto';
import ProductImage from '../components/Advert/ProductImage';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function UserInfoScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'UserInfoScreen'>) {
  const {initLaunchImage, photos} = usePhoto();
  const {dealer} = useSelector((x: RootState) => x.dealer);
  const [updateDealer, {isLoading, isSuccess, isError}] =
    DealerApi.useUpdateDealerMutation();
  const [getDealer] = DealerApi.useGetDealerFuncMutation();
  const [updateImage] = DealerApi.useUploadDealerImageMutation();
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>();

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
        glnNumber: dealer.glnNumber || '',
        taxNumber: dealer.taxNumber || '',
        taxOffice: dealer.taxOffice || '',
        address: dealer.address || '',
      });
      setUploadedImageUri(dealer.companyImage);
    }
  }, [dealer]);
  const uploadFile = async () => {
    var data = new FormData();
    data.append('file', {
      uri: photos[0].uri,
      name: photos[0].fileName,
    });
    try {
      AlertDialog.showLoading();
      await updateImage(data).unwrap();
      await getDealer().unwrap();
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 50}
      behavior={'padding'}>
      <Page header showGoBack title="Bilgilerim">
        <Container mx={10} mt={10} mb={10}>
          <Container jContent="center" aItems="center" noFlex mb={10}>
            <TouchableOpacity
              onPress={() => {
                initLaunchImage(false);
              }}
              style={{
                width: 100,
                height: 100,
              }}>
              <ProductImage
                imageUrl={uploadedImageUri || dealer?.companyImage || 'error'}
              />
            </TouchableOpacity>
          </Container>
          <Container gap={10} mb={10}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 10}}>
              <Input
                id="firstName"
                icon={faUser}
                placeholder="Ad"
                value={formData.firstName}
                onChangeText={text => handleInputChange('firstName', text)}
              />
              <Input
                id="lastName"
                icon={faUser}
                placeholder="Soyad"
                value={formData.lastName}
                onChangeText={text => handleInputChange('lastName', text)}
              />
              <Input
                id="companyName"
                icon={faHouse}
                placeholder="Firma Adı"
                value={formData.companyName}
                onChangeText={text => handleInputChange('companyName', text)}
              />
              <Input
                id="email"
                autoCapitalize="none"
                icon={faEnvelope}
                placeholder="E-posta"
                validation="email"
                value={formData.email}
                editable={false}
                onChangeText={text => handleInputChange('email', text)}
              />
              <Input
                id="phone"
                icon={faPhone}
                validation="phone"
                keyboardType="phone-pad"
                placeholder="Telefon Numarası"
                value={formData.phone}
                onChangeText={text => handleInputChange('phone', text)}
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
