import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import PostItem from '../../components/PostItem';
import {useQuery} from '@apollo/client';
import {POSTS} from '../../api/queries/postsQueries.ts';
import {USER_ME} from '../../api/queries/userQueries.ts';
import ToggleMenu from '../../components/toggleMenu';
import PostModal from '../../components/PostModal';
import {onShare} from '../../utils/shareUtils.ts';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {PostModel, RootStackParamList} from '../../types.ts';
import {styles} from './styles.ts';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const Main = () => {
  const [isTabActive, setTabActive] = useState(true);
  const {
    refetch: refetchMain,
    loading,
    error,
    data,
  } = useQuery(POSTS, {
    variables: {
      input: {
        afterCursor: '',
        limit: isTabActive ? 8 : 10,
        type: isTabActive ? 'NEW' : 'TOP',
      },
    },
  });
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(USER_ME);

  useFocusEffect(
    React.useCallback(() => {
      refetchMain();
    }, []),
  );

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarPosition = useState(new Animated.Value(-288))[0];
  const [overlayOpacity] = useState(new Animated.Value(0));

  const navigation = useNavigation<HomeScreenNavigationProp>();

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
          }}>{`Hello ${
          dataUser?.userMe?.firstName ? dataUser.userMe?.firstName : ``
        }!`}</Text>
        <TouchableOpacity onPress={() => toggleSidebar()}>
          <Image
            style={styles.heading__img}
            source={
              dataUser?.userMe.avatarUrl
                ? {uri: dataUser.userMe.avatarUrl}
                : require('../../assets/images/StateEmptyUserSmall.png')
            }></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={isTabActive ? styles.tab__active : styles.tab}
          onPress={() => {
            setTabActive(true);
          }}>
          <Text
            style={{...styles.tab__text, color: isDark ? `#FFF` : `#131313`}}>
            New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isTabActive ? styles.tab : styles.tab__active}
          onPress={() => {
            setTabActive(false);
          }}>
          <Text
            style={{...styles.tab__text, color: isDark ? `#FFF` : `#131313`}}>
            Top
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data?.posts?.data.map((post: any, id: number) => (
          <PostItem
            key={id}
            post={post}
            onPress={() => openPostModal(post)}
            share={onShare}
          />
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navigation__inner}
          onPress={handleNavigationMainScreen}>
          <Image
            style={styles.navigation__img}
            source={require('../../assets/images/MainActive.png')}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#B8DE64` : `#131313`,
            }}>
            Main
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationFavoritesScreen}>
          <Image
            style={styles.navigation__img}
            source={require('../../assets/images/bookmarkInActive.png')}></Image>
          <Text
            style={{
              ...styles.navigation__text,
              color: isDark ? `#696969` : `#131313`,
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

export default Main;
