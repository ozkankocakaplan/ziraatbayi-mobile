import React from 'react';
import styled from 'styled-components/native';
import {
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Page from '../components/Page/Page';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import {Col, Flex, Row} from '../constant/GlobalStyled';
import useChatList from '../hooks/useChatList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import MessageResponse from '../payload/response/MessageResponse';
import {RootState} from '../store';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Loading from '../components/Loading/Loading';
export default function MessageScreen(
  props: NativeStackScreenProps<RootStackParamList, 'MessageScreen'>,
) {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const {navigation} = props;
  const {chats, loading} = useChatList();
  const handleChatPress = (item: MessageResponse) => {
    let isCurrentUser = item.senderId === userId;
    navigation.navigate('ChatRoomScreen', {
      chatId: item.chatId,
      receiverFullName: isCurrentUser
        ? item.receiverFullName
        : item.senderFullName,
      senderFullName: isCurrentUser
        ? item.senderFullName
        : item.receiverFullName,
      senderId: Number(userId),
      receiverId: isCurrentUser ? item.receiverId : item.senderId,
      product: {} as any,
    });
  };
  return (
    <Page header title="Mesajlar" showGoBack>
      <Container p={10} flex={1}>
        <Loading loading={loading}>
          <SearchBar placeholder="Ara" />
          <FlatList
            data={chats}
            keyExtractor={(item: MessageResponse) => item.chatId}
            renderItem={({item}) => {
              var isCurrentUser = item.senderId === userId;
              return (
                <MessageItem
                  handlePress={() => {
                    handleChatPress(item);
                  }}
                  message={{
                    ...item,
                    senderFullName: isCurrentUser
                      ? item.receiverFullName
                      : item.senderFullName,
                    receiverFullName: isCurrentUser
                      ? item.senderFullName
                      : item.receiverFullName,
                  }}
                />
              );
            }}
          />
        </Loading>
      </Container>
    </Page>
  );
}

const MessageItem = ({
  message,
  handlePress,
}: {
  message: MessageResponse;
  handlePress: () => void;
}) => {
  return (
    <MessageCard onPress={handlePress} activeOpacity={0.7} key={message.chatId}>
      <StatusIndicator color="#FF6A00" />
      <ImageContainer>
        <MessageImage />
      </ImageContainer>
      <Container bgColor="default" flex={1}>
        <Col gap={5}>
          <Row between>
            <Flex>
              <CustomText fontSizes="body4" fontWeight="bold" color="deneme">
                Lampotin 1LT
              </CustomText>
            </Flex>
            <CustomText fontSizes="body6" color="deneme2">
              {message.lastMessage?.timestamp
                ? dayjs(message.lastMessage.timestamp).format(
                    'DD.MM.YYYY HH:mm',
                  )
                : ''}
            </CustomText>
          </Row>
          <Col>
            <CustomText fontSizes="body6" color="deneme2">
              Ziraat
            </CustomText>
            <CustomText fontSizes="body6" color="deneme2">
              {message.content}
            </CustomText>
          </Col>
        </Col>
      </Container>
    </MessageCard>
  );
};

const SearchBar = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 100%;
  margin-bottom: 10px;
`;

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

const MessageImage = styled(Image)`
  width: 100%;
  height: 100%;
`;
