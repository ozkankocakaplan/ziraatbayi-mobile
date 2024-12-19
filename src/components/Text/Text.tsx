import {View, Text, TextProps, StyleProp, TextStyle} from 'react-native';
import {COLORS, FONTSIZES} from '../../constant/theme';
import {ColorType, FontSizeType, FontWeightType} from '../../types/type';
import useThemeColors from '../../constant/useColor';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  fontSizes?: FontSizeType;
  description?: boolean;
  color?: ColorType;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  sx?: StyleProp<TextStyle>;
  fontWeight?: FontWeightType;
}
export default function CustomText(props: CustomTextProps) {
  const colors = useThemeColors();
  return (
    <Text
      style={[
        props.sx,
        {
          textAlign: props.center ? 'center' : props.left ? 'left' : 'left',
          color: props.color
            ? props.color.includes('#')
              ? props.color
              : COLORS[props.color]
            : colors.text,
          fontSize: props.fontSizes
            ? FONTSIZES[props.fontSizes]
            : FONTSIZES.default,
          fontWeight: props.fontWeight ?? 'normal',
        },
      ]}
      {...props}>
      {props.children}
    </Text>
  );
}
