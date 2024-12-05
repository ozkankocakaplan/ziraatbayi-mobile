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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {faBell, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import CustomText from '../Text/Text';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';
import {SvgXml} from 'react-native-svg';
import {Col, Row} from '../../constant/GlobalStyled';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {useState} from 'react';
import {RootStackParamList} from '../../types/navigator';

export interface HeaderProps {
  title?: string;
  isSearchable?: boolean;
  showNotification?: boolean;
  showAccountDetail?: boolean;
  showGoBack?: boolean;
  showMessage?: boolean;
}
export default function Header({
  title,
  showNotification = false,
  showAccountDetail = false,
  showGoBack = false,
  isSearchable = false,
  showMessage,
}: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useThemeColors();
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <HeaderContainer
      theme={{
        background: colors.primary,
      }}>
      <Container alignItems={title ? 'center' : 'flex-start'}>
        {showAccountDetail && (
          <View style={{height: 40}}>
            <Row gap={10}>
              <AccountProfile>
                <CustomText color="primary">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </CustomText>
              </AccountProfile>
              <Col gap={5}>
                <CustomText fontSizes="body5">
                  {user?.firstName} {user?.lastName}
                </CustomText>
                <CustomText fontSizes="body6">{user?.email}</CustomText>
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
              // arama sayfayına yönlendir search statinin değerinide gönder
              navigation.navigate('SearchScreen', {query: search});
            }}
          />
        )}
        {title?.length != 0 && (
          <TitleContainer>
            <CustomText
              fontSizes="body3"
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
              onPress={() => {
                navigation.navigate('NotificationScreen' as never);
              }}
              hitSlop={15}>
              <Icon icon={faBell} color="white" />
            </IconRight>
          )}
          {showMessage && (
            <IconRight
              onPress={() => {
                navigation.navigate('MessageScreen' as never);
              }}
              hitSlop={15}>
              <Icon icon={faEnvelope} color="white" />
            </IconRight>
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
  left: 20px;
`;
const IconRight = styled(TouchableOpacity)`
  bottom: 5px;
`;
const TitleContainer = styled(View)`
  position: absolute;
`;

const ExtraContainer = styled(View)`
  position: absolute;
  right: 20px;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const SearchInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 73%;
  margin-left: 10px;
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
