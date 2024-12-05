import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';
interface CheckRadioProps {
  value?: string;
  checked?: boolean;
  handleChecked: (isCheck: boolean) => void;
}
export default function CheckRadio(props: CheckRadioProps) {
  const [isChecked, setIsChecked] = React.useState<boolean>(
    props.checked || false,
  );
  return (
    <StyledButton
      activeOpacity={0.7}
      onPress={() => {
        props.handleChecked(!isChecked);
        setIsChecked(!isChecked);
      }}>
      <View
        style={{
          height: 30,
          width: 30,
          borderWidth: 2,
          borderColor: '#1F8505',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: isChecked ? '#1F8505' : 'transparent',
            borderRadius: 100,
          }}></View>
      </View>
      <StyledText>{props.value}</StyledText>
    </StyledButton>
  );
}

const StyledButton = styled(TouchableOpacity)`
  width: 100%;
  gap: 10px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  height: 50px;
  border: 1px solid grey;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  color: black;
`;
