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
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Loading from '../components/Loading/Loading';
import FirebaseApi from '../services/firebaseService';
import ProductImage from '../components/Advert/ProductImage';
import {AdvertActions} from '../store/features/advertReducer';
import {useFocusEffect} from '@react-navigation/native';
export default function MessageScreen(
  props: NativeStackScreenProps<RootStackParamList, 'MessageScreen'>,
) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const {navigation} = props;
  const {chats, loading, updateMessageReadToTrue} = useChatList();

  const [handleReadMessage] = FirebaseApi.useMessageReadMutation();

  useFocusEffect(() => {
    dispatch(AdvertActions.setSelectedChatId(''));
  });

  const handleChatPress = (item: MessageResponse) => {
    let isCurrentUser = item.senderId === userId?.toString();
    if (!item.lastMessage.isRead) {
      updateMessageReadToTrue(item.chatId);
      handleReadMessage({
        receiverId: item.receiverId.toString(),
        senderId: item.senderId.toString(),
        messageId: item.lastMessage.messageId,
      });
    }
    dispatch(AdvertActions.setSelectedChatId(item.chatId));
    navigation.navigate('ChatRoomScreen', {
      chatId: item.chatId,
      receiverFullName: isCurrentUser
        ? item.receiverFullName
        : item.senderFullName,
      senderFullName: isCurrentUser
        ? item.senderFullName
        : item.receiverFullName,
      senderId: userId?.toString() || '',
      receiverId: isCurrentUser
        ? item?.receiverId?.toString()
        : item?.senderId?.toString?.(),
      product: item.product,
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
              var isCurrentUser = item.senderId === userId?.toString();
              return (
                <MessageItem
                  handlePress={() => {
                    handleChatPress(item);
                  }}
                  isCurrentUser={isCurrentUser}
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
