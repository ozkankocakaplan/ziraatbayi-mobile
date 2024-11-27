import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import useThemeColors from '../../constant/useColor';
import styled from 'styled-components';
import Header, {HeaderProps} from '../Header/Header';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../BottomSheet/CustomBottomSheet';
import {useRef} from 'react';
import Button from '../Button/Button';

interface PageProps extends HeaderProps {
  children?: React.ReactNode;
  header?: boolean;
  goBackShow?: boolean;
  bgColor?: string;

  flex?: number;
  isLoading?: boolean;
}

export default function Page({
  children,
  header,
  goBackShow = false,
  bgColor,
  isLoading = false,
  flex = 1,
  ...props
}: PageProps) {
  const colors = useThemeColors();

  return (
    <ViewContainer
      flex={flex}
      style={{
        backgroundColor: bgColor ? bgColor : colors.background,
      }}>
      {header && <Header {...props} goBackShow={goBackShow} />}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        children
      )}
    </ViewContainer>
  );
}
const ViewContainer = styled(View)<{flex?: number}>`
  flex: ${props => props.flex || 1};
  background-color: ${props => props.theme.background};
`;
