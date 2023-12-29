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
import {FAVOURITE} from '../../api/queries/favouritePosts.ts';
import React, {useContext, useEffect, useState} from 'react';
import ToggleMenu from '../../components/toggleMenu';
import {USER_ME} from '../../api/queries/userQueries.ts';
import PostItem from '../../components/PostItem';
import {onShare} from '../../utils/shareUtils.ts';
import PostModal from '../../components/PostModal';
import EmptyPage from '../../components/EmptyPage';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {PostModel, RootStackParamList} from '../../types.ts';
import {styles} from './styles.ts';
import {
  BOOKMARK_ACTIVE,
  MAIN_INACTIVE,
  POST_INACTIVE,
  STATE_EMPTY_USER_SMALL,
} from '../../assets/images';
import {useSidebar} from '../../hooks/toggleSideBar.ts';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const Favorites: React.FC = () => {
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(USER_ME);
  const {refetch, loading, error, data} = useQuery(FAVOURITE, {
    variables: {
      input: {
        limit: 8,
      },
    },
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const {isDark, toggleTheme} = useContext(ThemeContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    console.log('Data:', data);
    if (data && data?.favouritePosts.data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [data, setIsEmpty]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  const {sidebarVisible, sidebarPosition, overlayOpacity, toggleSidebar} =
    useSidebar();

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
          Favorites
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
          data?.favouritePosts?.data.map((post: PostModel, id: number) => (
            <PostItem
              key={id}
              post={post}
              onPress={() => openPostModal(post)}
              share={onShare}
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
            source={BOOKMARK_ACTIVE}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#B8DE64` : `#131313`,
            }}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationMyPostsScreen}>
          <Image style={styles.navigation__img} source={POST_INACTIVE}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#696969` : `#131313`,
            }}>
            My posts
          </Text>
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

export default Favorites;
