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
import {TouchableOpacity} from 'react-native';
import Icon from '../components/Icon/Icon';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigator';
import auth from '@react-native-firebase/auth';
export default function AccountScreen(props: any) {
  const dispatch = useDispatch();
  const pageColor = '#f9f9f9';
  const logOut = () => {
    auth().signOut();
    dispatch(AuthActions.setUser(null));
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const ColTitle = ({title}: {title: string}) => {
    return (
      <CustomText sx={{marginBottom: 15}} color="black" fontSizes="body3">
        {title}
      </CustomText>
    );
  };
  return (
    <Page header showAccountDetail showMessage showNotification>
      <Container bgColor={pageColor} pb={10} pl={10} pr={10}>
        <Container bgColor={pageColor} pt={25} flex={0.4}>
          <ColTitle title="Hesap Bilgilerim" />
          <ListItemContainer>
            <ListItem
              onPress={() => {
                navigation.navigate('UserInfoScreen');
              }}
              icon={faUser}
              text="Kullanıcı Bilgilerim"
            />
            <ListItem
              onPress={() => {
                navigation.navigate('ChangePasswordScreen');
              }}
              noneBorder
              icon={faLock}
              text="Şifremi Değiştir"
            />
          </ListItemContainer>
        </Container>
        <Container bgColor={pageColor}>
          <ColTitle title="Abonelik Bilgilerim" />
          <ListItemContainer>
            <ListItem
              onPress={() => {
                navigation.navigate('DealerScreen');
              }}
              icon={faUser}
              text="Abonelik Durumum"
            />
            <ListItem
              noneBorder
              icon={faLock}
              text="Yardım & Sıkça Sorulan Sorular"
              onPress={() => {
                navigation.navigate('SupportScreen');
              }}
            />
          </ListItemContainer>
        </Container>
        <Button text="Çıkış Yap" onPress={logOut} />
      </Container>
    </Page>
  );
}
const ListItemContainer = styled(View)`
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ebeff3;
`;
const ListItem = ({
  noneBorder,
  icon,
  text,
  onPress,
}: {
  noneBorder?: boolean;
  icon: IconProp;
  text: string;
  onPress?: () => void;
}) => {
  return (
    <ListItemButton noneBorder={noneBorder} onPress={onPress}>
      <Icon icon={icon} color="#1F8505" />
      <CustomText color="black">{text}</CustomText>
    </ListItemButton>
  );
};

const ListItemButton = styled(TouchableOpacity)<{noneBorder?: boolean}>`
  padding-vertical: 15px;
  padding-horizontal: 10px;
  border-bottom-width: ${({noneBorder}) => (noneBorder ? 0 : 1)}px;
  border-bottom-color: #ebeff3;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;
