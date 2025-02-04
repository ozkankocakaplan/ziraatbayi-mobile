import {View} from 'react-native';
import React from 'react';
import Page from '../components/Page/Page';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import {Image} from 'react-native';
import {LogoIcon} from '../assets/logo';
import Divider from '../components/Divider/Divider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {UserApi} from '../services/userService';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function ResetPassword(
  props: NativeStackScreenProps<RootStackParamList, 'ResetPassword'>,
) {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const {token} = props.route.params || '';
  const {data, isError, isLoading} = UserApi.useGetVerifyTokenQuery(token);
  const [resetPassword] = UserApi.useResetPasswordMutation();

  const onSubmit = async () => {
    if (password === passwordRepeat) {
      const {data: resetData, error} = await resetPassword({
        token,
        password: password,
        goToLogin: reset,
      });
      if (resetData) {
        setPassword('');
        setPasswordRepeat('');
      }
      return;
    }
    AlertDialog.showModal({
      type: 'error',
      message: 'Şifreler uyuşmuyor',
    });
  };
  const reset = () => {
    dispatch(AuthActions.setUser(null));
    props.navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };
  return (
    <Page header title="Şifre Sıfırlama">
      <Container mx={20} bgColor="white" mt={20}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={LogoIcon}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
        </View>

        <View style={{gap: 10}}>
          <Input
            value={password}
            onChangeText={setPassword}
            required
            id="password"
            icon={faLock}
            placeholder="Şifre"
            secureTextEntry={true}
          />
          <Input
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            required
            id="password"
            icon={faLock}
            placeholder="Şifre Tekrarı"
            secureTextEntry={true}
          />
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Button onPress={onSubmit} text="Şifreyi Sıfırla" />
        </View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <Divider text="veya" />
        </View>
        <View style={{width: 170, alignSelf: 'center'}}>
          <Button onPress={reset} outline text="Giriş Yap"></Button>
        </View>
      </Container>
    </Page>
  );
}
