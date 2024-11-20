import React from 'react';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components';

interface Product {
  image: string;
  categoryName: string;
  productName: string;
  price: string;
}
export default function ProductCard({
  image,
  categoryName,
  productName,
  price,
}: Product) {
  return (
    <Card>
      <ImageContainer>
        <ProductImage source={{uri: image}} resizeMode="cover" />
      </ImageContainer>
      <InfoContainer>
        <CategoryName>{categoryName}</CategoryName>
        <ProductName>{productName}</ProductName>
        <Price>{price}</Price>
      </InfoContainer>
    </Card>
  );
}

const Card = styled(View)`
  width: 130px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
`;

const ImageContainer = styled(View)`
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled(View)`
  padding: 10px;
`;

const CategoryName = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;

const ProductName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Price = styled(Text)`
  font-size: 14px;
  color: #007bff;
`;
