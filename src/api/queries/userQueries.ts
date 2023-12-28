import {gql} from '@apollo/client';

export const USER_ME = gql`
  query UserMe {
    userMe {
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
  }
`;
