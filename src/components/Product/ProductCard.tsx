import React, {useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import ProductBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CustomBottomSheet from '../BottomSheet/CustomBottomSheet';

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
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const handleCardPress = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <>
      <Card onPress={handleCardPress}>
        <ImageContainer>
          <ProductImage source={{uri: image}} resizeMode="cover" />
        </ImageContainer>
        <InfoContainer>
          <CategoryName>{categoryName}</CategoryName>
          <ProductName>{productName}</ProductName>
          <Price>{price}</Price>
        </InfoContainer>
      </Card>
    </>
  );
}

const Card = styled(TouchableOpacity)`
  margin: 10px;
  background-color: white;
  border-radius: 6px;
`;

const ImageContainer = styled(View)`
  width: 125px;
  height: 100px;
  padding: 8px;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled(View)`
  padding: 10px;
`;

const CategoryName = styled(Text)`
  font-size: 11px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

const ProductName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const Price = styled(Text)`
  font-size: 14px;
  color: #007bff;
`;
