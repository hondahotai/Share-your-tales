import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Animated,
  PanResponder,
} from 'react-native';
import {storage} from '../../../utils/storage.ts';
import {useContext, useRef, useState} from 'react';
import {useMutation} from '@apollo/client';
import {POST_DELETE} from '../../../apollo/mutations/postDelete.ts';
import {LIKE} from '../../../apollo/mutations/likeMutation.ts';
import {UNLIKE} from '../../../apollo/mutations/unlikeMutation.ts';
import {ThemeContext} from '../../../context/ThemeContext.tsx';

interface PostItemProps {
  post: {id: string; title: string};
  onPress: () => void;
  onShare: () => void;
  onDelete: (id: string) => void;
}

export const PostItem = ({
  post,
  onPress,
  share,
  isSwipeToDeleteEnabled,
  refetch,
}: any) => {
  const handleGetDate = () => {
    let date = new Date(post.createdAt);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear().toString().slice(-2));

    storage.set(`${post.id}`, `${day}.${month}.${year}`);
    return `${day}.${month}.${year}`;
  };
  const handleGetUserName = () => {
    const userName = post.author.firstName;
    const lastName = post.author.lastName;
    if (!userName) {
      return `Anonymous`;
    }
    storage.set(`${post.id}User`, `${userName} ${lastName?.at(0)}.`);
    return `${userName} ${lastName?.at(0)}.`;
  };

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    isSwipeToDeleteEnabled &&
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 10;
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: 0,
          });
        },
        onPanResponderMove: Animated.event([null, {dx: pan.x}], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (e, gestureState) => {
          pan.flattenOffset();
          if (gestureState.dx < -100) {
            Animated.timing(pan.x, {
              toValue: -150,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.spring(pan, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }).start();
          }
        },
      }),
  ).current;

  const animatedStyle = {
    transform: pan.getTranslateTransform(),
  };

  const [Delete, {loading, error, data}] = useMutation(POST_DELETE);
  const [Like, {loading: loadingLike, error: errorLike, data: dataLike}] =
    useMutation(LIKE);
  const [
    Unlike,
    {loading: loadingUnlike, error: errorUnlike, data: dataUnlike},
  ] = useMutation(UNLIKE);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const handleLikeButton = async () => {
    try {
      if (isLiked) {
        await Unlike({
          variables: {
            input: {
              id: post.id,
            },
          },
        });
        setIsLiked(false);
      } else {
        await Like({
          variables: {
            input: {
              id: post.id,
            },
          },
        });
        setIsLiked(true);
      }
    } catch (e) {}
  };

  const handleDeletePost = async () => {
    const apiUrl =
      'https://internship-social-media.purrweb.com/v1/aws/delete-s3-file';
    try {
      const responseGraph = await Delete({
        variables: {
          input: {
            id: post.id,
          },
        },
      });

      const response = await fetch(
        `${apiUrl}?fileCategory=POSTS&fileKey=${encodeURIComponent(post.id)}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${storage.getString('userToken')}`,
          },
        },
      );
      refetch();

      if (response.ok) {
        console.log(response.status);
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? `#1B1B1B` : `#F4F5F4`,
      }}>
      {isSwipeToDeleteEnabled && (
        <Animated.View
          style={[
            styles.delete__button,
            {
              opacity: pan.x.interpolate({
                inputRange: [-150, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: pan.x.interpolate({
                    inputRange: [-150, 0],
                    outputRange: [-50, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity onPress={handleDeletePost}>
            <Image
              style={styles.delete__image}
              source={require('../../../assets/solid-trash.png')}></Image>
            <Text style={styles.delete__text}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Animated.View
        style={animatedStyle}
        {...(isSwipeToDeleteEnabled ? panResponder.panHandlers : {})}>
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
          <View style={styles.heading}>
            <Text style={{...styles.title, color: isDark ? `#FFF` : `#131313`}}>
              {post.title}
            </Text>
            <Text style={styles.date}>{handleGetDate()}</Text>
          </View>
          <Image style={styles.img} source={{uri: post.mediaUrl}}></Image>
          <View style={styles.info__wrapper}>
            <View style={styles.user}>
              <Image
                style={styles.user__img}
                source={
                  post.author.avatarUrl
                    ? {uri: post.author.avatarUrl}
                    : require('../../../assets/StateEmptyUserSmall.png')
                }></Image>
              <Text style={styles.user__name}>{handleGetUserName()}</Text>
            </View>
            <View style={styles.info__btns}>
              <TouchableOpacity
                style={styles.info__like}
                onPress={handleLikeButton}>
                <Image
                  source={require('../../../assets/unlikedButtonHeart.png')}></Image>
                <Text
                  style={{
                    ...styles.info__count,
                    color: isDark ? `#DEDEDE` : `#131313`,
                  }}>
                  {post.likesCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={share}>
                <Image
                  source={
                    isDark
                      ? require('../../../assets/shareWhite.png')
                      : require('../../../assets/share.png')
                  }></Image>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F5F4',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    flex: 1,
    marginVertical: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 13,
  },
  title: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#131313',
  },
  date: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#9B9B9B',
  },
  img: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: 343,
    height: 226,
  },
  info__wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  user__img: {
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  user__name: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#9B9B9B',
  },
  info__btns: {
    flexDirection: 'row',
    gap: 12,
  },
  info__like: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  info__count: {
    color: '#131313',
  },
  delete__button: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: -50,
    width: 130,
    backgroundColor: '#C2534C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  delete__text: {
    color: '#FFF',
    textAlign: 'center',
  },
  delete__image: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});
