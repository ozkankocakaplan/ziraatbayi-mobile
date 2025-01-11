import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import Input from '../components/Input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {AdvertActions} from '../store/features/advertReducer';
import Button from '../components/Button/Button';
import {Flex, Row} from '../constant/GlobalStyled';

import useThemeColors from '../constant/useColor';
import {AdvertApi} from '../services/advertService';
import {TouchableOpacity} from 'react-native';
import Icon from '../components/Icon/Icon';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {checkObject} from '../helper/Helper';

const MarginBottom = Platform.select({ios: 50, android: 20});

export default function HomeFilterScreen({navigation}: any) {
  const dispatch = useDispatch();
  const {filterRequest, isFiltered} = useSelector(
    (state: RootState) => state.advert,
  );

  const colors = useThemeColors();

  const [getAdvertsFiltered] = AdvertApi.useGetAdvertsFilteredMutation();

  const filterApply = async () => {
    const {data} = await getAdvertsFiltered(filterRequest);
    if ((data?.count || 0) > 0) {
      dispatch(AdvertActions.setFilteredAdverts(data?.list));
    } else {
      dispatch(AdvertActions.setFilteredAdverts([]));
    }
    dispatch(AdvertActions.setIsFiltered(true));
    navigation.goBack();
  };
  const filterCancel = () => {
    dispatch(AdvertActions.resetFilterRequest());
  };
  const checkValue = () => {
    if (
      filterRequest.manufacturer.length > 1 ||
      filterRequest.product.length > 1 ||
      filterRequest.activeSubstance.length > 1
    ) {
      return false;
    }
    return true;
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 50}
      behavior={'padding'}>
      <Container bgColor="white" mx={15} mt={10} gap={10}>
        <Container bgColor="transparent" aItems="center" my={10} noFlex>
          <CustomText color="darkGrey2" fontWeight="bold" fontSizes="body2">
            Filtrele
          </CustomText>
          <FilterCloseButton
            hitSlop={15}
            onPress={() => {
              filterCancel();
              navigation.goBack();
            }}>
            <Icon icon={faClose} size={20} />
          </FilterCloseButton>
        </Container>

        <Input
          style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
          enableFocusBorder={false}
          inputSize="sm"
          title="Üretici Firma"
          value={filterRequest.manufacturer}
          onChangeText={val =>
            dispatch(
              AdvertActions.handleChangeFilterRequest({
                key: 'manufacturer',
                value: val,
              }),
            )
          }
          placeholder="Üretici adı yazınız."
        />
        <Input
          style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
          enableFocusBorder={false}
          inputSize="sm"
          title="Ürün Adı"
          value={filterRequest.product}
          onChangeText={val =>
            dispatch(
              AdvertActions.handleChangeFilterRequest({
                key: 'product',
                value: val,
              }),
            )
          }
          placeholder="Ürün adı yazınız."
        />
        <Input
          style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
          enableFocusBorder={false}
          inputSize="sm"
          title="Etken Madde"
          placeholder="Etken madde yazınız."
          value={filterRequest.activeSubstance}
          onChangeText={val =>
            dispatch(
              AdvertActions.handleChangeFilterRequest({
                key: 'activeSubstance',
                value: val,
              }),
            )
          }
        />
      </Container>

      <Container mx={15} bgColor="white" mb={MarginBottom} noFlex>
        <Row gap={5}>
          {isFiltered && (
            <Flex flex={0.5}>
              <Button
                onPress={filterCancel}
                borderRadius={100}
                text="Temizle"></Button>
            </Flex>
          )}
          <Flex>
            <Button
              isDisabled={checkValue()}
              onPress={filterApply}
              borderRadius={100}
              text="Uygula "></Button>
          </Flex>
        </Row>
      </Container>
    </KeyboardAvoidingView>
  );
}
const FilterCloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 7px;
`;
