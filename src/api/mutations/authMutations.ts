import {gql} from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($input: SignInRequest!) {
    userSignIn(input: $input) {
      problem {
        message
      }
      token
      user {
        firstName
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp($input: SignUpRequest!) {
    userSignUp(input: $input) {
      problem {
        message
      }
      token
      user {
        id
      }
    }
  }
`;
