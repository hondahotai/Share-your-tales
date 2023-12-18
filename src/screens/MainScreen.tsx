import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {PostItem} from '../components/modules/PostItem/PostItem.tsx';
import {useQuery} from '@apollo/client';
import {POSTS} from '../apollo/queries/postsQueries.ts';
import {USER_ME} from '../apollo/queries/userQueries.ts';

export const MainScreen = () => {
  const [isTabActive, setTabActive] = useState(true);
  const {loading, error, data} = useQuery(POSTS, {
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

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.heading__text}>{`Hello ${
          dataUser.userMe?.firstName ? dataUser.userMe?.firstName : ``
        }!`}</Text>
        <Image
          style={styles.heading__img}
          source={
            dataUser.userMe.avatarUrl
              ? {uri: dataUser.userMe.avatarUrl}
              : require('../assets/StateEmptyUserSmall.png')
          }></Image>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={isTabActive ? styles.tab__active : styles.tab}
          onPress={() => {
            setTabActive(true);
          }}>
          <Text style={styles.tab__text}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isTabActive ? styles.tab : styles.tab__active}
          onPress={() => {
            setTabActive(false);
          }}>
          <Text style={styles.tab__text}>Top</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data?.posts?.data.map((post: any, id: number) => (
          <PostItem key={id} post={post} />
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navigation__inner}>
          <Image
            style={styles.navigation__img}
            source={require('../assets/MainActive.png')}></Image>
          <Text style={styles.navigation__text}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.navigation__img}
            source={require('../assets/bookmarkInActive.png')}></Image>
          <Text style={styles.navigation__text}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.navigation__img}
            source={require('../assets/PostInactive.png')}></Image>
          <Text style={styles.navigation__text}>My posts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  tab: {
    width: 170,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  tab__active: {
    width: 170,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'rgba(135, 183, 31, 1)',
    borderRadius: 30,
  },
  tab__text: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
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
