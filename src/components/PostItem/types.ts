import {PostModel} from '../../types.ts';

export interface PostItemProps {
  post: PostModel;
  onPress: () => void;
  share: () => void;
  isSwipeToDeleteEnabled?: boolean;
  refetch?: () => void;
}
