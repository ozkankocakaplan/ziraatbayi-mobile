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

export default function MainHeader() {
  return (
    <Container>
      <Header>
        <SearchInput placeholder="Ürün ara..." placeholderTextColor="#999" />

        <IconContainer>
          <IconButton>
            <FontAwesomeIcon icon={faEnvelope} size={24} color="black" />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faBell} size={24} color="black" />
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

const IconContainer = styled(View)`
  flex: 0.2;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  justify-content: space-between;
`;

const IconButton = styled(TouchableOpacity)``;
