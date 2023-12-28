import {gql} from '@apollo/client';

export const MY_POSTS = gql`
  query myPosts($input: FindMyPostsRequest!) {
    myPosts(input: $input) {
      data {
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
  }
`;
