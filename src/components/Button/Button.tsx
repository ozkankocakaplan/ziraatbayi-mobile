import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {SIZES} from '../../constant/theme';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import CustomText from '../Text/Text';
import useThemeColors from '../../constant/useColor';

interface OutlineButtonProps extends TouchableOpacityProps {
  icon?: IconProp;
  outline?: boolean;
  loading?: boolean;
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  size?: 'sm' | 'md';
  minWidth?: number;
  textAlign?: string;
  marginBottom?: number;
  margin?: number;
  isDisabled?: boolean;
}

export default function Button({
  icon,
  outline = false,
  loading,
  text,
  textColor,
  backgroundColor,
  borderRadius = SIZES.radius_sm,
  size = 'md',
  isDisabled = false,
  ...props
}: OutlineButtonProps) {
  const colors = useThemeColors();
  var lockPressed = false;
  return (
    <CustomButton
      style={props.style}
      onPress={event => {
        if (isDisabled) {
          return;
        }

        if (loading) {
          return true;
        }
        if (lockPressed) {
          return;
        }
        lockPressed = true;
        setTimeout(() => {
          lockPressed = false;
        }, 1000);
        props.onPress && props.onPress(event);
      }}
      activeOpacity={isDisabled ? 1 : props.activeOpacity || 0.7}
      theme={{
        size: size,
        borderRadius: borderRadius,
        borderColor:
          loading || isDisabled ? '#ddd' : backgroundColor || colors.secondary,
        backgroundColor: outline
          ? backgroundColor || colors.secondary
          : loading || isDisabled
          ? '#ddd'
          : backgroundColor || colors.primary,
        minWidth: props.minWidth,
        marginBottom: props.marginBottom,
      }}>
      {icon && <IconLeft icon={icon} color={colors.iconColor} />}
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <CustomText
          left
          fontWeight="bold"
          color={outline ? 'primary' : !isDisabled ? 'white' : 'darkGrey3'}>
          {text}
        </CustomText>
      )}
    </CustomButton>
  );
}

const IconLeft = styled(FontAwesomeIcon)`
  margin-right: 0px;
`;
const CustomButton = styled(TouchableOpacity)<{minWidth?: number}>`
  background-color: ${props => props.theme.backgroundColor};
  padding: ${props => (props.theme.size === 'sm' ? '5px' : '10px')};
  border-radius: ${props => props.theme.borderRadius}px;
  border-width: 1px;
  height: ${props => (props.theme.size === 'sm' ? '30px' : '45px')};
  border-color: ${props => props.theme.borderColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: ${props => props.theme.minWidth + 'px' || 'auto'};
  margin-bottom: ${props => props.theme.marginBottom + 'px' || 'auto'};
`;
