import React from 'react';
import styled from 'styled-components/native';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {faBell, faTimes, faUndo} from '@fortawesome/free-solid-svg-icons';
import Page from '../components/Page/Page';
import Icon from '../components/Icon/Icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';

export default function NotificationScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const notifications = [
    {
      id: 1,
      title: 'Siparişini teslim ettik 🎯',
      description:
        '9625467298 numaralı siparişin teslim ettik. Güzel günlerde kullanmanı diliyor, ürün yorumlarını bekliyoruz!',
      date: '25/11/2024',
      icon: faBell,
      bgColor: '#D0F5D5',
    },
    {
      id: 2,
      title: 'Siparişini kargoya verdik 🚚',
      description:
        '8973922705 numaralı paketini kargoya verdik. Kargo takibini hesabından yapabilirsin.',
      date: '22/11/2024',
      icon: faBell,
      bgColor: '#FFFFFF',
    },
    {
      id: 3,
      title: 'Siparişini iptal ettin 😞',
      description:
        '9607142472 numaralı siparişin talebin üzerine iptal edildi. Ücret iaden bir hafta içinde hesabına yansıyacaktır.',
      date: '11/11/2024',
      icon: faBell,
      bgColor: '#D0F5D5',
    },
    {
      id: 4,
      title: 'Siparişini aldık ✅',
      description:
        '9655899373 numaralı siparişin onaylandı. Sipariş takibini hesabından yapabilirsin.',
      date: '12/05/2024',
      icon: faBell,
      bgColor: '#FFFFFF',
    },
    {
      id: 5,
      title: 'İade paketin ulaştı 📦',
      description:
        'Siparişine ait iade paketin satıcıya ulaştı. Ürünün 2 iş günü içinde incelenecek ve ardından ücret iadesi yapılacaktır.',
      date: '18/03/2024',
      icon: faUndo,
      bgColor: '#D0F5D5',
    },
  ];

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     refetch();
  //   });
  // }, []);
  return (
    <Page header title="Bildirimler" showGoBack>
      <ScrollContainer>
        {notifications.map(item => (
          <NotificationCard
            activeOpacity={0.7}
            key={item.id}
            bgColor={item.bgColor}>
            <IconContainer>
              <Icon icon={item.icon} size={20} color="#1F8505" />
            </IconContainer>
            <Content>
              <NotificationTitle>{item.title}</NotificationTitle>
              <NotificationDescription>
                {item.description}
              </NotificationDescription>
              <NotificationDate>{item.date}</NotificationDate>
            </Content>
            <CloseButton>
              <Icon icon={faTimes} size={16} color="#CCCCCC" />
            </CloseButton>
          </NotificationCard>
        ))}
      </ScrollContainer>
    </Page>
  );
}

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const NotificationCard = styled(TouchableOpacity)<{bgColor: string}>`
  background-color: ${({bgColor}) => bgColor};
  padding: 15px;
  flex-direction: row;
  align-items: flex-start;
`;

const IconContainer = styled(View)`
  background-color: #fff;
  border-radius: 50px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: 1px solid #ebeff3;
`;

const Content = styled(View)`
  flex: 1;
`;

const NotificationTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 5px;
`;

const NotificationDescription = styled(Text)`
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
`;

const NotificationDate = styled(Text)`
  font-size: 12px;
  color: #999999;
  margin-top: 5px;
`;

const CloseButton = styled(TouchableOpacity)`
  padding: 5px;
  align-items: center;
  justify-content: center;
`;
