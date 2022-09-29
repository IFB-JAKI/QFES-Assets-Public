/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAssetLocation = /* GraphQL */ `
  subscription OnCreateAssetLocation {
    onCreateAssetLocation {
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
export const onUpdateAssetLocation = /* GraphQL */ `
  subscription OnUpdateAssetLocation {
    onUpdateAssetLocation {
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
export const onDeleteAssetLocation = /* GraphQL */ `
  subscription OnDeleteAssetLocation {
    onDeleteAssetLocation {
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
export const onCreateAssetStatus = /* GraphQL */ `
  subscription OnCreateAssetStatus {
    onCreateAssetStatus {
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
          assetGroupAssetId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAssetStatus = /* GraphQL */ `
  subscription OnUpdateAssetStatus {
    onUpdateAssetStatus {
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
          assetGroupAssetId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAssetStatus = /* GraphQL */ `
  subscription OnDeleteAssetStatus {
    onDeleteAssetStatus {
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
          assetGroupAssetId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset {
    onCreateAsset {
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset {
    onUpdateAsset {
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset {
    onDeleteAsset {
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
export const onCreateAssetType = /* GraphQL */ `
  subscription OnCreateAssetType {
    onCreateAssetType {
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
export const onUpdateAssetType = /* GraphQL */ `
  subscription OnUpdateAssetType {
    onUpdateAssetType {
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
export const onDeleteAssetType = /* GraphQL */ `
  subscription OnDeleteAssetType {
    onDeleteAssetType {
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
export const onCreateAssetLog = /* GraphQL */ `
  subscription OnCreateAssetLog {
    onCreateAssetLog {
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
export const onUpdateAssetLog = /* GraphQL */ `
  subscription OnUpdateAssetLog {
    onUpdateAssetLog {
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
export const onDeleteAssetLog = /* GraphQL */ `
  subscription OnDeleteAssetLog {
    onDeleteAssetLog {
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
export const onCreateAssetGroup = /* GraphQL */ `
  subscription OnCreateAssetGroup {
    onCreateAssetGroup {
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
      assetGroupAssetId
    }
  }
`;
export const onUpdateAssetGroup = /* GraphQL */ `
  subscription OnUpdateAssetGroup {
    onUpdateAssetGroup {
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
      assetGroupAssetId
    }
  }
`;
export const onDeleteAssetGroup = /* GraphQL */ `
  subscription OnDeleteAssetGroup {
    onDeleteAssetGroup {
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
      assetGroupAssetId
    }
  }
`;
