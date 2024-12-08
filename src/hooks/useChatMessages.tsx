import database from '@react-native-firebase/database';
import {useEffect, useMemo, useState} from 'react';
import MessageResponse from '../payload/response/MessageResponse';
import {checkEqualChatId} from '../helper/Helper';
import {useNavigation} from '@react-navigation/native';

const useChatMessages = (chatId: string) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Array<MessageResponse>>([]);

  useEffect(() => {
    if (checkEqualChatId(chatId)) {
      navigation.goBack();
      return;
    }
    if (!chatId) {
      setLoading(false);
      return;
    }
    const messagesRef = database().ref(`/messages/${chatId}`);
    const onValueChange = messagesRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const parsedMessages = Object.keys(data).map(key => ({
          messageId: key,
          ...data[key],
        }));
        setMessages(parsedMessages);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => messagesRef.off('value', onValueChange);
  }, [chatId]);

  const sortedMessages = messages.sort(
    (a: MessageResponse, b: MessageResponse) => a.timestamp - b.timestamp,
  );

  const memoizedValue = useMemo(
    () => ({loading, messages: sortedMessages}),
    [loading, sortedMessages],
  );

  return memoizedValue;
};

export default useChatMessages;
