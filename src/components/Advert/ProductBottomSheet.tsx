import {View, Text, ScrollView} from 'react-native';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import Input from '../Input/Input';
import styled from 'styled-components';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CheckRadio from '../CheckInput/CheckRadio';
import ProductResponse from '../../payload/response/ProductResponse';

const family = [] as ProductResponse[];
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
  //products state
  useEffect(() => {
    if (categoryId != null && categoryId != 0) {
      //istek
    }
  }, [categoryId]);

  return (
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
      <ScrollView contentContainerStyle={{margin: 10}}>
        {family.map((item, index) => {
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
