import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container/Container';
import Page from '../components/Page/Page';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';

export default function AdvertScreen() {
  return (
    <Page header showMessage showNotification title="İlanlarım">
      <Container>
        <CustomText color="black" fontSizes="body5">
          Henüz hiçbir ürün eklemediniz.
        </CustomText>
        <Button text="Ürün Ekle"></Button>
      </Container>
    </Page>
  );
}
