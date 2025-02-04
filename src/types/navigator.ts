import CategoryResponse from '../payload/response/CategoryResponse';
import DealerResponse from '../payload/response/DealerResponse';
import ProductResponse from '../payload/response/ProductResponse';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  MainScreen: undefined;
  HomeScreen: undefined;
  BottomTabMenu: undefined;
  ChatRoomScreen: {
    chatId: string;
    receiverFullName: string;
    senderFullName: string;
    senderId: string;
    receiverId: string;
    advertId: number;
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
  EditAdvertScreen: {id: number};
  SearchScreen: {query: string};
  UserInfoScreen: undefined;
  ChangePasswordScreen: undefined;
  SupportScreen: undefined;
  DealerDetailScreen: {id: number};
  ResetPassword: {token: string};
  AdvertsByCategoryScreen: {category: CategoryResponse};
  CompanyInformationScreen: undefined;
  HomeFilterScreen: undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  MyAdverts: undefined;
  AccountScreen: undefined;
};
