import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import MessageResponse from '../../payload/response/MessageResponse';
import styled from 'styled-components';
import {Image} from 'react-native';
import ProductImage from '../../components/Advert/ProductImage';
import Container from '../../components/Container/Container';
import {Col, Flex, Row} from '../../constant/GlobalStyled';
import CustomText from '../../components/Text/Text';
import dayjs from 'dayjs';

const MessageItem = ({
  message,
  handlePress,
  isCurrentUser,
}: {
  message: MessageResponse;
  handlePress: () => void;
  isCurrentUser?: boolean;
}) => {
  return (
    <MessageCard onPress={handlePress} activeOpacity={0.7} key={message.chatId}>
      {!message?.lastMessage?.isRead && !isCurrentUser && (
        <StatusIndicator color={'#FF6A00'} />
      )}
      <ImageContainer>
        <ProductImage imageUrl={message?.product?.images?.[0]?.imageUrl} />
      </ImageContainer>
      <Container bgColor="default" flex={1}>
        <Col gap={5}>
          <Row between>
            <Flex>
              <CustomText fontSizes="body4" fontWeight="bold" color="deneme">
                {message?.product?.name}
              </CustomText>
            </Flex>
            <CustomText fontSizes="body6" color="deneme2">
              {message?.lastMessage?.timestamp
                ? dayjs(message?.lastMessage.timestamp).format(
                    'DD.MM.YYYY HH:mm',
                  )
                : ''}
            </CustomText>
          </Row>
          <Col gap={5}>
            <CustomText fontSizes="body6" color="deneme2">
              {message.senderFullName}
            </CustomText>
            <CustomText fontSizes="body6" color="deneme2">
              {message.contentType === 'text'
                ? message.lastMessage.content
                : 'Bir resim gönderildi'}
            </CustomText>
          </Col>
        </Col>
      </Container>
    </MessageCard>
  );
};
export default memo(MessageItem);
const MessageCard = styled(TouchableOpacity)`
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
