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
import {FAVOURITE} from '../apollo/queries/favouritePosts.ts';
import React, {useContext, useEffect, useState} from 'react';
import {ToggleMenu} from '../components/modules/toggleMenu/toggleMenu.tsx';
import {USER_ME} from '../apollo/queries/userQueries.ts';
import {PostItem} from '../components/modules/PostItem/PostItem.tsx';
import {onShare} from '../utils/shareUtils.ts';
import {PostModal} from '../components/modules/PostModal/PostModal.tsx';
import {EmptyPage} from '../components/modules/EmptyPage/EmptyPage.tsx';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  handleNavigationFavoritesScreen,
  handleNavigationMainScreen,
  handleNavigationMyPostsScreen,
} from '../utils/handleNavigationBottomMenu.ts';
import {ThemeContext} from '../context/ThemeContext.tsx';

export const FavoritesScreen = () => {
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

  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openPostModal = (post: any) => {
    setSelectedPost(post);
    setModalVisible(true);
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
                : require('../assets/StateEmptyUserSmall.png')
            }></Image>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isEmpty ? (
          <EmptyPage />
        ) : (
          data?.favouritePosts?.data.map((post: any, id: number) => (
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
            source={require('../assets/MainInactive.png')}></Image>
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
            source={require('../assets/bookmarkActive.png')}></Image>
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
            source={require('../assets/PostInactive.png')}></Image>
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  heading__text: {
    fontSize: 32,
    color: '#131313',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  heading__img: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 288,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
  navigation: {
    width: 375,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navigation__inner: {
    width: 61,
    height: 'auto',
  },
  navigation__img: {
    alignSelf: 'center',
  },
  navigation__text: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});
