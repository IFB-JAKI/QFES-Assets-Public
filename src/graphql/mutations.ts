/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAssetLocation = /* GraphQL */ `
  mutation CreateAssetLocation(
    $input: CreateAssetLocationInput!
    $condition: ModelAssetLocationConditionInput
  ) {
    createAssetLocation(input: $input, condition: $condition) {
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
export const updateAssetLocation = /* GraphQL */ `
  mutation UpdateAssetLocation(
    $input: UpdateAssetLocationInput!
    $condition: ModelAssetLocationConditionInput
  ) {
    updateAssetLocation(input: $input, condition: $condition) {
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
export const deleteAssetLocation = /* GraphQL */ `
  mutation DeleteAssetLocation(
    $input: DeleteAssetLocationInput!
    $condition: ModelAssetLocationConditionInput
  ) {
    deleteAssetLocation(input: $input, condition: $condition) {
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
export const createAssetStatus = /* GraphQL */ `
  mutation CreateAssetStatus(
    $input: CreateAssetStatusInput!
    $condition: ModelAssetStatusConditionInput
  ) {
    createAssetStatus(input: $input, condition: $condition) {
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
export const updateAssetStatus = /* GraphQL */ `
  mutation UpdateAssetStatus(
    $input: UpdateAssetStatusInput!
    $condition: ModelAssetStatusConditionInput
  ) {
    updateAssetStatus(input: $input, condition: $condition) {
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
export const deleteAssetStatus = /* GraphQL */ `
  mutation DeleteAssetStatus(
    $input: DeleteAssetStatusInput!
    $condition: ModelAssetStatusConditionInput
  ) {
    deleteAssetStatus(input: $input, condition: $condition) {
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
export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
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
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
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
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
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
export const createAssetType = /* GraphQL */ `
  mutation CreateAssetType(
    $input: CreateAssetTypeInput!
    $condition: ModelAssetTypeConditionInput
  ) {
    createAssetType(input: $input, condition: $condition) {
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
export const updateAssetType = /* GraphQL */ `
  mutation UpdateAssetType(
    $input: UpdateAssetTypeInput!
    $condition: ModelAssetTypeConditionInput
  ) {
    updateAssetType(input: $input, condition: $condition) {
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
export const deleteAssetType = /* GraphQL */ `
  mutation DeleteAssetType(
    $input: DeleteAssetTypeInput!
    $condition: ModelAssetTypeConditionInput
  ) {
    deleteAssetType(input: $input, condition: $condition) {
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
export const createAssetLog = /* GraphQL */ `
  mutation CreateAssetLog(
    $input: CreateAssetLogInput!
    $condition: ModelAssetLogConditionInput
  ) {
    createAssetLog(input: $input, condition: $condition) {
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
export const updateAssetLog = /* GraphQL */ `
  mutation UpdateAssetLog(
    $input: UpdateAssetLogInput!
    $condition: ModelAssetLogConditionInput
  ) {
    updateAssetLog(input: $input, condition: $condition) {
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
export const deleteAssetLog = /* GraphQL */ `
  mutation DeleteAssetLog(
    $input: DeleteAssetLogInput!
    $condition: ModelAssetLogConditionInput
  ) {
    deleteAssetLog(input: $input, condition: $condition) {
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
export const createAssetGroup = /* GraphQL */ `
  mutation CreateAssetGroup(
    $input: CreateAssetGroupInput!
    $condition: ModelAssetGroupConditionInput
  ) {
    createAssetGroup(input: $input, condition: $condition) {
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
export const updateAssetGroup = /* GraphQL */ `
  mutation UpdateAssetGroup(
    $input: UpdateAssetGroupInput!
    $condition: ModelAssetGroupConditionInput
  ) {
    updateAssetGroup(input: $input, condition: $condition) {
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
export const deleteAssetGroup = /* GraphQL */ `
  mutation DeleteAssetGroup(
    $input: DeleteAssetGroupInput!
    $condition: ModelAssetGroupConditionInput
  ) {
    deleteAssetGroup(input: $input, condition: $condition) {
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
