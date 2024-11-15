import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface FormContainerProps {
  children: ReactNode;
  gap?: number;
}

export default function FormKeyboardView(props: FormContainerProps) {
  return (
    <KeyboardAwareScrollView
      extraHeight={100}
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1, gap: props.gap}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {props.children}
    </KeyboardAwareScrollView>
  );
}
