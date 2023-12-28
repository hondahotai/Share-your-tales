import {gql} from '@apollo/client';

export const POST = gql`
  query post($input: PostIdRequest!) {
    post(input: $input) {
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
