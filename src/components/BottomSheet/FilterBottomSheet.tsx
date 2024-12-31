import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomBottomSheet, {BottomSheetRef} from './CustomBottomSheet';
import Container from '../Container/Container';
import CustomText from '../Text/Text';
import Input from '../Input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AdvertActions} from '../../store/features/advertReducer';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import {Flex, Row} from '../../constant/GlobalStyled';
import styled from 'styled-components';
import useThemeColors from '../../constant/useColor';
import {AdvertApi} from '../../services/advertService';
import FilterRequest from '../../payload/request/FilterRequest';
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useKeyboard} from '../../hooks/useKeyboard';
import AlertDialog from '../AlertDialog/AlertDialog';

export default function FilterBottomSheet() {
  const dispatch = useDispatch();
  const {filterRequest} = useSelector((state: RootState) => state.advert);
  const filterBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const colors = useThemeColors();
  useEffect(() => {
    if (filterBottomSheetRef.current) {
      dispatch(
        AdvertActions.setFilterBottomSheetRef(filterBottomSheetRef.current),
      );
    }
  }, [filterBottomSheetRef]);
  const [getAdvertsFiltered] = AdvertApi.useGetAdvertsFilteredMutation();

  const filterApply = async () => {
    dispatch(AdvertActions.setIsFiltered(true));
    const {data} = await getAdvertsFiltered(filterRequest);
    if ((data?.count || 0) > 0) {
      dispatch(AdvertActions.setFilteredAdverts(data?.list));
    }
    filterBottomSheetRef.current?.close();
  };
  const filterCancel = () => {
    dispatch(AdvertActions.setIsFiltered(false));
    dispatch(AdvertActions.resetFilterRequest());
  };

  return (
    <CustomBottomSheet
      indicator={false}
      ref={filterBottomSheetRef}
      snapPoints={[Platform.OS === 'ios' ? '45%' : '60%']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
        behavior={'padding'}>
        <Container bgColor="white" mx={15} gap={5}>
          <View style={{marginBottom: 10, alignItems: 'center'}}>
            <CustomText color="darkGrey2" fontWeight="bold" fontSizes="body2">
              Filtrele
            </CustomText>
          </View>
          <BottomSheetScrollView contentContainerStyle={{gap: 10}}>
            <Input
              isBottomSheetInput
              style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
              enableFocusBorder={false}
              inputSize="sm"
              title="Üretici Firma"
              value={filterRequest.manufacturer}
              onBlur={() => {
                filterBottomSheetRef.current?.snapToIndex?.();
              }}
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
              isBottomSheetInput
              style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
              enableFocusBorder={false}
              inputSize="sm"
              title="Ürün Adı"
              onBlur={() => {
                filterBottomSheetRef.current?.snapToIndex?.();
              }}
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
              isBottomSheetInput
              style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
              enableFocusBorder={false}
              inputSize="sm"
              onBlur={() => {
                filterBottomSheetRef.current?.snapToIndex?.();
              }}
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
          </BottomSheetScrollView>
        </Container>
        <Container mx={15} my={15} bgColor="white" noFlex>
          <Row gap={5}>
            <Flex flex={0.5}>
              <Button
                onPress={filterCancel}
                borderRadius={100}
                text="Temizle"></Button>
            </Flex>
            <Flex>
              <Button
                onPress={filterApply}
                borderRadius={100}
                text="Uygula "></Button>
            </Flex>
          </Row>
        </Container>
      </KeyboardAvoidingView>
    </CustomBottomSheet>
  );
}
