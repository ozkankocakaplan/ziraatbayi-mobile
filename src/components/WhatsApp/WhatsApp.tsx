import {Linking, Platform} from 'react-native';

interface WhatsAppProps {
  phone: string;
  message?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const WhatsApp = {
  open: async ({phone, message = '', onSuccess, onError}: WhatsAppProps) => {
    try {
      let formattedPhone = phone.replace(/[\s-]/g, '');

      if (!formattedPhone.startsWith('+') && formattedPhone.startsWith('0')) {
        formattedPhone = '9' + formattedPhone;
      }

      if (!formattedPhone.startsWith('+') && !formattedPhone.startsWith('90')) {
        formattedPhone = '90' + formattedPhone;
      }

      console.log('Formatlanmış telefon:', formattedPhone);

      const url = Platform.select({
        ios: `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(
          message,
        )}`,
        android: `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(
          message,
        )}`,
        default: `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
          message,
        )}`,
      });

      console.log('WhatsApp URL:', url);

      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
        onSuccess?.();
      } else {
        if (Platform.OS === 'ios') {
          await Linking.openURL('https://www.whatsapp.com/?lang=tr_TR');
        } else {
          await Linking.openURL('https://www.whatsapp.com/?lang=tr_TR');
        }
        onError?.('WhatsApp yüklü değil. Mağazaya yönlendiriliyorsunuz.');
      }
    } catch (error) {
      console.error('WhatsApp Hatası:', error);
      onError?.(
        "WhatsApp açılamadı. Lütfen WhatsApp'ın yüklü olduğundan emin olun.",
      );
    }
  },
};

export default WhatsApp;
