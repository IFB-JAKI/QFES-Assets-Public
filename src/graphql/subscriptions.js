/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAsset = /* GraphQL */ `
  subscription OnCreateAsset {
    onCreateAsset {
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
export const onUpdateAsset = /* GraphQL */ `
  subscription OnUpdateAsset {
    onUpdateAsset {
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
export const onDeleteAsset = /* GraphQL */ `
  subscription OnDeleteAsset {
    onDeleteAsset {
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
export const onCreateTypeTemplate = /* GraphQL */ `
  subscription OnCreateTypeTemplate {
    onCreateTypeTemplate {
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
export const onUpdateTypeTemplate = /* GraphQL */ `
  subscription OnUpdateTypeTemplate {
    onUpdateTypeTemplate {
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
export const onDeleteTypeTemplate = /* GraphQL */ `
  subscription OnDeleteTypeTemplate {
    onDeleteTypeTemplate {
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
export const onCreateAssetEvent = /* GraphQL */ `
  subscription OnCreateAssetEvent {
    onCreateAssetEvent {
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
export const onUpdateAssetEvent = /* GraphQL */ `
  subscription OnUpdateAssetEvent {
    onUpdateAssetEvent {
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
export const onDeleteAssetEvent = /* GraphQL */ `
  subscription OnDeleteAssetEvent {
    onDeleteAssetEvent {
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
export const onCreateKitTemplate = /* GraphQL */ `
  subscription OnCreateKitTemplate {
    onCreateKitTemplate {
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
export const onUpdateKitTemplate = /* GraphQL */ `
  subscription OnUpdateKitTemplate {
    onUpdateKitTemplate {
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
export const onDeleteKitTemplate = /* GraphQL */ `
  subscription OnDeleteKitTemplate {
    onDeleteKitTemplate {
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
