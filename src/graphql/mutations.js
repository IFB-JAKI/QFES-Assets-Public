/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
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
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
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
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
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
export const createTypeTemplate = /* GraphQL */ `
  mutation CreateTypeTemplate(
    $input: CreateTypeTemplateInput!
    $condition: ModelTypeTemplateConditionInput
  ) {
    createTypeTemplate(input: $input, condition: $condition) {
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
export const updateTypeTemplate = /* GraphQL */ `
  mutation UpdateTypeTemplate(
    $input: UpdateTypeTemplateInput!
    $condition: ModelTypeTemplateConditionInput
  ) {
    updateTypeTemplate(input: $input, condition: $condition) {
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
export const deleteTypeTemplate = /* GraphQL */ `
  mutation DeleteTypeTemplate(
    $input: DeleteTypeTemplateInput!
    $condition: ModelTypeTemplateConditionInput
  ) {
    deleteTypeTemplate(input: $input, condition: $condition) {
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
export const createAssetEvent = /* GraphQL */ `
  mutation CreateAssetEvent(
    $input: CreateAssetEventInput!
    $condition: ModelAssetEventConditionInput
  ) {
    createAssetEvent(input: $input, condition: $condition) {
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
export const updateAssetEvent = /* GraphQL */ `
  mutation UpdateAssetEvent(
    $input: UpdateAssetEventInput!
    $condition: ModelAssetEventConditionInput
  ) {
    updateAssetEvent(input: $input, condition: $condition) {
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
export const deleteAssetEvent = /* GraphQL */ `
  mutation DeleteAssetEvent(
    $input: DeleteAssetEventInput!
    $condition: ModelAssetEventConditionInput
  ) {
    deleteAssetEvent(input: $input, condition: $condition) {
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
export const createKitTemplate = /* GraphQL */ `
  mutation CreateKitTemplate(
    $input: CreateKitTemplateInput!
    $condition: ModelKitTemplateConditionInput
  ) {
    createKitTemplate(input: $input, condition: $condition) {
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
export const updateKitTemplate = /* GraphQL */ `
  mutation UpdateKitTemplate(
    $input: UpdateKitTemplateInput!
    $condition: ModelKitTemplateConditionInput
  ) {
    updateKitTemplate(input: $input, condition: $condition) {
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
export const deleteKitTemplate = /* GraphQL */ `
  mutation DeleteKitTemplate(
    $input: DeleteKitTemplateInput!
    $condition: ModelKitTemplateConditionInput
  ) {
    deleteKitTemplate(input: $input, condition: $condition) {
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
