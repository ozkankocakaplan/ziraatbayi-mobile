import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface MainHeaderProps {
  screen: 'HomeScreen' | 'AdvertScreen';
}
export default function MainHeader(props: MainHeaderProps) {
  const {screen} = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Container>
      <Header>
        {screen === 'HomeScreen' ? (
          <SearchInput placeholder="Ürün ara..." placeholderTextColor="#999" />
        ) : (
          <AdvertTitle>İlanlarım</AdvertTitle>
        )}

        <IconContainer>
          <IconButton
            onPress={() => {
              navigation.navigate('MessageScreen');
            }}>
            <FontAwesomeIcon icon={faEnvelope} size={24} color="#f0f0f0" />
          </IconButton>
          <IconButton
            onPress={() => {
              navigation.navigate('MessageScreen');
            }}>
            <FontAwesomeIcon icon={faBell} size={24} color="#f0f0f0" />
          </IconButton>
        </IconContainer>
      </Header>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  background-color: green;
`;

const Header = styled(View)`
  flex-direction: row;
  padding-horizontal: 15px;
  padding-bottom: 10px;
`;

const SearchInput = styled(TextInput)`
  flex: 0.8;
  height: 40px;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding-horizontal: 10px;
  background-color: #fff;
`;
const AdvertTitle = styled(Text)`
  flex: 0.8;

  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const IconContainer = styled(View)`
  flex: 0.2;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  justify-content: space-between;
`;

const IconButton = styled(TouchableOpacity)``;
