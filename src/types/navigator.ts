import CategoryResponse from '../payload/response/CategoryResponse';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  BottomTabMenu: undefined;
  MessageScreen: undefined;
  NotificationScreen: undefined;
  CategoriesScreen: {
    selectedCategory?: CategoryResponse;
    previousCategory?: CategoryResponse;
  };
  AddAdvertScreen: undefined;
  AdvertScreen: undefined;
  EditAdvertScreen: undefined;
  SearchScreen: {query: string};
};
export type BottomTabParamList = {
  Home: undefined;
  Adverts: undefined;
  AccountScreen: undefined;
};
