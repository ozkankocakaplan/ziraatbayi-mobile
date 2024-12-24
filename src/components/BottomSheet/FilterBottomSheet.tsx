import {View, Text, TouchableOpacity} from 'react-native';
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

export default function FilterBottomSheet() {
  const dispatch = useDispatch();
  const [filterRequest, setFilterRequest] = useState({
    product: '',
    activeSubstance: '',
    manufacturer: '',
  } as FilterRequest);
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
  };
  return (
    <CustomBottomSheet
      indicator={false}
      ref={filterBottomSheetRef}
      snapPoints={['45%']}>
      <Container bgColor="white" mx={15} gap={5}>
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <CustomText color="darkGrey2" fontWeight="bold" fontSizes="body2">
            Filtrele
          </CustomText>
        </View>

        <Input
          style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
          enableFocusBorder={false}
          inputSize="sm"
          title="Üretici Firma"
          onChangeValue={val =>
            setFilterRequest({...filterRequest, manufacturer: val})
          }
          placeholder="Üretici adı yazınız."
        />

        <Input
          style={{backgroundColor: colors.lightGrey, marginBottom: 10}}
          enableFocusBorder={false}
          inputSize="sm"
          title="Ürün Adı"
          value={filterRequest.product}
          onChangeValue={val =>
            setFilterRequest({...filterRequest, product: val})
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
          onChangeValue={val =>
            setFilterRequest({...filterRequest, activeSubstance: val})
          }
        />
        <FilterContainer>
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
        </FilterContainer>
      </Container>
    </CustomBottomSheet>
  );
}
const FilterContainer = styled(View)`
  gap: 10px;
  flex-direction: row;
  margin-bottom: 10px;
`;
