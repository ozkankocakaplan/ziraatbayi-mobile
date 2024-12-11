import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {ScrollView, View} from 'react-native';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import CheckRadio from '../components/CheckInput/CheckRadio';

const family = ['Feriza', 'Özkan'];
export default function EditAdvertScreen() {
  var ref = useRef<FormContainerRef>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  return (
    <>
      <Page header showGoBack title="İlan Düzenle">
        <Form formContainerRef={ref}>
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
          <CustomText sx={{marginTop: 16, marginLeft: 10}} color="black">
            İlan durumu
          </CustomText>
          <RegisterContainer>
            <Button text="GÜNCELLE"></Button>
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
  margin-horizontal: 10px;
  flex: 1;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 50px;
  flex: 1;
  justify-content: flex-end;
`;
const ScrollableContainer = styled(ScrollView)``;
