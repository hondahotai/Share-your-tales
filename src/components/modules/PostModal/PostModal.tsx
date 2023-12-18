import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {POST} from '../../../apollo/queries/PostQueries.ts';
import {storage} from '../../../utils/storage.ts';

export const PostModal = ({post, visible, onClose, share}: any) => {
  const {loading, error, data} = useQuery(POST, {
    variables: {
      input: {
        id: post?.id,
      },
    },
  });

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
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            style={styles.close}
            source={require('../../../assets/ArrowLeftButtonBack.png')}></Image>
          <Text style={styles.title}>{data?.post?.title}</Text>
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
                : require('../../../assets/StateEmptyUserMedium.png')
            }></Image>
          <Text style={styles.description}>{data?.post.description}</Text>
        </View>
      </View>
      <View style={styles.info__wrapper}>
        <View style={styles.user}>
          <Image
            style={styles.user__img}
            source={
              post?.author.avatarUrl
                ? {uri: post.author.avatarUrl}
                : require('../../../assets/StateEmptyUserSmall.png')
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
              source={require('../../../assets/unlikedButtonHeart.png')}></Image>
            <Text style={styles.info__count}>{post?.likesCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={share}>
            <Image source={require('../../../assets/share.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  info__wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 20,
    paddingHorizontal: 20,
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  modal__inner: {
    padding: 20,
    alignSelf: 'center',
  },
  heading: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: 56,
    paddingVertical: 21,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#131313',
  },
  close: {
    position: 'absolute',
    top: 21,
    left: 16,
  },
  date: {
    color: '#9B9B9B',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 8,
  },
  image: {
    marginBottom: 20,
    borderRadius: 20,
    width: 343,
    height: 226,
  },
  description: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#131313',
  },
});