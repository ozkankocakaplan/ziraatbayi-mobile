import React, {useEffect} from 'react';
import {View, TouchableOpacity, TextInput, Image} from 'react-native';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import Container from '../components/Container/Container';
import Page from '../components/Page/Page';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {Center, Col, Row} from '../constant/GlobalStyled';

import AdvertResponse from '../payload/response/AdvertResponse';
import ProductImage from '../components/Advert/ProductImage';
import {AdvertApi} from '../services/advertService';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import dayjs from 'dayjs';

export default function AdvertScreen(props: any) {
  const {data: adverts, refetch} = AdvertApi.useGetAdvertsByDealerIdQuery();
  const {navigation} = props;

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD.MM.YYYY');
  };

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
          <Container>
            <Container>
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
                        <ImageWrapper>
                          <ProductImageContainer>
                            <ProductImage
                              isImageView
                              imageUrl={item?.product?.images?.[0]?.imageUrl}
                            />
                          </ProductImageContainer>
                        </ImageWrapper>
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
                          <Row>
                            <CustomText
                              color="darkGrey"
                              fontSizes="body6"
                              fontWeight="bold">
                              Stok Miktarı:
                            </CustomText>
                            <CustomText color="black" fontSizes="body6">
                              {item.stockQuantity}
                            </CustomText>
                          </Row>
                          <CustomText color="black" fontSizes="body6">
                            {item.product.activeSubstance}
                          </CustomText>
                          <Row>
                            <CustomText
                              color="darkGrey"
                              fontSizes="body6"
                              fontWeight="bold">
                              Üretim Tarihi:
                            </CustomText>
                            <CustomText
                              color="grey"
                              fontSizes="body6"
                              fontWeight="light">
                              {formatDate(item?.startDate || '')}
                            </CustomText>
                          </Row>
                          <Row>
                            <CustomText
                              color="darkGrey"
                              fontSizes="body6"
                              fontWeight="bold">
                              Son Tüketim Tarihi:
                            </CustomText>
                            <CustomText
                              color="grey"
                              fontSizes="body6"
                              fontWeight="light">
                              {formatDate(item?.expiryDate || '')}
                            </CustomText>
                          </Row>
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
const ImageWrapper = styled(View)`
  height: 100%;

  justify-content: center;
`;
const ProductImageContainer = styled(View)`
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
