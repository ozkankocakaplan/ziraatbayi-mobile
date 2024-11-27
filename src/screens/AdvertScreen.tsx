import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container/Container';
import Page from '../components/Page/Page';

export default function AdvertScreen() {
  return (
    <Page header showMessage showNotification title="İlanlarım">
      <Container p={10}>
        <Text>İlanlarım</Text>
      </Container>
    </Page>
  );
}
