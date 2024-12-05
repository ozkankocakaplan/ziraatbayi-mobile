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
import Page from '../components/Page/Page';
import {
  faCircleQuestion,
  faLock,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

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
    <Page
      customView={CustomAccount()}
      header
      title="Hesabım"
      showMessage
      showNotification>
      <Container pb={10} pl={10} pr={10}>
        <Container flex={1}>
          <Container
            borderWidth={1}
            borderColor="black"
            p={10}
            mt={35}
            flex={0.4}
            bgColor="pink">
            <CustomText sx={{marginBottom: 15}} color="black" fontSizes="body3">
              Hesabım
            </CustomText>
            <Container flex={0.4}>
              <Button
                icon={faUser}
                marginBottom={10}
                text="Kullanıcı Bilgilerim"></Button>
              <Button icon={faLock} text="Şifre Değişikliği"></Button>
            </Container>
          </Container>
          <Container
            bgColor="yellow"
            borderWidth={1}
            borderColor="black"
            p={10}
            flex={0.5}>
            <CustomText sx={{marginBottom: 15}} color="black" fontSizes="body3">
              Abonelik Bilgilerim
            </CustomText>
            <Container>
              <Button
                icon={faUserGroup}
                marginBottom={10}
                text="Abonelik Durumum"></Button>
              <Button
                icon={faCircleQuestion}
                text="Yardım & Sıkça Sorulan Sorular"></Button>
            </Container>
          </Container>
        </Container>
        <Button text="Çıkış Yap" onPress={logOut} />
      </Container>
    </Page>
  );
}
const AccountProfile = styled(View)`
  height: 50px;
  width: 50px;
  background-color: #f9f9f9;
  margin-left: 10px;
`;
