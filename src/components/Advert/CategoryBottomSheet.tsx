import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {RefObject, useEffect, useState} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CheckRadio from '../CheckInput/CheckRadio';
import CategoryResponse from '../../payload/response/CategoryResponse';
import {CategoryApi} from '../../services/categoryService';
import useThemeColors from '../../constant/useColor';
import {SIZES} from '../../constant/theme';
import {Col, Row} from '../../constant/GlobalStyled';
import ProductImage from './ProductImage';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import ProductResponse from '../../payload/response/ProductResponse';
import CustomFlatList from '../Flatlist/CustomFlatList';

interface CategoryBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheetRef>;
  checked?: CategoryResponse;
  handleChecked: (item: CategoryResponse | null) => void;
}
export default function CategoryBottomSheet({
  bottomSheetRef,
  checked,
  handleChecked,
}: CategoryBottomSheetProps) {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const {data} = CategoryApi.useGetCategoriesLeavesQuery();

  useEffect(() => {
    if (data) {
      setCategories(data.list);
    }
  }, [data]);

  return (
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['85%']}>
      <View style={{margin: 10}}>
        <CustomFlatList
          data={categories}
          renderItem={item => {
            return (
              <CategoryCardItem
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
      </View>
    </CustomBottomSheet>
  );
}
const CategoryCardItem = ({
  item,
  handleChecked,
  checked,
}: {
  item: CategoryResponse;
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
        {item?.name && (
          <CustomText sx={{width: textWidth}} color="black">
            {item.name}
          </CustomText>
        )}
      </Row>
      {checked && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 5,
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
