import React from 'react';
import Page from '../components/Page/Page';
import Container from '../components/Container/Container';
import Dropdown from '../components/Dropdown/Dropdown';
import {faqItems} from '../constant/data';
import styled from 'styled-components';
import {View} from 'react-native';
import CustomText from '../components/Text/Text';
import useThemeColors from '../constant/useColor';

export default function SupportScreen() {
  const colors = useThemeColors();
  return (
    <Page header showGoBack title="Yardım ve Sıkça Sorulan Sorular">
      <Container
        scrollableProps={{showsVerticalScrollIndicator: false}}
        scrollable
        mb={20}>
        {faqItems.map((item, index) => (
          <Dropdown key={index} title={item.title}>
            {item.contentList.map((content, index) => (
              <ListItem key={index}>
                <ListBullet color={colors.primary} />
                <CustomText color="black">{content}</CustomText>
              </ListItem>
            ))}
          </Dropdown>
        ))}
      </Container>
    </Page>
  );
}
const ListItem = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-right: 15px;
`;
const ListBullet = styled(View)<{color?: string}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-top: 4px;
  margin-right: 10px;
  background-color: ${props => props.color || '#333'};
`;
