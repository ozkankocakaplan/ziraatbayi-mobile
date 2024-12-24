import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface CustomListProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
  numColumns?: number;
  data?: any[];
  listFilter?: (entity: any, search: string) => Boolean;
  listSort?: (a: any, b: any) => number;
  handleRefresh?: () => void;
  isSearchable?: boolean;
  searchStyle?: StyleProp<ViewStyle>;
  searchPlaceholder?: string;
  isBottomSheet?: boolean;
  renderItem: (item: any, index: number) => JSX.Element;
  notFoundText?: string;
  customNotFound?: JSX.Element;
  extraData?: React.ReactNode;
  children?: React.ReactNode;
}
export default CustomListProps;
