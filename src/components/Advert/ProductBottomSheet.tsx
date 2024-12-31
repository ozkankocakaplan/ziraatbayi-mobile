import {ScrollView, TouchableOpacity, View} from 'react-native';
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
import {SIZES} from '../../constant/theme';
import Icon from '../Icon/Icon';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useKeyboard} from '../../hooks/useKeyboard';

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

  const [getProductsByCategory] = ProductApi.useGetProductsByCategoryMutation();

  useEffect(() => {
    getLoadCategories();
  }, [categoryId]);
  const getLoadCategories = async () => {
    if (categoryId != null && categoryId != 0) {
      const response = await getProductsByCategory(categoryId);
      setProducts(response.data?.list || []);
    }
  };
  return (
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['85%']}>
      <BottomSheetScrollView contentContainerStyle={{margin: 10}}>
        {products?.map?.((item: ProductResponse) => {
          return (
            <ProductCardItem
              item={item}
              checked={checked?.id == item.id}
              handleChecked={(value: boolean) => {
                handleChecked(value == true ? item : null);
                value && bottomSheetRef.current?.close();
              }}
            />
          );
        })}
      </BottomSheetScrollView>
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
  console.log(item);
  const colors = useThemeColors();
  const textWidth = SIZES.width - 100;
  return (
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
        <Row>
          <View style={{height: 75, width: 75}}>
            <ProductImage imageUrl={item?.images?.[0].imageUrl || 'error'} />
          </View>
        </Row>
        <Row>
          <Col>
            {item?.name && (
              <CustomText sx={{width: textWidth}} color="black">
                {item.name}
              </CustomText>
            )}
            {item?.activeSubstance && (
              <CustomText sx={{width: textWidth}} color="black">
                {item.activeSubstance}
              </CustomText>
            )}
            {item.manufacturer.name && (
              <CustomText sx={{width: textWidth}} color="black">
                {item?.manufacturer?.name}
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
  );
};
