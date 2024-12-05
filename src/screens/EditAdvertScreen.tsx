import React, {useRef} from 'react';
import Page from '../components/Page/Page';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {View} from 'react-native';

export default function EditAdvertScreen() {
  var ref = useRef<FormContainerRef>(null);
  return (
    <Page header goBackShow title="İlan Düzenle">
      <Form formContainerRef={ref}>
        <CustomText sx={{marginBottom: 16}} fontSizes="body3" color="black">
          İlan Bilgileri
        </CustomText>
        <Input required id="category" placeholder="Kategori" />
        <Input required id="selectProduct" placeholder="Ürün Seç" />
        <Input required id="stockQuantity" placeholder="Stok Miktarı" />
        <Input
          required
          id="orderQuantity"
          placeholder="Minimum Sipariş Miktarı"
        />
        <Input required id="price" placeholder="Fiyat" />
        <Input required id="expirationDate" placeholder="Son Kullanma Tarihi" />
        <CustomText sx={{marginTop: 16}} color="black">
          İlan durumu
        </CustomText>
        <RegisterContainer>
          <Button text="GÜNCELLE"></Button>
        </RegisterContainer>
      </Form>
    </Page>
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
