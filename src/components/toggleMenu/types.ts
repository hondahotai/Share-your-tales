import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';

export interface MenuProps {
  userName: string;
  userLastName: string;
  userAvatar: string;
}

export type HomeScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'Profile'
>;
