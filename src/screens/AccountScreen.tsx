import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import {Text, View} from 'react-native';
import {Col, Row} from '../constant/GlobalStyled';
import styled from 'styled-components';
import {RootState} from '../store';
import CustomText from '../components/Text/Text';

export default function AccountScreen() {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const logOut = () => {
    dispatch(AuthActions.setUser(null));
  };
  const CustomAccount = () => {
    return (
      <Row gap={10}>
        <AccountProfile></AccountProfile>
        <Col gap={5}>
          <CustomText fontSizes="body5">
            {user?.firstName} {user?.lastName}
          </CustomText>
          <CustomText fontSizes="body6">{user?.email}</CustomText>
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
        <Container type="container"></Container>
        <Button text="Çıkış Yap" onPress={logOut} />
      </Container>
    </Container>
  );
}
const AccountProfile = styled(View)`
  height: 50px;
  width: 50px;
  background-color: #f9f9f9;
  margin-left: 10px;
`;
