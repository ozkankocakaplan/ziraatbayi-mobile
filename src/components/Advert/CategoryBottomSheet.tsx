import {View, Text, ScrollView} from 'react-native';
import React, {RefObject, useRef, useState} from 'react';
import Input from '../Input/Input';
import styled from 'styled-components';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import CheckRadio from '../CheckInput/CheckRadio';
import CategoryResponse from '../../payload/response/CategoryResponse';

const family = [] as CategoryResponse[];
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
  return (
    <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
      <ScrollView contentContainerStyle={{margin: 10}}>
        {family.map((item, index) => {
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
