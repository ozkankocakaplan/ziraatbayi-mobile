import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {TextInput, FlatList} from 'react-native';
import Page from '../../components/Page/Page';
import Container from '../../components/Container/Container';

import useChatList from '../../hooks/useChatList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import MessageResponse from '../../payload/response/MessageResponse';
import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';

import Loading from '../../components/Loading/Loading';
import FirebaseApi from '../../services/firebaseService';

import {AdvertActions} from '../../store/features/advertReducer';
import {useFocusEffect} from '@react-navigation/native';
import MessageItem from './MessageItem';
export default function ChatListScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ChatListScreen'>,
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
    let isCurrentUser = item.senderId.toString() === userId?.toString();
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
      senderFullName: isCurrentUser
        ? item.receiverFullName
        : item.senderFullName,
      receiverFullName: isCurrentUser
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

const SearchBar = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 100%;
  margin-bottom: 10px;
`;
