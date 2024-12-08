interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  dealerId: number;
  firebaseAccessToken: string;
}
export default LoginResponse;
