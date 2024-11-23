import React from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import {Text, View} from 'react-native';
import {Col, Row} from '../constant/GlobalStyled';
import styled from 'styled-components';

export default function AccountScreen() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(AuthActions.setUser(null));
  };
  const CustomAccount = () => {
    return (
      <Row gap={10}>
        <AccountProfile></AccountProfile>
        <Col gap={10}>
          <Text>Ad Soyad</Text>
          <Text>Mail</Text>
        </Col>
      </Row>
    );
  };
  return (
    <Container
      customView={CustomAccount()}
      header
      title="Hesabım"
      showMessage
      showNotification>
      <Container type="container" pb={10} pl={10} pr={10}>
        <Container type="container" p={10}></Container>
        <Button text="Çıkış Yap" onPress={logOut} />
      </Container>
    </Container>
  );
}
const AccountProfile = styled(View)`
  height: 50px;
  width: 50px;
  background-color: red;
  margin-left: 10px;
`;
