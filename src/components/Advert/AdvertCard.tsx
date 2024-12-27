import React, {useRef, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
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

import {formatDate} from '../../helper/Helper';
import Icon from '../Icon/Icon';
import {faCalendarCheck, faHourglass3} from '@fortawesome/free-solid-svg-icons';

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
      <ExpiryDateContainer>
        {item.startDate && (
          <DateBadge>
            <Icon icon={faCalendarCheck} size={10} />
            <CustomText
              color="darkGrey3"
              fontSizes="caption1"
              fontWeight="bold">
              {formatDate(item?.startDate || '')}
            </CustomText>
          </DateBadge>
        )}
        <DateBadge>
          <Icon icon={faHourglass3} size={10} />
          <CustomText color="darkGrey3" fontSizes="caption1" fontWeight="bold">
            {formatDate(item?.expiryDate || '')}
          </CustomText>
        </DateBadge>
      </ExpiryDateContainer>
      <ImageWrapper>
        <ImageContainer>
          <ProductImage imageUrl={item?.product?.images?.[0]?.imageUrl} />
        </ImageContainer>
      </ImageWrapper>
      <InfoContainer>
        <CustomText
          numberOfLines={2}
          ellipsizeMode="tail"
          fontSizes="body6"
          color="black"
          fontWeight="bold">
          {item?.product?.name}
        </CustomText>
        <CustomText
          color="darkGrey3"
          fontSizes="caption1"
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.dealer?.companyName}
        </CustomText>
        <CustomText
          color="primary"
          fontSizes="caption2"
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.product?.categoryName}
        </CustomText>
      </InfoContainer>
    </Card>
  );
}
const Card = styled(TouchableOpacity)`
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  justify-content: space-between;
  border-width: 1px;
  min-height: 200px;
  border-color: #f9f9f9;
  width: ${SIZES.width / 2 - (Platform.OS === 'ios' ? 20 : 0)}px;
`;

const ExpiryDateContainer = styled(View)`
  align-items: flex-end;
  padding: 5px 5px 0 5px;
`;

const ImageWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  height: 125px;
`;

const ImageContainer = styled(View)`
  width: 125px;
  height: 125px;
`;

const InfoContainer = styled(View)`
  padding-horizontal: 10px;
  gap: 5px;
  padding-bottom: 8px;
`;
const DateBadge = styled(View)`
  background-color: #f9f9f9;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
