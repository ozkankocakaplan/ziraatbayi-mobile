import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {TouchableOpacityProps} from 'react-native';
import CustomText from '../Text/Text';
import {SIZES} from '../../constant/theme';
import ProductImage from './ProductImage';

interface Product extends TouchableOpacityProps {
  image: string;
  categoryName: string;
  productName: string;
  price?: string;
}
export default function ProductCard({
  image,
  categoryName,
  productName,
  price,
  ...props
}: Product) {
  return (
    <Card {...props}>
      <ImageContainer>
        <ProductImage imageUrl={image} />
      </ImageContainer>
      <InfoContainer>
        <CustomText color="primary" fontSizes="caption2">
          {categoryName}
        </CustomText>
        <CustomText
          numberOfLines={2}
          fontSizes="body6"
          color="black"
          fontWeight="bold">
          {productName}
        </CustomText>
        {/* <Price>{price}</Price> */}
      </InfoContainer>
    </Card>
  );
}

const Card = styled(TouchableOpacity)`
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: #f9f9f9;
  width: ${SIZES.width / 3 - 20}px;
`;

const ImageContainer = styled(View)`
  width: 125px;
  height: 100px;
  padding: 8px;
`;

const InfoContainer = styled(View)`
  padding-horizontal: 10px;
  gap: 5px;
  padding-bottom: 8px;
`;

const Price = styled(Text)`
  font-size: 14px;
  color: #007bff;
`;
