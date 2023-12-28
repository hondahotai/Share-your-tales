import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {POST} from '../../api/queries/PostQueries.ts';
import {storage} from '../../libs/storage.ts';
import {useContext} from 'react';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {styles} from './styles.ts';
import {PostItemProps} from './types.ts';

const PostModal = ({post, visible, onClose, share}: PostItemProps) => {
  const {loading, error, data} = useQuery(POST, {
    variables: {
      input: {
        id: post?.id,
      },
    },
  });

  const {isDark, toggleTheme} = useContext(ThemeContext);

  if (loading) {
    return (
      <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
        <View style={styles.container}>
          <Text>Произошла ошибка при загрузке данных</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View
        style={{
          ...styles.container,
          backgroundColor: isDark ? `#131313` : `#FFF`,
        }}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={onClose} style={styles.close__wrap}>
            <Image
              style={styles.close}
              source={
                isDark
                  ? require('../../assets/images/buttonBlackArrowSecond.png')
                  : require('../../assets/images/ArrowLeftButtonBack.png')
              }></Image>
          </TouchableOpacity>
          <Text style={{...styles.title, color: isDark ? `#FFF` : `#131313`}}>
            {data?.post?.title}
          </Text>
        </View>
        <Text style={styles.date}>
          {post ? storage.getString(post.id) : `None date`}
        </Text>
        <View style={styles.modal__inner}>
          <Image
            style={styles.image}
            source={
              post
                ? {uri: data?.post.mediaUrl}
                : require('../../assets/images/StateEmptyUserMedium.png')
            }></Image>
          <Text
            style={{
              ...styles.description,
              color: isDark ? `#DEDEDE` : `#131313`,
            }}>
            {data?.post.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          ...styles.info__wrapper,
          backgroundColor: isDark ? `#131313` : `#FFF`,
        }}>
        <View style={styles.user}>
          <Image
            style={styles.user__img}
            source={
              post?.author.avatarUrl
                ? {uri: post.author.avatarUrl}
                : require('../../assets/images/StateEmptyUserSmall.png')
            }></Image>
          <Text style={styles.user__name}>
            {post && storage.getString(`${post.id}User`)
              ? storage.getString(`${post.id}User`)
              : `Anonymous`}
          </Text>
        </View>
        <View style={styles.info__btns}>
          <TouchableOpacity style={styles.info__like}>
            <Image
              source={require('../../assets/images/unlikedButtonHeart.png')}></Image>
            <Text
              style={{
                ...styles.info__count,
                color: isDark ? `#DEDEDE` : `#131313`,
              }}>
              {post?.likesCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={share}>
            <Image
              source={
                isDark
                  ? require('../../assets/images/shareWhite.png')
                  : require('../../assets/images/share.png')
              }></Image>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PostModal;
