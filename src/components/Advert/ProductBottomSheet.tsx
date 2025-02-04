import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {RefObject, useEffect, useState} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CheckRadio from '../CheckInput/CheckRadio';
import ProductResponse from '../../payload/response/ProductResponse';
import {ProductApi} from '../../services/productService';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Col, Row} from '../../constant/GlobalStyled';
import ProductImage from './ProductImage';
import CustomText from '../Text/Text';
import useThemeColors from '../../constant/useColor';
import {SIZES, TEXT_WIDTH} from '../../constant/theme';
import Icon from '../Icon/Icon';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useKeyboard} from '../../hooks/useKeyboard';
import CustomNotFound from '../CustomNotFound/CustomNotFound';
import CustomFlatList from '../Flatlist/CustomFlatList';
import Container from '../Container/Container';
import Input from '../Input/Input';

interface ProductBottomSheetProps {
  categoryId?: number;
  bottomSheetRef: RefObject<BottomSheetRef>;
  checked?: ProductResponse;
  handleChecked: (item: ProductResponse | null) => void;
}
export default function ProductBottomSheet({
  bottomSheetRef,
  checked,
  handleChecked,
  categoryId,
}: ProductBottomSheetProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [search, setSearch] = useState('');
  const [getProductsByCategory] =
    ProductApi.useGetProductSearchByCategoryMutation();

  const getLoadCategories = async () => {
    if (
      categoryId != null &&
      categoryId != 0 &&
      search != '' &&
      search.length > 1
    ) {
      const response = await getProductsByCategory({categoryId, search});
      setProducts(response.data?.list || []);
      bottomSheetRef.current?.snapToIndex?.();
    } else {
      setProducts([]);
    }
  };
  const {keyboardShown} = useKeyboard();
  return (
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['85%']}>
      <SafeAreaView style={{flex: 1}}>
        <Container noFlex bgColor="white" mx={10} mt={35}>
          <Input
            isBottomSheetInput
            placeholder="Ürün Ara"
            value={search}
            onChangeText={text => {
              if (text.length == 0) {
                setProducts([]);
              }
              setSearch(text);
            }}
            returnKeyLabel="Ara"
            returnKeyType="search"
            onSubmitEditing={() => getLoadCategories()}
          />
        </Container>
        <Container bgColor="white" m={10}>
          <CustomFlatList
            isBottomSheet
            customNotFound={
              !keyboardShown ? (
                <CustomNotFound notFoundText="Ürün bulunamadı." />
              ) : undefined
            }
            data={keyboardShown ? [] : products}
            renderItem={item => {
              return (
                <ProductCardItem
                  key={item.id}
                  item={item}
                  checked={checked?.id == item.id}
                  handleChecked={(value: boolean) => {
                    handleChecked(value == true ? item : null);
                    value && bottomSheetRef.current?.close();
                  }}
                />
              );
            }}
          />
        </Container>
      </SafeAreaView>
    </CustomBottomSheet>
  );
}
const ProductCardItem = ({
  item,
  handleChecked,
  checked,
}: {
  item: ProductResponse;
  handleChecked: (value: boolean) => void;
  checked?: boolean;
}) => {
  const colors = useThemeColors();

  return (
    <>
      <TouchableOpacity
        onPress={() => handleChecked(!checked)}
        style={{
          borderRadius: 10,
          padding: 10,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: checked === true ? colors.primary : colors.inputBorder,
        }}>
        <Row gap={10}>
          <Row flex={0.22}>
            <View style={{height: 75, width: 75}}>
              <ProductImage imageUrl={item?.images?.[0]?.imageUrl || 'error'} />
            </View>
          </Row>
          <Row flex={0.78}>
            <Col gap={5}>
              {item?.name && (
                <CustomText
                  numberOfLines={2}
                  sx={{
                    flexWrap: 'wrap',
                    width: TEXT_WIDTH,
                  }}
                  color="black"
                  fontSizes="body4"
                  fontWeight="bold">
                  {item.name}
                </CustomText>
              )}
              {item.manufacturer.name && (
                <CustomText
                  fontSizes="body5"
                  sx={{
                    flexWrap: 'wrap',
                    width: TEXT_WIDTH,
                  }}
                  color="black">
                  {item?.manufacturer?.name}
                </CustomText>
              )}
              {item?.activeSubstance && (
                <CustomText
                  color="grey"
                  fontSizes="body6"
                  numberOfLines={2}
                  sx={{
                    flexWrap: 'wrap',
                    width: TEXT_WIDTH,
                  }}
                  ellipsizeMode="tail">
                  {item.activeSubstance}
                </CustomText>
              )}
            </Col>
          </Row>
        </Row>
        {checked && (
          <View
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 100,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon icon={faCheck} color="white" />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};
