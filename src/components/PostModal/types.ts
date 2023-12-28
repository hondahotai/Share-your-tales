import {PostModel} from '../../types.ts';

export interface PostItemProps {
  post?: PostModel;
  visible: boolean;
  onClose: () => void;
  share: () => void;
}
