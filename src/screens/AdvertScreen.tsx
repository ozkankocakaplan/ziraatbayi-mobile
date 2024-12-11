import React from 'react';
import {View, TouchableOpacity, TextInput, Image} from 'react-native';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import Container from '../components/Container/Container';
import Page from '../components/Page/Page';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {Col, Row} from '../constant/GlobalStyled';

import AdvertResponse from '../payload/response/AdvertResponse';
import ProductImage from '../components/Advert/ProductImage';
import {AdvertApi} from '../services/advertService';
import CustomFlatList from '../components/Flatlist/CustomFlatList';

export default function AdvertScreen(props: any) {
  const {data: adverts} = AdvertApi.useGetAdvertsByDealerIdQuery();

  return (
    <Page header showNotification showMessage title="İlanlarım">
      {adverts && adverts.list.length > 0 ? (
        <Container pb={10} pl={10} pr={10}>
          <HeaderRow>
            <SearchInput
              placeholder="Ürün ara..."
              placeholderTextColor="#999"
            />
          </HeaderRow>
          <Container flex={1} jContent="space-between">
            <Container flex={1}>
              <CustomFlatList
                data={adverts.list}
                renderItem={(item: AdvertResponse) => {
                  return (
                    <StyledContainer
                      key={item.id}
                      onPress={() =>
                        props.navigation.navigate('EditAdvertScreen')
                      }>
                      <Row>
                        <AccountProfile>
                          <ProductImage
                            isImageView
                            imageUrl={item?.product?.images?.[0]?.imageUrl}
                          />
                        </AccountProfile>
                        <Col gap={10}>
                          <CustomText
                            color="black"
                            fontSizes="body4"
                            fontWeight="light">
                            {item.product.name}
                          </CustomText>
                          <CustomText color="black" fontSizes="body6">
                            {item.product.categoryName}
                          </CustomText>
                          <CustomText color="black" fontSizes="body6">
                            Stok Miktarı: {item.stockQuantity}
                          </CustomText>
                          {/* <CustomText color="black" fontSizes="body5">
                     Fiyat: {advert.price}
                   </CustomText> */}
                        </Col>
                      </Row>
                    </StyledContainer>
                  );
                }}
              />
            </Container>
            <Container flex={0.07}>
              <Button
                onPress={() => props.navigation.navigate('AddAdvertScreen')}
                text="YENİ İLAN EKLE"
              />
            </Container>
          </Container>
        </Container>
      ) : (
        <Container gap={10} aItems="center" jContent="center">
          <CustomText color="black" fontSizes="body4">
            Henüz hiç ilan eklemediniz.
          </CustomText>
          <Button
            text="İlan Ekle"
            onPress={() => props.navigation.navigate('AddAdvertScreen')}
          />
        </Container>
      )}
    </Page>
  );
}

const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-vertical: 10px;
`;

const SearchInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding-vertical: 15px;
  padding-horizontal: 10px;
  background-color: #fff;
  flex: 1;
`;
const AccountProfile = styled(View)`
  height: 100px;
  width: 100px;
`;
const StyledContainer = styled(TouchableOpacity)`
  background-color: #fff;
  padding: 15px;
  width: 100%;
  justify-content: center;
  margin-bottom: 5px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
`;
