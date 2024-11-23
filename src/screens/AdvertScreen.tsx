import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container/Container';

export default function AdvertScreen() {
  return (
    <Container header showMessage showNotification title="İlanlarım">
      <Container type="container" p={10}>
        <Text>İlanlarım</Text>
      </Container>
    </Container>
  );
}
