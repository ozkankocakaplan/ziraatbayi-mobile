interface NotificationResponse {
  id: number;
  title: string;
  message: string;
  dataId: number;
  userId: number;
  isRead: boolean;
  notificationType: NotificationType;
  createdAt: Date;
}
export default NotificationResponse;

export enum NotificationType {
  NOTIFICATION_SUBSCRIPTION_EXPIRING_SOON = 'NOTIFICATION_SUBSCRIPTION_EXPIRING_SOON', // Abonelik yakında sona eriyor
  NOTIFICATION_SUBSCRIPTION_RENEWAL_REMINDER = 'NOTIFICATION_SUBSCRIPTION_RENEWAL_REMINDER', // Abonelik yenileme hatırlatması
  NOTIFICATION_SUBSCRIPTION_EXPIRED = 'NOTIFICATION_SUBSCRIPTION_EXPIRED', // Abonelik süresi doldu
  NOTIFICATION_LISTING_DEACTIVATED = 'NOTIFICATION_LISTING_DEACTIVATED', // İlan devre dışı bırakıldı
  NOTIFICATION_LISTING_REACTIVATED = 'NOTIFICATION_LISTING_REACTIVATED', // İlan yeniden etkinleştirildi
  NOTIFICATION_DEALER_DEACTIVATED = 'NOTIFICATION_DEALER_DEACTIVATED', // Bayi devre dışı bırakıldı
  NOTIFICATION_ADVERT_LIMIT_EXCEEDED = 'NOTIFICATION_ADVERT_LIMIT_EXCEEDED', // İlan limiti aşıldı
  NOTIFICATION_MESSAGE = 'NOTIFICATION_MESSAGE', // Mesaj
}
