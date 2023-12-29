import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import {storage} from '../../libs/storage.ts';
import {useContext, useRef, useState} from 'react';
import {from, useMutation} from '@apollo/client';
import {POST_DELETE} from '../../api/mutations/postDelete.ts';
import {LIKE} from '../../api/mutations/likeMutation.ts';
import {UNLIKE} from '../../api/mutations/unlikeMutation.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {styles} from './styles.ts';
import {usePostAuthor} from '../../services/handleGetUserName.ts';
import {usePostDate} from '../../services/handleGetDate.ts';
import {PostModel} from '../../types.ts';
import {usePanResponder} from './hooks/panResponder.ts';
import {
  SHARE_ICON,
  SHARE_WHITE,
  SOLID_TRASH,
  STATE_EMPTY_USER_SMALL,
  UNLIKED_BUTTON_HEART,
} from '../../assets/images';

interface PostItemProps {
  post: PostModel;
  onPress: () => void;
  share: () => void;
  isSwipeToDeleteEnabled?: boolean;
  refetch?: () => void;
}

const PostItem = ({
  post,
  onPress,
  share,
  isSwipeToDeleteEnabled,
  refetch,
}: PostItemProps) => {
  const handleGetDate = usePostDate(post);
  const handleGetUserName = usePostAuthor(post);

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const [Delete, {loading, error, data}] = useMutation(POST_DELETE);
  const [Like, {loading: loadingLike, error: errorLike, data: dataLike}] =
    useMutation(LIKE);
  const [
    Unlike,
    {loading: loadingUnlike, error: errorUnlike, data: dataUnlike},
  ] = useMutation(UNLIKE);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const {panResponder, pan, animatedStyle} = usePanResponder(
    isSwipeToDeleteEnabled,
  );

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
            <Image style={styles.delete__image} source={SOLID_TRASH}></Image>
            <Text style={styles.delete__text}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Animated.View
        style={animatedStyle}
        {...(isSwipeToDeleteEnabled ? panResponder?.panHandlers : {})}>
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
                    : STATE_EMPTY_USER_SMALL
                }></Image>
              <Text style={styles.user__name}>{handleGetUserName()}</Text>
            </View>
            <View style={styles.info__btns}>
              <TouchableOpacity
                style={styles.info__like}
                onPress={handleLikeButton}>
                <Image source={UNLIKED_BUTTON_HEART}></Image>
                <Text
                  style={{
                    ...styles.info__count,
                    color: isDark ? `#DEDEDE` : `#131313`,
                  }}>
                  {post.likesCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={share}>
                <Image source={isDark ? SHARE_WHITE : SHARE_ICON}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default PostItem;
