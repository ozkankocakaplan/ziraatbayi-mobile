import React, {useRef, useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {TouchableOpacityProps} from 'react-native';
import CustomText from '../Text/Text';
import {SIZES} from '../../constant/theme';
import ProductImage from './ProductImage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AdvertApi} from '../../services/advertService';
import AdvertResponse from '../../payload/response/AdvertResponse';
import {AdvertActions} from '../../store/features/advertReducer';

interface AdvertCardProps extends TouchableOpacityProps {
  item: AdvertResponse;
}
export default function AdvertCard({item, ...props}: AdvertCardProps) {
  const {advertBottomSheetRef} = useSelector(
    (state: RootState) => state.advert,
  );
  const dispatch = useDispatch();
  const [getAdvert] = AdvertApi.useGetAdvertByIdMutation();
  const openDetail = async () => {
    const response = await getAdvert(item.id).unwrap();
    if (response.isSuccessful) {
      dispatch(AdvertActions.setAdvert(response.entity));
      advertBottomSheetRef?.open();
    }
  };

  return (
    <Card
      onPress={() => {
        openDetail();
      }}>
      <ImageContainer>
        <ProductImage imageUrl={item?.product?.images?.[0]?.imageUrl} />
      </ImageContainer>
      <InfoContainer>
        <CustomText
          numberOfLines={2}
          fontSizes="body6"
          color="black"
          fontWeight="bold">
          {item?.product?.name}
        </CustomText>
        <CustomText color="darkGrey3" fontSizes="caption1">
          {item?.dealer.companyName}
        </CustomText>
        <CustomText color="primary" fontSizes="caption2">
          {item?.product?.categoryName}
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
  width: ${SIZES.width / 3 - (Platform.OS === 'ios' ? 20 : 0)}px;
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
