import {gql} from '@apollo/client';

export const UNLIKE = gql`
  mutation Unlike($input: PostIdRequest!) {
    postUnlike(input: $input) {
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
