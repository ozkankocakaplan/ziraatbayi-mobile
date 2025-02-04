import {View, TextInput, TouchableOpacity, Platform} from 'react-native';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import useThemeColors from '../../constant/useColor';
import {useState} from 'react';
import CustomText from '../Text/Text';
import CurrencyInput from 'react-native-currency-input';
import {FormInputProps} from 'react-native-form-container';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

export default function Input({
  iconPosition = 'left',
  icon = undefined,
  inputSize = 'md',
  enableFocusBorder = true,
  errorMessage,
  required = false,

  ...props
}: FormInputProps & {
  priceInput?: boolean;
  onChangeValue?: (value: any) => void;
  isPlaceholder?: boolean;
  placeholderValue?: string;
  handlePress?: () => void;
  color?: string;
  title?: string;
  editable?: boolean;
  isBottomSheetInput?: boolean;
}) {
  const colors = useThemeColors();
  const [passwordShow, setPasswordShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (enableFocusBorder) {
      setIsFocused(true);
    }
  };
  const handleBlur = () => {
    if (enableFocusBorder) {
      setIsFocused(false);
    }
  };
  let size = inputSize === 'sm' ? '10px' : '15px';
  let iconSize = inputSize === 'sm' ? 17 : 20;

  let iconSmTop =
    inputSize === 'sm' ? (Platform.OS === 'ios' ? '14px' : '15px') : '20px';
  let iconMdTop = inputSize === 'md' ? '15px' : '20px';
  let iconTop = inputSize === 'sm' ? iconSmTop : iconMdTop;

  let inputPaddingHorizontal = inputSize === 'sm' ? '33px' : '40px';
  return (
    <View>
      {props.title && (
        <View style={{marginBottom: 5}}>
          <CustomText color="inputPlaceholder" fontWeight="bold">
            {props.title}
          </CustomText>
        </View>
      )}
      {iconPosition === 'left' && icon && (
        <IconLeft
          theme={{
            iconTop: iconTop,
          }}
          icon={icon}
          size={iconSize}
          color={colors.iconColor}
        />
      )}

      {props.priceInput && !props.isPlaceholder ? (
        <PriceInput
          autoFocus={false}
          placeholderTextColor={colors.inputPlaceholder}
          {...(props as any)}
          onFocus={event => {
            handleFocus();
            props.onFocus && props.onFocus(event);
          }}
          onBlur={event => {
            handleBlur();
            props.onBlur && props.onBlur(event);
          }}
          theme={{
            size: inputSize === 'sm' ? '10px' : Platform.OS === 'android' ? '10px' : '15px',
            left: iconPosition === 'left' && icon !== undefined ? inputPaddingHorizontal : size,
            right: iconPosition === 'right' && icon !== undefined ? inputPaddingHorizontal : size,
            borderColor: isFocused ? colors.activeBorder : colors.inputBorder,
            backgroundColor: props.editable === false ? '#ddd' : '#fff',
            color: props.editable === false ? '#999' : '#143722'
          }}
        />
      ) : !props.isPlaceholder ? (
        props.isBottomSheetInput ? (
          <CustomBottomSheetInput
            autoFocus={false}
            placeholderTextColor={colors.inputPlaceholder}
            {...props}
            secureTextEntry={props.secureTextEntry && !passwordShow}
            onFocus={event => {
              handleFocus();
              props.onFocus && props.onFocus(event);
            }}
            onBlur={event => {
              handleBlur();
              props.onBlur && props.onBlur(event);
            }}
            theme={{
              size: inputSize === 'sm' ? '10px' : Platform.OS === 'android' ? '10px' : '15px',
              left: iconPosition === 'left' && icon !== undefined ? inputPaddingHorizontal : size,
              right: iconPosition === 'right' && icon !== undefined ? inputPaddingHorizontal : size,
              borderColor: isFocused ? colors.activeBorder : colors.inputBorder,
              backgroundColor: props.editable === false ? '#ddd' : '#fff',
              color: props.editable === false ? '#999' : '#143722'
            }}
          />
        ) : (
          <CustomInput
            autoFocus={false}
            placeholderTextColor={colors.inputPlaceholder}
            {...props}
            secureTextEntry={props.secureTextEntry && !passwordShow}
            onFocus={event => {
              handleFocus();
              props.onFocus && props.onFocus(event);
            }}
            onBlur={event => {
              handleBlur();
              props.onBlur && props.onBlur(event);
            }}
            theme={{
              size: inputSize === 'sm' ? '10px' : Platform.OS === 'android' ? '10px' : '15px',
              left: iconPosition === 'left' && icon !== undefined ? inputPaddingHorizontal : size,
              right: iconPosition === 'right' && icon !== undefined ? inputPaddingHorizontal : size,
              borderColor: isFocused ? colors.activeBorder : colors.inputBorder,
              backgroundColor: props.editable === false ? '#ddd' : '#fff',
              color: props.editable === false ? '#999' : '#143722'
            }}
          />
        )
      ) : (
        <CustomPlaceholder
          onPress={e => {
            if (props?.handlePress) {
              props.handlePress();
            }
          }}
          theme={{
            size: inputSize === 'sm' ? '10px' : Platform.OS === 'android' ? '10px' : '15px',
            left: iconPosition === 'left' && icon !== undefined ? inputPaddingHorizontal : size,
            right: iconPosition === 'right' && icon !== undefined ? inputPaddingHorizontal : size,
            borderColor: isFocused ? colors.activeBorder : colors.inputBorder,
            backgroundColor: props.editable === false ? '#ddd' : '#fff',
            color: props.editable === false ? '#999' : '#143722'
          }}>
          <CustomText
            numberOfLines={1}
            sx={{top: Platform.OS === 'ios' ? 0 : 3}}
            fontWeight="normal"
            color={props.color as any}>
            {props.placeholderValue || 'Seçiniz'}
          </CustomText>
        </CustomPlaceholder>
      )}

      {props.secureTextEntry && (
        <PasswordIconButton
          theme={{
            iconTop: iconTop,
          }}
          onPress={() => setPasswordShow(!passwordShow)}>
          <FontAwesomeIcon
            icon={passwordShow ? faEye : faEyeSlash}
            size={iconSize}
            color={colors.iconColor}
          />
        </PasswordIconButton>
      )}

      {iconPosition === 'right' && icon !== undefined && (
        <IconRight
          theme={{
            iconTop: iconTop,
          }}
          icon={icon}
          size={iconSize}
          color={colors.iconColor}
        />
      )}
      {errorMessage && (
        <CustomText style={{color: colors.error, marginTop: 5}}>
          {errorMessage}
        </CustomText>
      )}
    </View>
  );
}
const CustomInput = styled(TextInput)`
  padding: ${props => props.theme.size} ${props => props.theme.right}
    ${props => props.theme.size} ${props => props.theme.left};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  border: 1px solid ${props => props.theme.borderColor};
`;
const CustomBottomSheetInput = styled(BottomSheetTextInput)`
  padding: ${props => props.theme.size} ${props => props.theme.right}
    ${props => props.theme.size} ${props => props.theme.left};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  border: 1px solid ${props => props.theme.borderColor};
`;
const CustomPlaceholder = styled(TouchableOpacity)`
  padding: ${props => props.theme.size} ${props => props.theme.right}
    ${props => props.theme.size} ${props => props.theme.left};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  border: 1px solid ${props => props.theme.borderColor};
`;
const PriceInput = styled(CurrencyInput)`
  padding: ${props => props.theme.size} ${props => props.theme.right}
    ${props => props.theme.size} ${props => props.theme.left};
  width: 100%;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  height: 50px;
  border: 1px solid ${props => props.theme.borderColor};
`;
const IconLeft = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${props => props.theme.iconTop};
  left: 10px;
  z-index: 1;
`;
const IconRight = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${props => props.theme.iconTop};
  right: 10px;
  z-index: 1;
`;
const PasswordIconButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${props => props.theme.iconTop};
  right: 10px;
  z-index: 1;
`;
