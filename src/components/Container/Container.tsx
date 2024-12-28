import {
  View,
  ActivityIndicator,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import useThemeColors from '../../constant/useColor';
import styled from 'styled-components';

interface ContainerProps {
  children?: React.ReactNode;
  bgColor?: string;
  gap?: number;
  m?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  mx?: number;
  my?: number;
  p?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  px?: number;
  py?: number;
  flex?: number;
  isLoading?: boolean;
  borderRightColor?: string;
  borderRightWidth?: number;
  jContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  aItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  borderColor?: string;
  borderWidth?: number;
  noFlex?: boolean;
  scrollable?: boolean;
  scrollableProps?: ScrollViewProps;
}

export default function Container({
  children,
  bgColor,
  isLoading = false,
  flex = 1,
  noFlex = false,
  scrollable = false,
  ...props
}: ContainerProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        {
          backgroundColor: bgColor ? bgColor : colors.background,
        },
        noFlex ? {} : {flex: flex},
      ]}>
      <View
        style={[
          {
            margin: props.m,
            marginRight: props.mr,
            marginLeft: props.ml,
            marginTop: props.mt,
            marginBottom: props.mb,
            padding: props.p,
            paddingLeft: props.pl,
            paddingRight: props.pr,
            paddingTop: props.pt,
            paddingBottom: props.pb,
            gap: props.gap,
            marginHorizontal: props.mx,
            marginVertical: props.my,
            paddingHorizontal: props.px,
            paddingVertical: props.py,
            borderRightColor: props.borderRightColor,
            borderRightWidth: props.borderRightWidth,
            justifyContent: props.jContent,
            alignItems: props.aItems,
            borderColor: props.borderColor,
            borderWidth: props.borderWidth,
          },
          noFlex ? {} : {flex: flex},
        ]}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : scrollable ? (
          <ScrollView {...props.scrollableProps}>{children}</ScrollView>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
