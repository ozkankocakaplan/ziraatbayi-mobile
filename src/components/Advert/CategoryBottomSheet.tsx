import {View, Text, ScrollView} from 'react-native';
import React, {RefObject, useEffect, useState} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CheckRadio from '../CheckInput/CheckRadio';
import CategoryResponse from '../../payload/response/CategoryResponse';
import {CategoryApi} from '../../services/categoryService';

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
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
      <ScrollView contentContainerStyle={{margin: 10}}>
        {categories.map((item: CategoryResponse) => {
          return (
            <CheckRadio
              key={item.id}
              value={item.name}
              checked={checked?.id === item.id}
              handleChecked={(isCheck: boolean) => {
                handleChecked(isCheck ? item : null);
                isCheck && bottomSheetRef.current?.close();
              }}
            />
          );
        })}
      </ScrollView>
    </CustomBottomSheet>
  );
}
