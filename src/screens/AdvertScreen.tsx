import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useRef} from 'react';
import Container from '../components/Container/Container';
import Page from '../components/Page/Page';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {BottomSheetRef} from '../components/BottomSheet/CustomBottomSheet';
import {Col, Row} from '../constant/GlobalStyled';

export default function AdvertScreen() {
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  return (
    <Page header showMessage showNotification title="İlanlarım">
      <Container aItems="center" jContent="center">
        <CustomText color="black" fontSizes="body4">
          Henüz hiçbir ürün eklemediniz.
        </CustomText>
        <Button text="Ürün Ekle"></Button>
      </Container>
      {/* <Container pb={10} pl={15} pr={15}>
        <HeaderRow>
          <SearchInput placeholder="Ürün ara..." placeholderTextColor="#999" />
          <FilterIconContainer
            onPress={() => {
              bottomSheetRef.current?.open();
            }}>
            <FontAwesomeIcon icon={faFilter} size={24} color="#333" />
          </FilterIconContainer>
        </HeaderRow>
        <Container flex={1} justifyContent="space-between">
          <Container flex={1}>
            <StyledContainer>
              <Row gap={10}>
                <AccountProfile></AccountProfile>
                <Col gap={12}>
                  <CustomText color="black" fontSizes="body4">
                    Ürün Adı
                  </CustomText>
                  <CustomText color="black" fontSizes="body6">
                    Kategori
                  </CustomText>
                  <CustomText color="black" fontSizes="body6">
                    Stok Miktarı
                  </CustomText>
                  <CustomText color="black" fontSizes="body5">
                    Fiyat
                  </CustomText>
                </Col>
              </Row>
            </StyledContainer>
            <StyledContainer>
              <Row gap={10}>
                <AccountProfile></AccountProfile>
                <Col gap={12}>
                  <CustomText color="black" fontSizes="body4">
                    Ürün Adı
                  </CustomText>
                  <CustomText color="black" fontSizes="body6">
                    Kategori
                  </CustomText>
                  <CustomText color="black" fontSizes="body6">
                    Stok Miktarı
                  </CustomText>
                  <CustomText color="black" fontSizes="body5">
                    Fiyat
                  </CustomText>
                </Col>
              </Row>
            </StyledContainer>
            <StyledContainer>
              <Row gap={10}>
                <AccountProfile></AccountProfile>
                <Col gap={12}>
                  <CustomText color="black" fontSizes="body4">
                    Ürün Adı
                  </CustomText>
                  <CustomText color="black" fontSizes="body6">
                    Kategori
                  </CustomText>
                  <CustomText color="black" fontSizes="body6">
                    Stok Miktarı
                  </CustomText>
                  <CustomText color="black" fontSizes="body5">
                    Fiyat
                  </CustomText>
                </Col>
              </Row>
            </StyledContainer>
          </Container>
          <Container flex={0.1}>
            <Button text="YENİ İLAN EKLE"></Button>
          </Container>
        </Container>
      </Container> */}
    </Page>
  );
}
const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-vertical: 10px;
`;
const FilterIconContainer = styled(TouchableOpacity)`
  flex: 0.1;
  align-items: flex-end;
  justify-content: center;
`;
const SearchInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding-vertical: 15px;
  padding-horizontal: 10px;
  background-color: #fff;
  flex: 0.9;
`;
const AccountProfile = styled(View)`
  height: 100px;
  width: 100px;
  background-color: red;
`;
const StyledContainer = styled(View)`
  background-color: #fff;
  padding: 15px;
  width: 100%;
  flex: 0.2;
  justify-content: center;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: black;
`;
