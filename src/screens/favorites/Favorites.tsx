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

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const Favorites = () => {
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

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarPosition = useState(new Animated.Value(-288))[0];
  const [overlayOpacity] = useState(new Animated.Value(0));

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.parallel([
        Animated.timing(sidebarPosition, {
          toValue: -288,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(sidebarPosition, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: Dimensions.get('window').width - 288,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setSidebarVisible(!sidebarVisible);
  };

  const [selectedPost, setSelectedPost] = useState<PostModel>();
  const [modalVisible, setModalVisible] = useState(false);

  const openPostModal = (post: PostModel) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleNavigationMainScreen = () => {
    navigation.navigate('Main');
  };
  const handleNavigationFavoritesScreen = () => {
    navigation.navigate('Favorites');
  };
  const handleNavigationMyPostsScreen = () => {
    navigation.navigate('MyPosts');
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
                : require('../../assets/images/StateEmptyUserSmall.png')
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
          <Image
            style={styles.navigation__img}
            source={require('../../assets/images/MainInactive.png')}></Image>
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
            source={require('../../assets/images/bookmarkActive.png')}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#B8DE64` : `#131313`,
            }}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationMyPostsScreen}>
          <Image
            style={styles.navigation__img}
            source={require('../../assets/images/PostInactive.png')}></Image>
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
