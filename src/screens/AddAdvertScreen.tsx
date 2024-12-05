import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {AdvertApi} from '../services/advertService';
import CreateAdvertRequest from '../payload/request/CreateAdvertRequest';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import {faCheck, faReceipt} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import CheckRadio from '../components/CheckInput/CheckRadio';

const family = ['Feriza', 'Özkan'];
export default function AddAdvertScreen(
  props: NativeStackScreenProps<RootStackParamList, 'AddAdvertScreen'>,
) {
  var ref = useRef<FormContainerRef>(null);
  const [useRegister] = AdvertApi.useCreateAdvertMutation();
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [advertRequest, setAdvertRequest] = useState<CreateAdvertRequest>({
    productId: 0,
    stockQuantity: 1,
    expiryDate: '',
  });
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  return (
    <>
      <Page header showGoBack title="İlan Ekle">
        <Form formContainerRef={ref}>
          <CustomText sx={{marginBottom: 16}} fontSizes="body3" color="black">
            İlan Bilgileri
          </CustomText>
          <Input
            handlePress={() => {
              bottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            required
            id="category"
            placeholderValue={selectedFamily ? selectedFamily : 'Kategori Seç'}
          />
          <Input
            handlePress={() => {
              bottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            placeholderValue="Ürün Seç"
            required
            id="productName"
          />
          <Input required id="stockQuantity" placeholder="Stok Miktarı" />
          <Input
            required
            id="orderQuantity"
            placeholder="Minimum Sipariş Miktarı"
          />
          <Input required id="price" placeholder="Fiyat" />
          <Input
            isPlaceholder={true}
            required
            id="expirationDate"
            placeholderValue="Son Kullanma Tarihi"
          />
          <RegisterContainer>
            <Button text="KAYDET"></Button>
          </RegisterContainer>
        </Form>
      </Page>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <ScrollableContainer contentContainerStyle={{margin: 10}}>
          {family.map((item, index) => {
            return (
              <CheckRadio
                value={item}
                checked={selectedFamily === item}
                handleChecked={(isCheck: boolean) => {
                  bottomSheetRef.current?.close();
                  setSelectedFamily(item);
                }}
              />
            );
          })}
        </ScrollableContainer>
      </CustomBottomSheet>
    </>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 20px;
  flex: 1;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 30px;
  flex: 1;
  justify-content: flex-end;
`;

const ScrollableContainer = styled(ScrollView)``;
