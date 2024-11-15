import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: blue;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: white;
  font-size: 20px;
`;

export default function App() {
  return (
    <Container>
      <StyledText>Hello</StyledText>
    </Container>
  );
}
