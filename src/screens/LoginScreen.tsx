import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import LoginRequest from '../payload/request/LoginRequest';
import {AuthApi} from '../services/authService';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import {RootState} from '../store';

export default function LoginScreen(
  props: NativeStackScreenProps<RootStackParamList, 'LoginScreen'>,
) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email: 'ozkankocakaplan07@gmail.com',
    password: '123456',
  });
  const dispatch = useDispatch(); // useDispatch hook'u ile store'a erişim sağlanır.
  const {user} = useSelector((state: RootState) => state.auth); // useSelector hook'u ile store'dan veri okunur.
  console.log(user);
  const ref = React.useRef<FormContainerRef>(null);

  const [loginMutation, {isLoading, isError, error}] =
    AuthApi.useLoginMutation();

  const login = () => {
    let result = ref.current?.validate({
      email: 'E-posta adresi boş bırakılamaz',
      password: 'Şifre boş bırakılamaz',
    });
    if (result) {
      loginMutation(loginRequest); // loginMutation hook'u ile login işlemi yapılır.
      // loginMutation(loginRequest)
      // .unwrap()
      // .then(response => {
      //   if (response.isSuccessful) {
      //     dispatch(AuthActions.setUser(response.entity));
      //   } else {
      //     AlertDialog.showModal({
      //       title: 'Hata',
      //       type: 'error',
      //       message: response.exceptionMessage,
      //     });
      //   }
      // })
      // .catch(er => {
      //   AlertDialog.showModal({
      //     title: 'Hata',
      //     type: 'error',
      //     message: 'E-posta veya şifre hatalı',
      //   });
      // });
    }
  };

  return (
    <Container header title="Giriş Yap">
      <Form>
        <LoginContainer>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <IconContainer></IconContainer>
          </View>

          <FormContainer style={{gap: 10}} formContainerRef={ref}>
            <Input
              autoCapitalize="none"
              id="email"
              required
              icon={faEnvelope}
              placeholder="E-posta"
              value={loginRequest.email}
              onChangeText={text =>
                setLoginRequest({...loginRequest, email: text})
              }
            />
            <Input
              required
              id="password"
              icon={faLock}
              placeholder="Şifre"
              secureTextEntry={true}
              value={loginRequest.password}
              onChangeText={text =>
                setLoginRequest({...loginRequest, password: text})
              }
            />
          </FormContainer>
          <ForgotPassword>
            <CustomText
              color="secondary"
              onPress={() => {
                props.navigation.navigate('ForgotPasswordScreen');
              }}>
              Şifremi Unuttum
            </CustomText>
          </ForgotPassword>
          <View style={{marginBottom: 10}}>
            <Button onPress={login} text="Giriş Yap" />
          </View>
        </LoginContainer>
        <RegisterContainer>
          <RegisterTextContainer>
            <CustomText color="secondary">Hesabınız yok mu?</CustomText>
          </RegisterTextContainer>
          <Button
            onPress={() => {
              props.navigation.navigate('RegisterScreen');
            }}
            outline
            text="Kayıt Ol"
          />
        </RegisterContainer>
      </Form>
    </Container>
  );
}
const Form = styled(View)`
  margin-horizontal: 20px;
  flex: 1;
`;
const LoginContainer = styled(View)`
  flex: 2;
  justify-content: center;
`;
const IconContainer = styled(View)`
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
  background-color: green;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 30px;
  flex: 1;
  justify-content: flex-end;
`;
const RegisterTextContainer = styled(View)`
  margin-bottom: 10px;
  align-items: center;
`;
const ForgotPassword = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-vertical: 10px;
`;
