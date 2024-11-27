import React from 'react';
import {Dimensions} from 'react-native';
import {Row, ColBackground} from '../constant/GlobalStyled';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';

const {width, height} = Dimensions.get('window');

export default function CategoriesScreen() {
  const CustomCategories = () => {
    const columnHeight = height * 0.8;
    const firstColumnWidth = width * 0.4;
    const secondColumnWidth = width * 0.6;

    return (
      <Row gap={10}>
        <ColBackground
          backgroundColor="lightblue"
          style={{
            width: firstColumnWidth,
            height: columnHeight,
          }}>
          <Button textAlign="left" text="kategori"></Button>
        </ColBackground>

        <ColBackground
          backgroundColor="lightgreen"
          style={{
            width: secondColumnWidth,
            height: columnHeight,
          }}>
          <Button textAlign="left" text="kategori1"></Button>
        </ColBackground>
      </Row>
    );
  };

  return (
    <Container header goBackShow>
      <Container type="container" children={CustomCategories()}></Container>
    </Container>
  );
}
