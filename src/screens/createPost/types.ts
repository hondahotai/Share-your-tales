import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';

export type FormData = {
  title: string;
  post: string;
};

export type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;
