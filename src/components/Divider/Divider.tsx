import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';

export default function Divider({
  color,
  marginTop,
  marginBottom,
  text,
}: {
  color?: string;
  marginTop?: string;
  marginBottom?: string;
  text?: string;
}) {
  return (
    <Div
      theme={{
        colors: color || '#D2DDEB',
        marginTop: marginTop || '0',
        marginBottom: marginBottom || '0',
      }}>
      {text && <DividerText>{text}</DividerText>}
    </Div>
  );
}
const Div = styled(View)`
  height: 1px;
  margin-top: ${props => props.theme.marginTop}px;
  margin-bottom: ${props => props.theme.marginBottom}px;
  background-color: ${props => props.theme.colors};
`;
const DividerText = styled(Text)`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  position: absolute;
  top: -10px;
  background-color: #fff;
  padding: 0 10px;
  left: 50%;
  margin-left: -40px;
  width: 90px;
`;
