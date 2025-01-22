import {View} from 'react-native';
import styled from 'styled-components';
export const Flex = styled(View)<{flex?: number}>`
  flex: ${({flex}) => flex || 1};
`;
export const InputContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
export const Row = styled(View)<{
  flex?: number;
  gap?: number;
  between?: boolean;
  flexEnd?: boolean;
  center?: boolean;
  alignCenter?: boolean;
  m?: number;
  mt?: number;
  mb?: number;
}>`
  flex: ${({flex}) => flex || 0};
  flex-direction: row;
  gap: ${({gap}) => gap || 0}px;
  align-items: ${({alignCenter}) => (alignCenter ? 'center' : 'flex-start')};
  justify-content: ${({between, flexEnd, center}) =>
    between
      ? 'space-between'
      : flexEnd
      ? 'flex-end'
      : center
      ? 'center'
      : 'flex-start'};
  margin: ${({m}) => m || 0}px;
  margin-top: ${({mt}) => mt || 0}px;
  margin-bottom: ${({mb}) => mb || 0}px;
`;
export const Col = styled(View)<{
  gap?: number;
  between?: boolean;
  flexEnd?: boolean;
  center?: boolean;
  alignCenter?: boolean;
  m?: number;
  mt?: number;
  mb?: number;
}>`
  flex-direction: column;
  gap: ${({gap}) => gap || 0}px;
  align-items: ${({alignCenter}) => (alignCenter ? 'center' : 'flex-start')};
  justify-content: ${({between, flexEnd, center}) =>
    between
      ? 'space-between'
      : flexEnd
      ? 'flex-end'
      : center
      ? 'center'
      : 'flex-start'};
  margin: ${({m}) => m || 0}px;
  margin-top: ${({mt}) => mt || 0}px;
  margin-bottom: ${({mb}) => mb || 0}px;
`;

export const ColTitle = styled(View)<{
  marginTop?: number;
  marginBottom?: number;
}>`
  padding-vertical: 5px;
  margin-top: ${({marginTop}) => marginTop || 10}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 5}px;
`;
export const ColBackground = styled(View)<{
  backgroundColor?: string;
  gap?: number;
}>`
  background-color: ${({backgroundColor}) => backgroundColor || 'white'};
  gap: ${({gap}) => gap || 0}px;
  border-radius: 7px;
`;
export const Center = styled(View)`
  justify-content: center;
  align-items: center;
`;
