import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {USER_ME} from '../../api/queries/userQueries.ts';
import {MY_POSTS} from '../../api/queries/myPosts.ts';
import React, {useContext, useEffect, useState} from 'react';
import EmptyPage from '../../components/EmptyPage';
import PostItem from '../../components/PostItem';
import {onShare} from '../../utils/shareUtils.ts';
import ToggleMenu from '../../components/toggleMenu';
import PostModal from '../../components/PostModal';
import {styles} from '../favorites';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {PostModel, RootStackParamList} from '../../types.ts';
import {style} from './styles.ts';
import {
  BOOKMARK_INACTIVE,
  CREATE_BUTTON_PLUS_BLACK,
  CREATE_BUTTON_PLUS_WHITE,
  MAIN_INACTIVE,
  POST_ACTIVE,
  STATE_EMPTY_USER_SMALL,
} from '../../assets/images';
import {useSidebar} from '../../hooks/toggleSideBar.ts';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const MyPosts: React.FC = () => {
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(USER_ME);
  const {refetch, loading, error, data} = useQuery(MY_POSTS, {
    variables: {
      input: {
        limit: 8,
      },
    },
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {isDark, toggleTheme} = useContext(ThemeContext);

  useEffect(() => {
    if (loading) {
      console.log('Запрос выполняется...');
    }

    if (error) {
      console.error('Ошибка запроса:', error);
    }
    console.log('Data:', data);
    if (data?.myPosts?.data.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [data, setIsEmpty]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  const {sidebarVisible, sidebarPosition, overlayOpacity, toggleSidebar} =
    useSidebar();

  const handleNavigationCreatePostScreen = () => {
    navigation.navigate('CreatePost');
  };

  const [selectedPost, setSelectedPost] = useState<PostModel>();
  const [modalVisible, setModalVisible] = useState(false);

  const openPostModal = (post: PostModel) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleNavigationMainScreen = () => {
    navigation.navigate(ScreenNames.MAIN);
  };
  const handleNavigationFavoritesScreen = () => {
    navigation.navigate(ScreenNames.FAVORITES);
  };
  const handleNavigationMyPostsScreen = () => {
    navigation.navigate(ScreenNames.MY_POSTS);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? `#131313` : `#FFF`,
      }}>
      <View style={styles.heading}>
        <Text
          style={{
            ...styles.heading__text,
            color: isDark ? `#FFF` : `#131313`,
          }}>
          My posts
        </Text>
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            style={styles.heading__img}
            source={
              dataUser?.userMe.avatarUrl
                ? {uri: dataUser.userMe.avatarUrl}
                : STATE_EMPTY_USER_SMALL
            }></Image>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isEmpty ? (
          <EmptyPage />
        ) : (
          data?.myPosts?.data.map((post: any, id: number) => (
            <PostItem
              key={id}
              post={post}
              onPress={() => openPostModal(post)}
              share={onShare}
              isSwipeToDeleteEnabled={true}
              refetch={refetch}
            />
          ))
        )}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navigation__inner}
          onPress={handleNavigationMainScreen}>
          <Image style={styles.navigation__img} source={MAIN_INACTIVE}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#696969` : `#131313`,
            }}>
            Main
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationFavoritesScreen}>
          <Image
            style={styles.navigation__img}
            source={BOOKMARK_INACTIVE}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#696969` : `#131313`,
            }}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationMyPostsScreen}>
          <Image style={styles.navigation__img} source={POST_ACTIVE}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#B8DE64` : `#131313`,
            }}>
            My posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.create}
          onPress={handleNavigationCreatePostScreen}>
          <Image
            source={
              isDark ? CREATE_BUTTON_PLUS_BLACK : CREATE_BUTTON_PLUS_WHITE
            }></Image>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          ...styles.overlay,
          opacity: overlayOpacity,

          ...(sidebarVisible && {zIndex: 1}),
        }}
        onTouchEnd={toggleSidebar}
      />
      <Animated.View
        style={{
          ...styles.sidebar,
          transform: [{translateX: sidebarPosition}],
        }}>
        <ToggleMenu
          userName={dataUser?.userMe?.firstName}
          userLastName={dataUser?.userMe?.lastName}
          userAvatar={dataUser?.userMe?.avatarUrl}
        />
      </Animated.View>
      <PostModal
        post={selectedPost}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        share={onShare}
      />
    </View>
  );
};

export default MyPosts;
