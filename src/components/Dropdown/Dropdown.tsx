import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
interface DropdownProps {
  children?: React.ReactNode;
  title?: string;
}
export default function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <DropDownWrapper activeOpacity={0.7} onPress={() => setIsOpen(!isOpen)}>
        <CustomText color="black">{props.title}</CustomText>
        <Icon icon={isOpen ? faAngleUp : faAngleDown} />
      </DropDownWrapper>
      {isOpen && (
        <DropDownContent>
          {props.children || (
            <CustomText color="black">
              Bu konuda henüz bir içerik bulunmamaktadır.
            </CustomText>
          )}
        </DropDownContent>
      )}
    </>
  );
}
const DropDownWrapper = styled(TouchableOpacity)`
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
  width: 100%;
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const DropDownContent = styled(View)`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  background-color: #f0f0f0;
`;
