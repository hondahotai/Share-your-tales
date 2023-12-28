import {gql} from '@apollo/client';

export const POSTS = gql`
  query Posts($input: FindPostsRequest!) {
    posts(input: $input) {
      data {
        author {
          avatarUrl
          createdAt
          firstName
          lastName
        }
        authorId
        createdAt
        description
        id
        isLiked
        likesCount
        mediaUrl
        title
        updatedAt
      }
    }
  }
`;
