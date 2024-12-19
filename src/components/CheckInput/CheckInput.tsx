import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import CustomText from '../Text/Text';

interface CheckInputProps extends TouchableOpacityProps {
  value?: boolean;
  label?: string;
  clickLabel?: () => void;
  clickedLabel?: string;
  errorMessage?: string;
  type?: 'checkbox';
  bgColor?: string;
  fontWeight?: 'bold' | 'normal';
}
export default function CheckInput({
  value = false,
  label,
  clickLabel,
  clickedLabel,
  errorMessage,
  type = 'checkbox',
  ...props
}: CheckInputProps) {
  const colors = useThemeColors();

  const RenderLabel = () => {
    let added = false;
    if (clickLabel && clickedLabel) {
      let findIndex = FindLabelByIndex();
      let words = label?.split(' ');
      return (
        <Label>
          {words
            ?.filter((c, i) => {
              if (findIndex.length === 1 && i === findIndex[0]) {
                return c;
              } else if (
                findIndex.length > 1 &&
                findIndex.includes(i) &&
                i !== findIndex[0]
              ) {
                return false;
              }
              return c;
            })
            .map((item, index) => {
              if (findIndex.includes(index) && !added) {
                added = true;
                return (
                  <TouchableOpacity
                    onPress={clickLabel}
                    key={index}
                    style={{backgroundColor: 'transparent'}}>
                    <Label key={index} style={{color: colors.primary}}>
                      {ConvertLabelByIndex() + ' '}
                    </Label>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity activeOpacity={1} key={index}>
                  <Label>{item} </Label>
                </TouchableOpacity>
              );
            })}
        </Label>
      );
    }
    return (
      <Pressable hitSlop={15} onPress={clickLabel}>
        <Label fontWeight={props.fontWeight}>{label}</Label>
      </Pressable>
    );
  };

  const FindLabelByIndex = () => {
    let wordIndexs: number[] = [];
    label?.split(' ').map((item, index) => {
      if (clickedLabel?.includes(item)) {
        wordIndexs.push(index);
      }
    });
    return wordIndexs;
  };
  const ConvertLabelByIndex = () => {
    let newWord = '';
    label?.split(' ').map((item, index) => {
      if (clickedLabel?.includes(item)) {
        if (index === 0) newWord += item;
        else newWord += ' ' + item;
      }
    });
    return newWord;
  };

  return (
    <View>
      <Container>
        <InputContainer bgColor={props.bgColor} {...props} activeOpacity={0.7}>
          {value ? (
            <FontAwesomeIcon
              color={colors.iconColor}
              size={20}
              icon={faCheck}
            />
          ) : null}
        </InputContainer>
        <View
          style={{marginTop: Platform.OS === 'ios' ? 4 : 0, marginRight: 20}}>
          <RenderLabel />
        </View>
      </Container>
      {errorMessage && (
        <CustomText style={{color: colors.error, marginTop: 5}}>
          {errorMessage}
        </CustomText>
      )}
    </View>
  );
}
const InputContainer = styled(TouchableOpacity)<{bgColor?: string}>`
  padding: 15px;
  max-width: 30px;
  max-height: 30px;
  border-radius: 5px;
  background-color: ${props => props.bgColor || '#f5f5f5'};
  align-items: center;
  justify-content: center;
`;
const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const Label = styled(Text)<{fontWeight?: 'bold' | 'normal'}>`
  font-size: 13px;
  font-weight: ${props => props.fontWeight || '400'};
  color: #444;
`;
