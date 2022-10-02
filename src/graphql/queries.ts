/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAssetLocation = /* GraphQL */ `
  query GetAssetLocation($id: ID!) {
    getAssetLocation(id: $id) {
      id
      locationName
      locationID {
        items {
          id
          assetName
          QRCode
          description
          currentEvent
          typeID
          groupID
          statusID
          imageLink
          assetlocaID
          assetTypeData
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAssetLocations = /* GraphQL */ `
  query ListAssetLocations(
    $filter: ModelAssetLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssetLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        locationName
        locationID {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssetStatus = /* GraphQL */ `
  query GetAssetStatus($id: ID!) {
    getAssetStatus(id: $id) {
      id
      statusName
      assetStatusID {
        items {
          id
          assetName
          QRCode
          description
          currentEvent
          typeID
          groupID
          statusID
          imageLink
          assetlocaID
          assetTypeData
          createdAt
          updatedAt
        }
        nextToken
      }
      groupStatusID {
        items {
          id
          statusID
          createdAt
          updatedAt
          groupAssetId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAssetStatuses = /* GraphQL */ `
  query ListAssetStatuses(
    $filter: ModelAssetStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssetStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        statusName
        assetStatusID {
          nextToken
        }
        groupStatusID {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
      id
      assetName
      QRCode
      description
      currentEvent
      typeID
      AssetEvents {
        items {
          id
          assetID
          borrowDate
          returnDate
          assetLogData
          borrowerUsername
          borrowerSignature
          createdAt
          updatedAt
        }
        nextToken
      }
      groupID
      statusID
      imageLink
      assetlocaID
      assetTypeData
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
        assetName
        QRCode
        description
        currentEvent
        typeID
        AssetEvents {
          nextToken
        }
        groupID
        statusID
        imageLink
        assetlocaID
        assetTypeData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssetType = /* GraphQL */ `
  query GetAssetType($id: ID!) {
    getAssetType(id: $id) {
      id
      typeName
      dataTemplate
      typeID {
        items {
          id
          assetName
          QRCode
          description
          currentEvent
          typeID
          groupID
          statusID
          imageLink
          assetlocaID
          assetTypeData
          createdAt
          updatedAt
        }
        nextToken
      }
      logTemplate
      createdAt
      updatedAt
    }
  }
`;
export const listAssetTypes = /* GraphQL */ `
  query ListAssetTypes(
    $filter: ModelAssetTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssetTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        typeName
        dataTemplate
        typeID {
          nextToken
        }
        logTemplate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssetLog = /* GraphQL */ `
  query GetAssetLog($id: ID!) {
    getAssetLog(id: $id) {
      id
      assetID
      borrowDate
      returnDate
      assetLogData
      borrowerUsername
      borrowerSignature
      createdAt
      updatedAt
    }
  }
`;
export const listAssetLogs = /* GraphQL */ `
  query ListAssetLogs(
    $filter: ModelAssetLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssetLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        assetID
        borrowDate
        returnDate
        assetLogData
        borrowerUsername
        borrowerSignature
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      asset {
        id
        assetName
        QRCode
        description
        currentEvent
        typeID
        AssetEvents {
          nextToken
        }
        groupID
        statusID
        imageLink
        assetlocaID
        assetTypeData
        createdAt
        updatedAt
      }
      childAssets {
        items {
          id
          assetName
          QRCode
          description
          currentEvent
          typeID
          groupID
          statusID
          imageLink
          assetlocaID
          assetTypeData
          createdAt
          updatedAt
        }
        nextToken
      }
      statusID
      createdAt
      updatedAt
      groupAssetId
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        asset {
          id
          assetName
          QRCode
          description
          currentEvent
          typeID
          groupID
          statusID
          imageLink
          assetlocaID
          assetTypeData
          createdAt
          updatedAt
        }
        childAssets {
          nextToken
        }
        statusID
        createdAt
        updatedAt
        groupAssetId
      }
      nextToken
    }
  }
`;
