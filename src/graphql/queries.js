/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAssetLocation = /* GraphQL */ `
  query GetAssetLocation($id: ID!) {
    getAssetLocation(id: $id) {
      id
      locationName
      locationID {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAssetLocations = /* GraphQL */ `
  query SyncAssetLocations(
    $filter: ModelAssetLocationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssetLocations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        locationName
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAssetStatus = /* GraphQL */ `
  query GetAssetStatus($id: ID!) {
    getAssetStatus(id: $id) {
      id
      statusName
      assetStatusID {
        nextToken
        startedAt
      }
      groupStatusID {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAssetStatuses = /* GraphQL */ `
  query SyncAssetStatuses(
    $filter: ModelAssetStatusFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssetStatuses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        statusName
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAsset = /* GraphQL */ `
  query GetAsset($id: ID!) {
    getAsset(id: $id) {
      id
      assetName
      description
      status
      currentEvent
      typeID
      AssetEvents {
        nextToken
        startedAt
      }
      groupID
      statusID
      imageLink
      assetlocaID
      assetTypeData
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        description
      }
      nextToken
    }
  }
`;
export const syncAssets = /* GraphQL */ `
  query SyncAssets(
    $filter: ModelAssetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        assetName
        description
        status
        currentEvent
        typeID
        groupID
        statusID
        imageLink
        assetlocaID
        assetTypeData
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        nextToken
        startedAt
      }
      logTemplate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        logTemplate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAssetTypes = /* GraphQL */ `
  query SyncAssetTypes(
    $filter: ModelAssetTypeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssetTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        typeName
        dataTemplate
        logTemplate
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAssetLog = /* GraphQL */ `
  query GetAssetLog($id: ID!) {
    getAssetLog(id: $id) {
      id
      borrowDate
      returnDate
      assetLogData
      assetID
      borrowerUsername
      borrowerSignature
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        borrowDate
        returnDate
        assetLogData
        assetID
        borrowerUsername
        borrowerSignature
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAssetLogs = /* GraphQL */ `
  query SyncAssetLogs(
    $filter: ModelAssetLogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssetLogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        borrowDate
        returnDate
        assetLogData
        assetID
        borrowerUsername
        borrowerSignature
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAssetGroup = /* GraphQL */ `
  query GetAssetGroup($id: ID!) {
    getAssetGroup(id: $id) {
      id
      name
      template
      groupID {
        nextToken
        startedAt
      }
      numAssets
      assetstatusID
      description
      imageLink
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAssetGroups = /* GraphQL */ `
  query ListAssetGroups(
    $filter: ModelAssetGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssetGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        template
        numAssets
        assetstatusID
        description
        imageLink
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAssetGroups = /* GraphQL */ `
  query SyncAssetGroups(
    $filter: ModelAssetGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssetGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        template
        numAssets
        assetstatusID
        description
        imageLink
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
