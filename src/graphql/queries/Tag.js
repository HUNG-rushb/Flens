import { gql } from '@apollo/client';

export const CREATE_TAG = gql`
  mutation CreateTag($createTagData: CreateTagData!) {
    createTag(data: $createTagData) {
      name
      id
    }
  }
`;
