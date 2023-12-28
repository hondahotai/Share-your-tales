import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';

export type FormData = {
  firstName: string;
  lastName: string;
  surName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  number: string;
  country: string;
};

export type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;
