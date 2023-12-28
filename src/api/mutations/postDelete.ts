import {gql} from '@apollo/client';

export const POST_DELETE = gql`
  mutation Delete($input: PostIdRequest!) {
    postDelete(input: $input) {
      id
      ok
    }
  }
`;
