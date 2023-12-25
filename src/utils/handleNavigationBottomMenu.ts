import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation<any>();

export const handleNavigationMainScreen = () => {
  navigation.navigate('Main');
};
export const handleNavigationFavoritesScreen = () => {
  navigation.navigate('Favorites');
};
export const handleNavigationMyPostsScreen = () => {
  navigation.navigate('MyPosts');
};
