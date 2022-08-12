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
          description
          currentEventID
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
          description
          currentEventID
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
          description
          currentEventID
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
          description
          currentEventID
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
          name
          template
          numAssets
          assetstatusID
          description
          imageLink
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
export const onUpdateAssetStatus = /* GraphQL */ `
  subscription OnUpdateAssetStatus {
    onUpdateAssetStatus {
      id
      statusName
      assetStatusID {
        items {
          id
          assetName
          description
          currentEventID
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
          name
          template
          numAssets
          assetstatusID
          description
          imageLink
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
export const onDeleteAssetStatus = /* GraphQL */ `
  subscription OnDeleteAssetStatus {
    onDeleteAssetStatus {
      id
      statusName
      assetStatusID {
        items {
          id
          assetName
          description
          currentEventID
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
          name
          template
          numAssets
          assetstatusID
          description
          imageLink
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
export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset {
    onCreateAsset {
      id
      assetName
      description
      currentEventID
      typeID
      AssetEvents {
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
      description
      currentEventID
      typeID
      AssetEvents {
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
      description
      currentEventID
      typeID
      AssetEvents {
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
          description
          currentEventID
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
          description
          currentEventID
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
          description
          currentEventID
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
      borrowDate
      returnDate
      assetLogData
      assetID
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
      borrowDate
      returnDate
      assetLogData
      assetID
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
      borrowDate
      returnDate
      assetLogData
      assetID
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
      name
      template
      groupID {
        items {
          id
          assetName
          description
          currentEventID
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
      numAssets
      assetstatusID
      description
      imageLink
      createdAt
      updatedAt
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
        items {
          id
          assetName
          description
          currentEventID
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
      numAssets
      assetstatusID
      description
      imageLink
      createdAt
      updatedAt
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
        items {
          id
          assetName
          description
          currentEventID
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
      numAssets
      assetstatusID
      description
      imageLink
      createdAt
      updatedAt
    }
  }
`;
