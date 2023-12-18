import {gql} from '@apollo/client';

export const PROFILE_EDIT = gql`
  mutation UserEditProfile($input: EditProfileRequest!) {
    userEditProfile(input: $input) {
      user {
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
  }
`;
