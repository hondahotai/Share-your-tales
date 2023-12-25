import {gql} from '@apollo/client';

export const LIKE = gql`
  mutation Like($input: PostIdRequest!) {
    postLike(input: $input) {
      author {
        avatarUrl
        birthDate
        country
        createdAt
        deletedAt
        email
        firstName
        gender
        id
        lastName
        middleName
        phone
        updatedAt
      }
      authorId
      createdAt
      description
      id
      isLiked
      mediaUrl
      title
      likesCount
      updatedAt
    }
  }
`;
