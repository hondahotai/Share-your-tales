import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';

export const PostItem = ({post}: any) => {
  const handleGetDate = () => {
    let date = new Date(post.createdAt);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear().toString().slice(-2));
    return `${day}.${month}.${year}`;
  };
  const handleGetUserName = () => {
    const userName = post.author.firstName;
    const lastName = post.author.lastName;
    return `${userName} ${lastName.at(0)}.`;
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Поделится постом',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>{handleGetDate()}</Text>
      </View>
      <Image style={styles.img} source={{uri: post.mediaUrl}}></Image>
      <View style={styles.info__wrapper}>
        <View style={styles.user}>
          <Image
            style={styles.user__img}
            source={{uri: post.author.avatarUrl}}></Image>
          <Text style={styles.user__name}>{handleGetUserName()}</Text>
        </View>
        <View style={styles.info__btns}>
          <TouchableOpacity style={styles.info__like}>
            <Image
              source={require('../../../assets/unlikedButtonHeart.png')}></Image>
            <Text style={styles.info__count}>{post.likesCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare}>
            <Image source={require('../../../assets/share.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    flex: 1,
    marginVertical: 4,
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
});
