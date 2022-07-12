/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
      id
      name
      description
      status
      currentEvent
      typetemplateID
      AssetEvents {
        nextToken
      }
      kittemplateID
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
        status
        currentEvent
        typetemplateID
        kittemplateID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTypeTemplate = /* GraphQL */ `
  query GetTypeTemplate($id: ID!) {
    getTypeTemplate(id: $id) {
      id
      name
      template
      Assets {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTypeTemplates = /* GraphQL */ `
  query ListTypeTemplates(
    $filter: ModelTypeTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTypeTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        template
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssetEvent = /* GraphQL */ `
  query GetAssetEvent($id: ID!) {
    getAssetEvent(id: $id) {
      id
      borrowed
      returned
      typeinfo
      assetID
      createdAt
      updatedAt
    }
  }
`;
export const listAssetEvents = /* GraphQL */ `
  query ListAssetEvents(
    $filter: ModelAssetEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssetEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        borrowed
        returned
        typeinfo
        assetID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getKitTemplate = /* GraphQL */ `
  query GetKitTemplate($id: ID!) {
    getKitTemplate(id: $id) {
      id
      name
      template
      Assets {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listKitTemplates = /* GraphQL */ `
  query ListKitTemplates(
    $filter: ModelKitTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKitTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        template
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
