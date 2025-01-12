import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import {View} from 'react-native';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Page from '../components/Page/Page';
import {
  faAngleRight,
  faBuilding,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native';
import Icon from '../components/Icon/Icon';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {RootStackParamList} from '../types/navigator';
import auth from '@react-native-firebase/auth';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DealerApi} from '../services/dealerService';
import SubscriptionApi from '../services/subscriptionService';
import {Row} from '../constant/GlobalStyled';

const pageColor = '#f9f9f9';
export default function AccountScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useDispatch();

  const {refetch} = DealerApi.useGetDealerQuery();
  const {data: getSubscription, refetch: subcriptionRefetch} =
    SubscriptionApi.useGetSubscriptionQuery();
  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
      subcriptionRefetch();
    });
  }, []);
  const logOut = () => {
    AlertDialog.showLogoutModal(() => {
      auth().signOut();
      dispatch(AuthActions.setUser(null));
    });
  };

  const ColTitle = ({
    title,
    marginTop = 0,
  }: {
    title: string;
    marginTop?: number;
  }) => {
    return (
      <CustomText
        sx={{marginBottom: 15, marginTop}}
        color="black"
        fontSizes="body3">
        {title}
      </CustomText>
    );
  };

  return (
    <Page header showAccountDetail showMessage showNotification>
      <Container bgColor={pageColor} pb={10} pl={10} pr={10}>
        <Container bgColor={pageColor} pt={25}>
          <ColTitle title="Hesap Bilgilerim" />
          <ListItemContainer>
            <ListItem
              onPress={() => {
                navigation.navigate('UserInfoScreen');
              }}
              icon={faUser}
              text="Bilgilerim"
            />
            <ListItem
              onPress={() => {
                navigation.navigate('CompanyInformationScreen');
              }}
              icon={faBuilding}
              text="Firma Detayları"
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
          <ColTitle title="Abonelik Bilgilerim" marginTop={15} />
          <ListItemContainer>
            <ListItem
              icon={faUser}
              text="Abonelik Durumum"
              color={getSubscription?.entity?.color}
              value={
                (getSubscription?.entity?.daysRemaining?.toString?.() || '0') +
                ' Gün Kaldı'
              }
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
  color,
  value,
}: {
  noneBorder?: boolean;
  icon: IconProp;
  text: string;
  onPress?: () => void;
  color?: string;
  value?: string;
}) => {
  return (
    <ListItemButton
      activeOpacity={0.7}
      noneBorder={noneBorder}
      onPress={onPress}>
      <Row between flex={1} alignCenter>
        <Row gap={10} alignCenter>
          <Icon icon={icon} color="#1F8505" />
          <CustomText color="black">{text}</CustomText>
        </Row>
        {value ? (
          <CustomText fontWeight="bold" color={(color as any) || 'black'}>
            {value}
          </CustomText>
        ) : (
          <Icon icon={faAngleRight} />
        )}
      </Row>
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
