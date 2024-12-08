import CategoryResponse from '../payload/response/CategoryResponse';
import ProductResponse from '../payload/response/ProductResponse';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  BottomTabMenu: undefined;
  ChatListScreen: undefined;
  ChatRoomScreen: {
    chatId: string;
    receiverFullName: string;
    senderFullName: string;
    senderId: string;
    receiverId: string;
    product: ProductResponse;
  };
  NotificationScreen: undefined;
  CategoriesScreen: {
    initCategory?: CategoryResponse;
    selectedCategory?: CategoryResponse;
    previousCategory?: CategoryResponse;
  };
  AddAdvertScreen: undefined;
  AdvertScreen: undefined;
  EditAdvertScreen: undefined;
  SearchScreen: {query: string};
  UserInfoScreen: undefined;
  ChangePasswordScreen: undefined;
  SupportScreen: undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Adverts: undefined;
  AccountScreen: undefined;
};
