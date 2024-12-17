import {ScrollView} from 'react-native';
import React, {RefObject, useEffect, useState} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CheckRadio from '../CheckInput/CheckRadio';
import ProductResponse from '../../payload/response/ProductResponse';
import {ProductApi} from '../../services/productService';

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
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
      <ScrollView contentContainerStyle={{margin: 10}}>
        {products?.map?.((item: ProductResponse) => {
          return (
            <CheckRadio
              key={item.id}
              value={item.name}
              checked={checked?.id == item.id}
              handleChecked={(isCheck: boolean) => {
                handleChecked(isCheck == true ? item : null);
                isCheck && bottomSheetRef.current?.close();
              }}
            />
          );
        })}
      </ScrollView>
    </CustomBottomSheet>
  );
}
