import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type HomeScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'Registration'
>;
