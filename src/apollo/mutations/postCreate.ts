import {gql} from '@apollo/client';

export const POST_CREATE = gql`
  mutation PostCreate($input: CreatePostRequest!) {
    postCreate(input: $input) {
      author {
        avatarUrl
        id
      }
      authorId
      createdAt
      deletedAt
      description
      id
      isLiked
      likesCount
      mediaUrl
      title
      updatedAt
    }
  }
`;
