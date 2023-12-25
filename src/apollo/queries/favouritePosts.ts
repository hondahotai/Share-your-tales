import {gql} from '@apollo/client';

export const FAVOURITE = gql`
  query favouritePosts($input: FindFavouritePostsRequest!) {
    favouritePosts(input: $input) {
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
