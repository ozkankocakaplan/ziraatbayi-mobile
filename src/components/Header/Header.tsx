import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import styled from 'styled-components';
import useThemeColors from '../../constant/useColor';
import {faAngleLeft, faTrash} from '@fortawesome/free-solid-svg-icons';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {faBell, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {Col, Row} from '../../constant/GlobalStyled';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../types/navigator';
import {SIZES} from '../../constant/theme';

export interface HeaderProps {
  title?: string;
  isSearchable?: boolean;
  showNotification?: boolean;
  showAccountDetail?: boolean;
  showGoBack?: boolean;
  showMessage?: boolean;
  showGoToDealerButton?: () => void;
  handleDelete?: () => void;
}
export default function Header({
  title,
  showNotification = false,
  showAccountDetail = false,
  showGoBack = false,
  isSearchable = false,
  showGoToDealerButton,
  showMessage,
  handleDelete,
}: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useThemeColors();
  const {notificationCount} = useSelector((state: RootState) => state.auth);
  const {dealer} = useSelector((state: RootState) => state.dealer);

  return (
    <HeaderContainer
      theme={{
        background: colors.primary,
      }}>
      <Container alignItems={title ? 'center' : 'flex-start'}>
        {showAccountDetail && (
          <View style={{height: 40, top: Platform.OS === 'android' ? 5 : 0}}>
            <Row gap={10}>
              <AccountProfile>
                <CustomText color="primary">
                  {dealer?.firstName?.charAt(0)}
                  {dealer?.lastName?.charAt(0)}
                </CustomText>
              </AccountProfile>
              <Col gap={5}>
                <CustomText fontSizes="body5">
                  {dealer?.firstName} {dealer?.lastName}
                </CustomText>
                <CustomText fontSizes="body6">{dealer?.email}</CustomText>
              </Col>
            </Row>
          </View>
        )}
        {showGoBack && (
          <IconLeft
            hitSlop={15}
            onPress={() => {
              if (showGoBack) {
                navigation.goBack();
              } else {
                navigation.dispatch(DrawerActions.openDrawer());
              }
            }}>
            <Icon icon={faAngleLeft} size={25} color="white" />
          </IconLeft>
        )}
        {isSearchable && (
          <SearchInput
            value={search}
            onChangeText={setSearch}
            returnKeyLabel="search"
            returnKeyType="search"
            placeholder="Ara..."
            onSubmitEditing={() => {
              navigation.navigate('SearchScreen', {query: search});
            }}
          />
        )}
        {title?.length != 0 && (
          <TitleContainer>
            <CustomText
              center
              sx={{width: SIZES.width - 100}}
              numberOfLines={1}
              ellipsizeMode="tail"
              fontSizes="h5"
              color="white"
              fontWeight="bold"
              adjustsFontSizeToFit={true}>
              {title}
            </CustomText>
          </TitleContainer>
        )}
        <ExtraContainer>
          {showNotification && (
            <IconRight
              top={isSearchable ? '0px' : '0px'}
              onPress={() => {
                navigation.navigate('NotificationScreen' as never);
              }}
              hitSlop={15}>
              <Icon
                icon={faBell}
                color={notificationCount > 0 ? '#E9D502' : 'white'}
              />
            </IconRight>
          )}
          {showMessage && (
            <IconRight
              top={isSearchable ? '0px' : '0px'}
              onPress={() => {
                navigation.navigate('ChatListScreen' as never);
              }}
              hitSlop={15}>
              <Icon icon={faEnvelope} color="white" />
            </IconRight>
          )}
          {handleDelete && (
            <IconRight
              top="0px"
              onPress={() => {
                handleDelete();
              }}
              hitSlop={15}>
              <Icon icon={faTrash} color="white" />
            </IconRight>
          )}
          {showGoToDealerButton && (
            <DealerButton
              onPress={() => {
                showGoToDealerButton();
              }}
              hitSlop={15}>
              <CustomText fontSizes="body6" color="white">
                Bayiye git
              </CustomText>
            </DealerButton>
          )}
        </ExtraContainer>
      </Container>
    </HeaderContainer>
  );
}
const HeaderContainer = styled(SafeAreaView)`
  background-color: ${props => props.theme.background};
  height: ${Platform.OS === 'android' ? '55px' : 'auto'};
  justify-content: center;
`;
const Container = styled(View)<{alignItems: string}>`
  padding-bottom: 10px;
  justify-content: center;
  align-items: ${props => props.alignItems};
  padding-bottom: ${props => (props.alignItems === 'center' ? '40px' : '10px')};
  top: 0;
`;
const IconLeft = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
`;
const IconRight = styled(TouchableOpacity)<{top?: string}>`
  bottom: ${Platform.OS === 'android' ? '0px' : '5px'};
  top: ${props => props.top || '0px'};
  right: 10px;
  left: 3px;
`;
const DealerButton = styled(TouchableOpacity)`
  background-color: #104f0235;
  padding-horizontal: 8px;
  padding-vertical: 7px;
  border-radius: 10px;
`;
const TitleContainer = styled(View)`
  position: absolute;
`;

const ExtraContainer = styled(View)`
  position: absolute;
  right: 10px;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
const SearchInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 75%;
  margin-left: 10px;
  top: ${Platform.OS === 'android' ? '5px' : '0px'};
`;
const AccountProfile = styled(View)`
  height: 40px;
  width: 40px;
  background-color: #f9f9f9;
  margin-left: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
