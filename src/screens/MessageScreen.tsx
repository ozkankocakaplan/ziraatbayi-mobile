import React from 'react';
import styled from 'styled-components/native';
import {TextInput, View, Text, Image} from 'react-native';
import Page from '../components/Page/Page';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import {Row} from '../constant/GlobalStyled';

export default function MessageScreen() {
  const messages = [
    {
      id: 1,
      statusColor: '#FF6A00',
      imageUrl: 'https://via.placeholder.com/50',
      productName: 'Ürün Adı',
      seller: 'A Ziraat Bayi',
      description:
        'Lorem Ipsum is simply dummy text of the printing and type ...',
      date: '28 Ekim 2024',
    },
    {
      id: 2,
      statusColor: '#FF6A00',
      imageUrl: 'https://via.placeholder.com/50',
      productName: 'Ürün Adı',
      seller: 'A Ziraat Bayi',
      description:
        'Lorem Ipsum is simply dummy text of the printing and type ...',
      date: '28 Ekim 2024',
    },
    {
      id: 3,
      statusColor: '#FF6A00',
      imageUrl: 'https://via.placeholder.com/50',
      productName: 'Ürün Adı',
      seller: 'A Ziraat Bayi',
      description:
        'Lorem Ipsum is simply dummy text of the printing and type ...',
      date: '28 Ekim 2024',
    },
    {
      id: 4,
      statusColor: '#999999',
      imageUrl: 'https://via.placeholder.com/50',
      productName: 'Ürün Adı',
      seller: 'A Ziraat Bayi',
      description:
        'Lorem Ipsum is simply dummy text of the printing and type ...',
      date: '28 Ekim 2024',
    },
  ];

  return (
    <Page header title="Mesajlar" showGoBack>
      <Container p={10} flex={1}>
        <SearchBar placeholder="Ara" />
        {messages.map(message => (
          <MessageCard key={message.id}>
            <StatusIndicator color={message.statusColor} />
            <ImageContainer>
              <MessageImage source={{uri: message.imageUrl}} />
            </ImageContainer>
            <Container bgColor="default" flex={1}>
              <Row between>
                <CustomText fontSizes="body4" fontWeight="bold" color="deneme">
                  {message.productName}
                </CustomText>
                <CustomText fontSizes="body6" color="deneme2">
                  {message.date}
                </CustomText>
              </Row>

              <CustomText fontSizes="body5" color="deneme1">
                {message.seller}
              </CustomText>

              <CustomText fontSizes="body6" color="deneme2">
                {message.description}
              </CustomText>
            </Container>
          </MessageCard>
        ))}
      </Container>
    </Page>
  );
}
const SearchBar = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 100%;
  margin-bottom: 10px;
`;

const MessageCard = styled(View)`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ebeff3;
`;

const StatusIndicator = styled(View)<{color: string}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({color}) => color};
  margin-right: 15px;
`;

const ImageContainer = styled(View)`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 15px;
`;

const MessageImage = styled(Image)`
  width: 100%;
  height: 100%;
`;
