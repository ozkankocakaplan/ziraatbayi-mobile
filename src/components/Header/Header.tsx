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
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import CustomText from '../Text/Text';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface HeaderProps {
  title?: string;
  isSearchable?: boolean;
  showNotification?: boolean;
  showMessage?: boolean;
  goBackShow?: boolean;
  onShowNotification?: () => void;
  extraIcon?: IconProp;
  extraIconPress?: () => void;
}
export default function Header({
  title,
  isSearchable = false,
  showNotification = false,
  showMessage = false,
  goBackShow = false,
  onShowNotification,
  extraIcon,
  extraIconPress,
}: HeaderProps) {
  const colors = useThemeColors();
  return (
    <HeaderContainer
      theme={{
        background: colors.primary,
      }}>
      <Container>
        {isSearchable ? (
          <SearchInput placeholder="Ürün ara..." placeholderTextColor="#999" />
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
                if (extraIconPress) {
                  extraIconPress();
                }
              }}
              hitSlop={15}>
              <FontAwesomeIcon icon={faEnvelope} color={'#fff'} size={20} />
            </IconRight>
          )}

          {showNotification && (
            <IconRight
              onPress={() => {
                if (onShowNotification) {
                  onShowNotification();
                } else {
                }
              }}
              hitSlop={15}>
              <FontAwesomeIcon icon={faBell} color={'#fff'} size={20} />
            </IconRight>
          )}
        </ExtraContainer>
      </Container>
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
  top: 0;
`;
const IconLeft = styled(TouchableOpacity)`
  position: absolute;
  left: 20px;
`;
const IconRight = styled(TouchableOpacity)``;
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
  padding-vertical: 6px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 70%;
  margin-left: 10px;
`;
