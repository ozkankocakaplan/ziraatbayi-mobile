import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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
  const {messages, loading} = useChatMessages(chatId);
  const flatListRef = useRef<FlatList>(null);

  return (
    <Page header title={receiverFullName} showGoBack>
      <Loading loading={loading}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={25}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Container>
            <ProductInfoContainer>
              <Row gap={10}>
                <ProductImageContainer>
                  <ProductImage
                    imageUrl={product?.images?.[0]?.imageUrl || ''}
                  />
                </ProductImageContainer>
                <Col gap={5}>
                  <CustomText numberOfLines={1} color="black">
                    {product?.name}
                  </CustomText>
                  <CustomText
                    color="grey"
                    fontSizes="caption1"
                    numberOfLines={2}>
                    {product?.activeSubstance}
                  </CustomText>
                  <CustomText
                    color="grey"
                    fontSizes="caption1"
                    numberOfLines={2}>
                    {product?.manufacturer?.name}
                  </CustomText>
                </Col>
              </Row>
            </ProductInfoContainer>
            <FlatList
              maintainVisibleContentPosition={{minIndexForVisible: 0}}
              ref={flatListRef}
              data={messages}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
              keyExtractor={(item: MessageResponse) => item.messageId}
              renderItem={({item}) => {
                const isCurrentUser = item.senderId === senderId;
                return (
                  <View
                    style={{
                      alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                      backgroundColor: isCurrentUser ? '#4caf50' : '#4caf50',
                      borderRadius: 10,
                      borderTopRightRadius: isCurrentUser ? 0 : 10,
                      borderTopLeftRadius: isCurrentUser ? 10 : 0,
                      padding: 10,
                      marginVertical: 5,
                      maxWidth: '70%',
                      marginHorizontal: 10,
                    }}>
                    {!isCurrentUser && (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        {isCurrentUser ? senderFullName : receiverFullName}
                      </Text>
                    )}
                    <Text style={{color: '#fff'}}>{item.content}</Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#e0e0e0',
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
          />
        </KeyboardAvoidingView>
      </Loading>
    </Page>
  );
}
const ChatInput = ({
  chatId,
  senderId,
  receiverId,
  productId,
}: {
  chatId: string;
  senderId: number;
  receiverId: number;
  productId: number;
}) => {
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

  const handleSend = async () => {
    if (content.trim()) {
      let entity: CreateMessageRequest = {
        chatId: chatId,
        senderId,
        receiverId,
        content,
        productId,
      };
      let result = await sendMessage(entity).unwrap();
      console.log(result);
      setContent('');
    }
  };

  return (
    <Container flex={0.1} mx={10}>
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
              <ActionButton>
                <Col center alignCenter>
                  <Icon icon={faImage} size={30} color="#555" />
                </Col>
              </ActionButton>
            </Row>
          )}
        </Row>
      </Flex>
    </Container>
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
