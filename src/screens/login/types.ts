import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';

export type FormDataLogin = {
  email: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type ScreenNavigationProp = NavigationProp<RootStackParamList>;
