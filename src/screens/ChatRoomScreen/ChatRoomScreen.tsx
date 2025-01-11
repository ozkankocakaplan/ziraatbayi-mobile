import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {View, FlatList, Keyboard} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Col, Row} from '../../constant/GlobalStyled';
import Page from '../../components/Page/Page';
import styled from 'styled-components';
import Container from '../../components/Container/Container';
import useChatMessages from '../../hooks/useChatMessages';
import MessageResponse from '../../payload/response/MessageResponse';
import Loading from '../../components/Loading/Loading';
import ProductImage from '../../components/Advert/ProductImage';
import CustomText from '../../components/Text/Text';
import usePhoto from '../../hooks/usePhoto';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
const LAST_LIMIT = 50;

export default function ChatRoomScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ChatRoomScreen'>) {
  const {
    chatId,
    receiverFullName,
    senderFullName,
    senderId,
    product,
    receiverId,
    advertId,
  } = route.params;
  const [lastLimit, setLastLimit] = useState(LAST_LIMIT);
  const [pendingMessage, setPendingMessage] = useState<MessageResponse | null>(null);
  const {initLaunchImage, photos, resetPhotos} = usePhoto();
  const user = useSelector((state: RootState) => state.auth.user);
  const {messages, loading} = useChatMessages(chatId);
  const flatListRef = useRef<FlatList>(null);
  const [totalContentHeight, setTotalContentHeight] = useState(0);
  useEffect(() => {
    if (
      flatListRef.current &&
      messages.slice(-LAST_LIMIT).length === LAST_LIMIT
    ) {
      scrollToEnd();
    }
  }, [flatListRef.current, messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTimeout(scrollToEnd, 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const scrollToEnd = useCallback(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: false});
      }, 200);
    }
  }, []);

  const calculateLastLimit = useCallback(() => {
    if (lastLimit > messages.length) {
      return false;
    }
    return true;
  }, [lastLimit, messages.length]);

  const handleMessageSend = (message: string) => {
    const tempMessage: MessageResponse = {
      messageId: 'temp-' + Date.now(),
      content: message,
      senderId: senderId.toString(),
      receiverId: receiverId.toString(),
      chatId: chatId,
      contentType: 'text',
      timestamp: Date.now(),
      lastMessage: null as any,
      receiverFullName: receiverFullName,
      senderFullName: senderFullName,
      isRead: false,
      product: product,
      advertId: advertId.toString(),
      isPending: true
    };
    
    setPendingMessage(tempMessage);
    setTimeout(scrollToEnd, 100);
  };

  const displayMessages = useMemo(() => {
    return [...messages.slice(-lastLimit), ...(pendingMessage ? [pendingMessage] : [])];
  }, [messages, pendingMessage, lastLimit]);

  useEffect(() => {
    if (pendingMessage && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if ((lastMessage.content === pendingMessage.content || 
           lastMessage.contentType === 'image') && 
          lastMessage.senderId === pendingMessage.senderId) {
        setPendingMessage(null);
      }
    }
  }, [messages, pendingMessage]);

  return (
    <Page
      header
      title={
        user?.id?.toString() !== senderId?.toString()
          ? receiverFullName
          : senderFullName
      }
      showGoBack
      showGoToDealerButton={() => {
        if (user?.id?.toString() === senderId?.toString()) {
          navigation.navigate('DealerDetailScreen', {id: Number(receiverId)});
        }
      }}>
      <Loading loading={loading}>
        <Container>
          <ProductInfoContainer>
            <Row gap={10}>
              <ProductImageContainer>
                <ProductImage
                  isImageView
                  imageUrl={product?.images?.[0]?.imageUrl || ''}
                />
              </ProductImageContainer>
              <Col gap={5}>
                <CustomText numberOfLines={1} color="black">
                  {product?.name}
                </CustomText>
                <CustomText color="grey" fontSizes="caption1" numberOfLines={2}>
                  {product?.activeSubstance}
                </CustomText>
                <CustomText color="grey" fontSizes="caption1" numberOfLines={2}>
                  {product?.manufacturer?.name}
                </CustomText>
              </Col>
            </Row>
          </ProductInfoContainer>
          <ShowMoreButton
            isShow={calculateLastLimit()}
            onPress={() => {
              setLastLimit(lastLimit + LAST_LIMIT);
              if (lastLimit + LAST_LIMIT >= messages.length) {
                return false;
              }
              return true;
            }}
          />
          <FlatList
            removeClippedSubviews={false}
            maintainVisibleContentPosition={{minIndexForVisible: 0}}
            ref={flatListRef}
            data={displayMessages}
            onContentSizeChange={() => {
              if (messages.length > 0 || pendingMessage) {
                scrollToEnd();
              }
            }}
            keyExtractor={(item: MessageResponse) => item.messageId}
            renderItem={({item}) => {
              const isCurrentUser = item.senderId === senderId.toString();
              return (
                <ChatBubble
                  item={item}
                  isCurrentUser={isCurrentUser}
                  senderFullName={senderFullName}
                  receiverFullName={receiverFullName}
                />
              );
            }}
          />
        </Container>
        <ChatInput
          onMessageSent={handleMessageSend}
          onMessageSendSuccess={() => {
            
          }}
          advertId={advertId.toString()}
          productId={product?.id || 0}
          chatId={chatId}
          senderId={senderId}
          receiverId={receiverId}
          initLaunchImage={initLaunchImage}
          resetPhotos={() => {
            resetPhotos();
          }}
          selectedFile={
            photos.length > 0
              ? {
                  uri: photos[0].uri,
                  name: photos[0].fileName,
                }
              : undefined
          }
        />
      </Loading>
    </Page>
  );
}

const ProductInfoContainer = styled(View)`
  padding: 7px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 75px;
  background-color: #fff;
`;

const ProductImageContainer = styled(View)`
  height: 60px;
  width: 60px;
  margin-left: 10px;
`;
