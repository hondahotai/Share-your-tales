import {storage} from '../libs/storage.ts';
import {PostModel} from '../types.ts';

export const usePostAuthor = (post: PostModel) => {
  return () => {
    const userName = post.author.firstName;
    const lastName = post.author.lastName;
    if (!userName) {
      return `Anonymous`;
    }
    storage.set(`${post.id}User`, `${userName} ${lastName?.at(0)}.`);
    return `${userName} ${lastName?.at(0)}.`;
  };
};
