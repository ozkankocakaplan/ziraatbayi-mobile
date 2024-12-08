import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useChatMessages from '../hooks/useChatMessages';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import Input from '../components/Input/Input';
import styled from 'styled-components';

import {Col, Flex, Row} from '../constant/GlobalStyled';
import Container from '../components/Container/Container';
import Icon from '../components/Icon/Icon';
import {faImage} from '@fortawesome/free-regular-svg-icons';

import CustomSvgXml from '../components/Icon/CustomSvgXml';
import SendIcon from '../constant/icons';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import MessageResponse from '../payload/response/MessageResponse';
import Loading from '../components/Loading/Loading';
import ProductImage from '../components/Advert/ProductImage';
import CustomText from '../components/Text/Text';
import FirebaseApi from '../services/firebaseService';
import CreateMessageRequest from '../payload/request/CreateMessageRequest';
import usePhoto from '../hooks/usePhoto';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import ShowMoreButton from '../components/ShowMoreButton/ShowMoreButton';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  useGetProductImageForChatMutation,
  useGetProductImageQuery,
} from '../services/advertService';
import {ActivityIndicator} from 'react-native';
import {faClose} from '@fortawesome/free-solid-svg-icons';
const LAST_LIMIT = 10;

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
  } = route.params;
  const [lastLimit, setLastLimit] = useState(LAST_LIMIT);
  const {initLaunchImage, photos, resetPhotos} = usePhoto();
  const user = useSelector((state: RootState) => state.auth.user);
  const {messages, loading} = useChatMessages(chatId);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (
      flatListRef.current &&
      messages.slice(-LAST_LIMIT).length === LAST_LIMIT
    ) {
      let scrollEnd = setTimeout(() => {
        slideToBottom();
      }, 100);
      return () => {
        clearTimeout(scrollEnd);
      };
    }
  }, [flatListRef.current, messages]);
  const [getProductImage] = useGetProductImageForChatMutation();
  const slideToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  return (
    <Page
      header
      title={
        user?.id?.toString() === senderId?.toString()
          ? receiverFullName
          : senderFullName
      }
      showGoBack
      showGoToDealerButton={() => {
        console.log('Go to dealer button clicked');
      }}>
      <Loading loading={loading}>
        <Container>
          <ProductInfoContainer>
            <Row gap={10}>
              <ProductImageContainer>
                <ProductImage imageUrl={product?.images?.[0]?.imageUrl || ''} />
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
            isShow={LAST_LIMIT >= messages.length ? false : true}
            onPress={() => {
              setLastLimit(lastLimit + LAST_LIMIT);
              if (lastLimit + LAST_LIMIT >= messages.length) {
                return false;
              }
              return true;
            }}
          />
          <FlatList
            maintainVisibleContentPosition={{minIndexForVisible: 0}}
            ref={flatListRef}
            data={messages.slice(-lastLimit)}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({animated: true})
            }
            keyExtractor={(item: MessageResponse) => item.messageId}
            renderItem={({item}) => {
              const isCurrentUser = item.senderId === senderId.toString();
              return (
                <View
                  style={
                    item.contentType === 'text'
                      ? {
                          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                          backgroundColor: isCurrentUser
                            ? '#4caf50'
                            : '#4caf50',
                          borderRadius: 10,
                          borderTopRightRadius: isCurrentUser ? 0 : 10,
                          borderTopLeftRadius: isCurrentUser ? 10 : 0,
                          padding: 10,
                          marginVertical: 5,
                          maxWidth: '70%',
                          marginHorizontal: 10,
                        }
                      : {
                          padding: 10,
                          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                        }
                  }>
                  {!isCurrentUser && (
                    <Text
                      style={[
                        {
                          color:
                            item.contentType === 'text' ? '#fff' : '#4caf50',
                          fontWeight: 'bold',
                        },
                        item.contentType === 'text' ? {} : {marginBottom: 5},
                      ]}>
                      {isCurrentUser ? senderFullName : receiverFullName}
                    </Text>
                  )}
                  {item.contentType === 'text' ? (
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      {item.content}
                    </Text>
                  ) : (
                    <View
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      <ProductImage imageUrl={item.content} />
                    </View>
                  )}
                  <Text
                    style={{
                      fontSize: 10,
                      color:
                        item.contentType === 'text' ? '#e0e0e0' : '#4caf50',
                      alignSelf: 'flex-end',
                      marginTop: 5,
                    }}>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              );
            }}
          />
        </Container>
        <ChatInput
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
const ChatInput = ({
  chatId,
  senderId,
  receiverId,
  productId,
  initLaunchImage,
  selectedFile,
  resetPhotos,
}: {
  chatId: string;
  senderId: string;
  receiverId: string;
  productId: number;
  initLaunchImage: () => void;
  selectedFile?: {uri: string; name: string} | undefined;
  resetPhotos?: () => void;
}) => {
  const [postImageLoading, setPostImageLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [sendMessage] = FirebaseApi.useSendMessageMutation();
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    if (selectedFile) {
      handlePhotoSend();
    }
  }, [selectedFile]);

  const handleSend = async () => {
    if (content.trim()) {
      let entity: CreateMessageRequest = {
        chatId: chatId,
        senderId,
        receiverId,
        content,
        productId,
      };
      var formData = new FormData();
      formData.append('chatId', entity.chatId);
      formData.append('senderId', entity.senderId);
      formData.append('receiverId', entity.receiverId);
      formData.append('content', entity.content);
      formData.append('productId', entity.productId.toString());
      await sendMessage(formData).unwrap();
      setContent('');
    }
  };
  const handlePhotoSend = async () => {
    let entity: CreateMessageRequest = {
      chatId: chatId,
      senderId,
      receiverId,
      content,
      productId,
    };
    var formData = new FormData();
    formData.append('chatId', entity.chatId);
    formData.append('senderId', entity.senderId);
    formData.append('receiverId', entity.receiverId);
    formData.append('content', entity.content);
    formData.append('productId', entity.productId.toString());
    if (selectedFile) {
      formData.append('file', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: 'image/jpeg',
      });
    }

    AlertDialog.showModal({
      showLoading: postImageLoading,
      title: 'Uyarı',
      message: 'Fotoğrafı göndermek istediğinize emin misiniz?',
      onConfirm() {
        setPostImageLoading(true);
        sendMessage(formData).finally(() => {
          setPostImageLoading(false);
        });
        if (resetPhotos) resetPhotos();
      },
      onCancel() {
        AlertDialog.dismissAll();
      },
    });
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 0.1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 50}
      behavior={'padding'}>
      <Container flex={1} mx={10}>
        <Flex>
          <Row>
            <Flex>
              <CInput
                onFocus={() => {
                  setKeyboardVisible(true);
                }}
                multiline
                value={content}
                onChangeText={setContent}
                placeholder="Mesaj yaz..."
              />
              {content.length > 0 && (
                <SendButton onPress={handleSend}>
                  <CustomSvgXml
                    width={25}
                    height={25}
                    color="white"
                    xml={SendIcon}
                  />
                </SendButton>
              )}
            </Flex>

            {!isKeyboardVisible && (
              <Row flex={0.2} center alignCenter>
                <ActionButton
                  onPress={() => {
                    initLaunchImage();
                  }}>
                  <Col center alignCenter>
                    <Icon icon={faImage} size={30} color="#555" />
                  </Col>
                </ActionButton>
              </Row>
            )}
          </Row>
        </Flex>
      </Container>
    </KeyboardAvoidingView>
  );
};

const ProductInfoContainer = styled(View)`
  padding: 7px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 75px;
  background-color: #fff;
`;

const CInput = styled(Input)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
`;
const ActionButton = styled(TouchableOpacity)`
  flex: 1;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const SendButton = styled(TouchableOpacity)`
  position: absolute;
  right: 5px;
  align-items: center;
  justify-content: center;
  background-color: #1f8505;
  border-radius: 30px;
  height: 40px;
  top: 5px;
  width: 60px;
`;
const ProductImageContainer = styled(View)`
  height: 60px;
  width: 60px;
  margin-left: 10px;
`;
