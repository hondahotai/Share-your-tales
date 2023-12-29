import {storage} from '../libs/storage.ts';
import {PostModel} from '../types.ts';

export const usePostDate = (post: PostModel) => {
  return () => {
    let date = new Date(post.createdAt);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear().toString().slice(-2));

    storage.set(`${post.id}`, `${day}.${month}.${year}`);
    return `${day}.${month}.${year}`;
  };
};
