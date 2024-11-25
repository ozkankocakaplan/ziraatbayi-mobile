import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import styled from 'styled-components';
import useThemeColors from '../../constant/useColor';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import CustomText from '../Text/Text';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigator';

export interface HeaderProps {
  title?: string;
  isSearchable?: boolean;
  showNotification?: boolean;
  showMessage?: boolean;
  goBackShow?: boolean;
  customView?: React.ReactNode;
}
export default function Header({
  title,
  isSearchable = false,
  showNotification = false,
  showMessage = false,
  goBackShow = false,
  customView,
}: HeaderProps) {
  const colors = useThemeColors();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <HeaderContainer
      theme={{
        background: colors.primary,
      }}>
      {customView ? (
        <>
          {customView}
          <Container>
            <ExtraContainer>
              {showMessage && (
                <IconRight
                  bottom={45}
                  onPress={() => {
                    navigation.navigate('MessageScreen');
                  }}
                  hitSlop={15}>
                  <FontAwesomeIcon icon={faEnvelope} color={'#fff'} size={20} />
                </IconRight>
              )}

              {showNotification && (
                <IconRight
                  bottom={45}
                  onPress={() => {
                    navigation.navigate('MessageScreen');
                  }}
                  hitSlop={15}>
                  <FontAwesomeIcon icon={faBell} color={'#fff'} size={20} />
                </IconRight>
              )}
            </ExtraContainer>
          </Container>
        </>
      ) : (
        <>
          {goBackShow && (
            <IconLeft
              hitSlop={15}
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesomeIcon icon={faAngleLeft} color={'#fff'} size={20} />
            </IconLeft>
          )}
          <Container>
            {isSearchable ? (
              <SearchInput
                placeholder="Ürün ara..."
                placeholderTextColor="#999"
              />
            ) : (
              title?.length != 0 && (
                <TitleContainer>
                  <HeaderTitle adjustsFontSizeToFit={true}>{title}</HeaderTitle>
                </TitleContainer>
              )
            )}
            <ExtraContainer>
              {showMessage && (
                <IconRight
                  onPress={() => {
                    navigation.navigate('MessageScreen');
                  }}
                  hitSlop={15}>
                  <FontAwesomeIcon icon={faEnvelope} color={'#fff'} size={20} />
                </IconRight>
              )}

              {showNotification && (
                <IconRight
                  onPress={() => {
                    navigation.navigate('MessageScreen');
                  }}
                  hitSlop={15}>
                  <FontAwesomeIcon icon={faBell} color={'#fff'} size={20} />
                </IconRight>
              )}
            </ExtraContainer>
          </Container>
        </>
      )}
    </HeaderContainer>
  );
}
const HeaderContainer = styled(SafeAreaView)`
  background-color: ${props => props.theme.background};
  height: ${Platform.OS === 'ios' ? 'auto' : '50px'};
  justify-content: center;
`;
const Container = styled(View)`
  justify-content: center;
  padding-bottom: 10px;
  top: 0px;
`;
const IconLeft = styled(TouchableOpacity)`
  position: absolute;
  left: 20px;
  bottom: 12px;
  z-index: 1;
`;
const IconRight = styled(TouchableOpacity)<{bottom?: number}>`
  position: relative;
  bottom: ${props => props.bottom || 5}px;
  z-index: 1;
`;
const TitleContainer = styled(View)`
  position: center;
`;
const HeaderTitle = styled(CustomText)`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;
const ExtraContainer = styled(View)`
  position: absolute;
  right: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
const SearchInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 6px;
  padding-vertical: 2px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 70%;
  margin-left: 10px;
`;
