/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listAssets = /* GraphQL */ `
  query ListAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
