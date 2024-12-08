import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import FirebaseApi from '../../services/firebaseService';
import CreateMessageRequest from '../../payload/request/CreateMessageRequest';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import Container from '../../components/Container/Container';
import {Col, Flex, Row} from '../../constant/GlobalStyled';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import Icon from '../../components/Icon/Icon';
import CustomSvgXml from '../../components/Icon/CustomSvgXml';
import SendIcon from '../../constant/icons';
import styled from 'styled-components';
import Input from '../../components/Input/Input';

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
export default memo(ChatInput);
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
