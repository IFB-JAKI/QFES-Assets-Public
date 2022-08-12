/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAssetLocation = /* GraphQL */ `
  subscription OnCreateAssetLocation {
    onCreateAssetLocation {
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
export const onUpdateAssetLocation = /* GraphQL */ `
  subscription OnUpdateAssetLocation {
    onUpdateAssetLocation {
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
export const onDeleteAssetLocation = /* GraphQL */ `
  subscription OnDeleteAssetLocation {
    onDeleteAssetLocation {
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
export const onCreateAssetStatus = /* GraphQL */ `
  subscription OnCreateAssetStatus {
    onCreateAssetStatus {
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
export const onUpdateAssetStatus = /* GraphQL */ `
  subscription OnUpdateAssetStatus {
    onUpdateAssetStatus {
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
export const onDeleteAssetStatus = /* GraphQL */ `
  subscription OnDeleteAssetStatus {
    onDeleteAssetStatus {
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
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset {
    onCreateAsset {
      id
      assetName
      description
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset {
    onUpdateAsset {
      id
      assetName
      description
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset {
    onDeleteAsset {
      id
      assetName
      description
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
export const onCreateAssetType = /* GraphQL */ `
  subscription OnCreateAssetType {
    onCreateAssetType {
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
export const onUpdateAssetType = /* GraphQL */ `
  subscription OnUpdateAssetType {
    onUpdateAssetType {
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
export const onDeleteAssetType = /* GraphQL */ `
  subscription OnDeleteAssetType {
    onDeleteAssetType {
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
export const onCreateAssetLog = /* GraphQL */ `
  subscription OnCreateAssetLog {
    onCreateAssetLog {
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
export const onUpdateAssetLog = /* GraphQL */ `
  subscription OnUpdateAssetLog {
    onUpdateAssetLog {
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
export const onDeleteAssetLog = /* GraphQL */ `
  subscription OnDeleteAssetLog {
    onDeleteAssetLog {
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
export const onCreateAssetGroup = /* GraphQL */ `
  subscription OnCreateAssetGroup {
    onCreateAssetGroup {
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
export const onUpdateAssetGroup = /* GraphQL */ `
  subscription OnUpdateAssetGroup {
    onUpdateAssetGroup {
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
export const onDeleteAssetGroup = /* GraphQL */ `
  subscription OnDeleteAssetGroup {
    onDeleteAssetGroup {
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
