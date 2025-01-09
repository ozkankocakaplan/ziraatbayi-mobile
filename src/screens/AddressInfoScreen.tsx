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
import {DealerActions} from '../store/features/dealerReducer';

export default function AddressInfoScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {initLaunchImage, photos} = usePhoto();
  const {dealer} = useSelector((x: RootState) => x.dealer);
  const [updateDealer, {isLoading, isSuccess, isError}] =
    DealerApi.useUpdateDealerMutation();
  const [updateImage] = DealerApi.useUploadDealerImageMutation();
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>();
  const {uploadedImageUri: reduxUploadedImageUri} = useSelector(
    (state: RootState) => state.dealer,
  );
  const dispatch = useDispatch();

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
      dispatch(DealerActions.setUploadedImageUri(photos[0].uri));
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      AlertDialog.hideLoading();
    }
    console.log(data);
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
                placeholder="GNL Numarası"
                value={formData.gnlNumber}
                onChangeText={text => handleInputChange('gnlNumber', text)}
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
            </ScrollView>
          </Container>
          <Container flex={0.1}>
            <Button
              isDisabled={checkObject(formData)}
              text="Kaydet"
              onPress={handleUpdate}
            />
          </Container>
        </Container>
      </Page>
    </KeyboardAvoidingView>
  );
}
