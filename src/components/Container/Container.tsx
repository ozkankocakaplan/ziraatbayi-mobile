import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import useThemeColors from '../../constant/useColor';
import styled from 'styled-components';
import Header, {HeaderProps} from '../Header/Header';

interface ContainerProps extends HeaderProps {
  children?: React.ReactNode;
  type?: 'container' | 'page';
  header?: boolean;
  goBackShow?: boolean;
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
}

export default function Container({
  children,
  header,
  goBackShow = false,
  type = 'page',
  bgColor,
  isLoading = false,
  flex = 1,
  ...props
}: ContainerProps) {
  const colors = useThemeColors();

  return !header ? (
    <SafeViewContainer
      flex={flex}
      style={{
        backgroundColor: bgColor ? bgColor : colors.background,
      }}>
      {type === 'container' ? (
        <View
          style={{
            flex: flex,
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
          }}>
          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            children
          )}
        </View>
      ) : (
        children
      )}
    </SafeViewContainer>
  ) : (
    <ViewContainer
      flex={flex}
      style={{
        backgroundColor: bgColor ? bgColor : colors.background,
      }}>
      {header && <Header {...props} goBackShow={goBackShow} />}

      {type === 'container' ? (
        <View
          style={{
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
          }}></View>
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
const SafeViewContainer = styled(SafeAreaView)<{flex?: number}>`
  flex: ${props => props.flex || 1};
  background-color: ${props => props.theme.background};
`;
