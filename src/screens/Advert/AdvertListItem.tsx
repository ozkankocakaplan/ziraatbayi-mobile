import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import Page from '../../components/Page/Page';
import CustomText from '../../components/Text/Text';

import {Col, Row} from '../../constant/GlobalStyled';

import AdvertResponse from '../../payload/response/AdvertResponse';
import ProductImage from '../../components/Advert/ProductImage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigator';
import {formatDate} from '../../helper/Helper';

const AdvertListItem = ({item}: {item: AdvertResponse}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <StyledContainer
      key={item.id}
      onPress={() => navigation.navigate('EditAdvertScreen')}>
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
          <CustomText color="black" fontSizes="body4" fontWeight="light">
            {item.product.name}
          </CustomText>
          <CustomText color="black" fontSizes="body6">
            {item.product.categoryName}
          </CustomText>
          <Row>
            <CustomText color="darkGrey" fontSizes="body6" fontWeight="bold">
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
            <CustomText color="darkGrey" fontSizes="body6" fontWeight="bold">
              Üretim Tarihi:
            </CustomText>
            <CustomText color="grey" fontSizes="body6" fontWeight="light">
              {formatDate(item?.startDate || '')}
            </CustomText>
          </Row>
          <Row>
            <CustomText color="darkGrey" fontSizes="body6" fontWeight="bold">
              Son Tüketim Tarihi:
            </CustomText>
            <CustomText color="grey" fontSizes="body6" fontWeight="light">
              {formatDate(item?.expiryDate || '')}
            </CustomText>
          </Row>
        </Col>
      </Row>
    </StyledContainer>
  );
};
export default memo(AdvertListItem);
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
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
  flex: 1;
  margin-bottom: 10px;
`;
