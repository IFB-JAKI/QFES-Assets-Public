/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAssetLocationInput = {
  id?: string | null,
  locationName: string,
};

export type ModelAssetLocationConditionInput = {
  locationName?: ModelStringInput | null,
  and?: Array< ModelAssetLocationConditionInput | null > | null,
  or?: Array< ModelAssetLocationConditionInput | null > | null,
  not?: ModelAssetLocationConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type AssetLocation = {
  __typename: "AssetLocation",
  id: string,
  locationName: string,
  locationID?: ModelAssetConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAssetConnection = {
  __typename: "ModelAssetConnection",
  items:  Array<Asset | null >,
  nextToken?: string | null,
};

export type Asset = {
  __typename: "Asset",
  id: string,
  assetName: string,
  QRCode?: string | null,
  description?: string | null,
  currentEvent?: string | null,
  typeID?: string | null,
  AssetEvents?: ModelAssetLogConnection | null,
  groupID?: string | null,
  statusID?: string | null,
  imageLink?: string | null,
  assetlocaID?: string | null,
  assetTypeData?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAssetLogConnection = {
  __typename: "ModelAssetLogConnection",
  items:  Array<AssetLog | null >,
  nextToken?: string | null,
};

export type AssetLog = {
  __typename: "AssetLog",
  id: string,
  assetID: string,
  borrowDate?: number | null,
  returnDate?: number | null,
  assetLogData?: string | null,
  borrowerUsername?: string | null,
  borrowerSignature?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAssetLocationInput = {
  id: string,
  locationName?: string | null,
};

export type DeleteAssetLocationInput = {
  id: string,
};

export type CreateAssetStatusInput = {
  id?: string | null,
  statusName: string,
};

export type ModelAssetStatusConditionInput = {
  statusName?: ModelStringInput | null,
  and?: Array< ModelAssetStatusConditionInput | null > | null,
  or?: Array< ModelAssetStatusConditionInput | null > | null,
  not?: ModelAssetStatusConditionInput | null,
};

export type AssetStatus = {
  __typename: "AssetStatus",
  id: string,
  statusName: string,
  assetStatusID?: ModelAssetConnection | null,
  groupStatusID?: ModelAssetGroupConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAssetGroupConnection = {
  __typename: "ModelAssetGroupConnection",
  items:  Array<AssetGroup | null >,
  nextToken?: string | null,
};

export type AssetGroup = {
  __typename: "AssetGroup",
  id: string,
  name: string,
  template?: string | null,
  groupID?: ModelAssetConnection | null,
  numAssets?: number | null,
  assetstatusID?: string | null,
  description?: string | null,
  imageLink?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAssetStatusInput = {
  id: string,
  statusName?: string | null,
};

export type DeleteAssetStatusInput = {
  id: string,
};

export type CreateAssetInput = {
  id?: string | null,
  assetName: string,
  QRCode?: string | null,
  description?: string | null,
  currentEvent?: string | null,
  typeID?: string | null,
  groupID?: string | null,
  statusID?: string | null,
  imageLink?: string | null,
  assetlocaID?: string | null,
  assetTypeData?: string | null,
};

export type ModelAssetConditionInput = {
  assetName?: ModelStringInput | null,
  QRCode?: ModelStringInput | null,
  description?: ModelStringInput | null,
  currentEvent?: ModelStringInput | null,
  typeID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  statusID?: ModelIDInput | null,
  imageLink?: ModelStringInput | null,
  assetlocaID?: ModelIDInput | null,
  assetTypeData?: ModelStringInput | null,
  and?: Array< ModelAssetConditionInput | null > | null,
  or?: Array< ModelAssetConditionInput | null > | null,
  not?: ModelAssetConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateAssetInput = {
  id: string,
  assetName?: string | null,
  QRCode?: string | null,
  description?: string | null,
  currentEvent?: string | null,
  typeID?: string | null,
  groupID?: string | null,
  statusID?: string | null,
  imageLink?: string | null,
  assetlocaID?: string | null,
  assetTypeData?: string | null,
};

export type DeleteAssetInput = {
  id: string,
};

export type CreateAssetTypeInput = {
  id?: string | null,
  typeName: string,
  dataTemplate?: string | null,
  logTemplate?: string | null,
};

export type ModelAssetTypeConditionInput = {
  typeName?: ModelStringInput | null,
  dataTemplate?: ModelStringInput | null,
  logTemplate?: ModelStringInput | null,
  and?: Array< ModelAssetTypeConditionInput | null > | null,
  or?: Array< ModelAssetTypeConditionInput | null > | null,
  not?: ModelAssetTypeConditionInput | null,
};

export type AssetType = {
  __typename: "AssetType",
  id: string,
  typeName: string,
  dataTemplate?: string | null,
  typeID?: ModelAssetConnection | null,
  logTemplate?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAssetTypeInput = {
  id: string,
  typeName?: string | null,
  dataTemplate?: string | null,
  logTemplate?: string | null,
};

export type DeleteAssetTypeInput = {
  id: string,
};

export type CreateAssetLogInput = {
  id?: string | null,
  assetID: string,
  borrowDate?: number | null,
  returnDate?: number | null,
  assetLogData?: string | null,
  borrowerUsername?: string | null,
  borrowerSignature?: string | null,
};

export type ModelAssetLogConditionInput = {
  assetID?: ModelIDInput | null,
  borrowDate?: ModelIntInput | null,
  returnDate?: ModelIntInput | null,
  assetLogData?: ModelStringInput | null,
  borrowerUsername?: ModelStringInput | null,
  borrowerSignature?: ModelStringInput | null,
  and?: Array< ModelAssetLogConditionInput | null > | null,
  or?: Array< ModelAssetLogConditionInput | null > | null,
  not?: ModelAssetLogConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAssetLogInput = {
  id: string,
  assetID?: string | null,
  borrowDate?: number | null,
  returnDate?: number | null,
  assetLogData?: string | null,
  borrowerUsername?: string | null,
  borrowerSignature?: string | null,
};

export type DeleteAssetLogInput = {
  id: string,
};

export type CreateAssetGroupInput = {
  id?: string | null,
  name: string,
  template?: string | null,
  numAssets?: number | null,
  assetstatusID?: string | null,
  description?: string | null,
  imageLink?: string | null,
};

export type ModelAssetGroupConditionInput = {
  name?: ModelStringInput | null,
  template?: ModelStringInput | null,
  numAssets?: ModelIntInput | null,
  assetstatusID?: ModelIDInput | null,
  description?: ModelStringInput | null,
  imageLink?: ModelStringInput | null,
  and?: Array< ModelAssetGroupConditionInput | null > | null,
  or?: Array< ModelAssetGroupConditionInput | null > | null,
  not?: ModelAssetGroupConditionInput | null,
};

export type UpdateAssetGroupInput = {
  id: string,
  name?: string | null,
  template?: string | null,
  numAssets?: number | null,
  assetstatusID?: string | null,
  description?: string | null,
  imageLink?: string | null,
};

export type DeleteAssetGroupInput = {
  id: string,
};

export type ModelAssetLocationFilterInput = {
  id?: ModelIDInput | null,
  locationName?: ModelStringInput | null,
  and?: Array< ModelAssetLocationFilterInput | null > | null,
  or?: Array< ModelAssetLocationFilterInput | null > | null,
  not?: ModelAssetLocationFilterInput | null,
};

export type ModelAssetLocationConnection = {
  __typename: "ModelAssetLocationConnection",
  items:  Array<AssetLocation | null >,
  nextToken?: string | null,
};

export type ModelAssetStatusFilterInput = {
  id?: ModelIDInput | null,
  statusName?: ModelStringInput | null,
  and?: Array< ModelAssetStatusFilterInput | null > | null,
  or?: Array< ModelAssetStatusFilterInput | null > | null,
  not?: ModelAssetStatusFilterInput | null,
};

export type ModelAssetStatusConnection = {
  __typename: "ModelAssetStatusConnection",
  items:  Array<AssetStatus | null >,
  nextToken?: string | null,
};

export type ModelAssetFilterInput = {
  id?: ModelIDInput | null,
  assetName?: ModelStringInput | null,
  QRCode?: ModelStringInput | null,
  description?: ModelStringInput | null,
  currentEvent?: ModelStringInput | null,
  typeID?: ModelIDInput | null,
  groupID?: ModelIDInput | null,
  statusID?: ModelIDInput | null,
  imageLink?: ModelStringInput | null,
  assetlocaID?: ModelIDInput | null,
  assetTypeData?: ModelStringInput | null,
  and?: Array< ModelAssetFilterInput | null > | null,
  or?: Array< ModelAssetFilterInput | null > | null,
  not?: ModelAssetFilterInput | null,
};

export type ModelAssetTypeFilterInput = {
  id?: ModelIDInput | null,
  typeName?: ModelStringInput | null,
  dataTemplate?: ModelStringInput | null,
  logTemplate?: ModelStringInput | null,
  and?: Array< ModelAssetTypeFilterInput | null > | null,
  or?: Array< ModelAssetTypeFilterInput | null > | null,
  not?: ModelAssetTypeFilterInput | null,
};

export type ModelAssetTypeConnection = {
  __typename: "ModelAssetTypeConnection",
  items:  Array<AssetType | null >,
  nextToken?: string | null,
};

export type ModelAssetLogFilterInput = {
  id?: ModelIDInput | null,
  assetID?: ModelIDInput | null,
  borrowDate?: ModelIntInput | null,
  returnDate?: ModelIntInput | null,
  assetLogData?: ModelStringInput | null,
  borrowerUsername?: ModelStringInput | null,
  borrowerSignature?: ModelStringInput | null,
  and?: Array< ModelAssetLogFilterInput | null > | null,
  or?: Array< ModelAssetLogFilterInput | null > | null,
  not?: ModelAssetLogFilterInput | null,
};

export type ModelAssetGroupFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  template?: ModelStringInput | null,
  numAssets?: ModelIntInput | null,
  assetstatusID?: ModelIDInput | null,
  description?: ModelStringInput | null,
  imageLink?: ModelStringInput | null,
  and?: Array< ModelAssetGroupFilterInput | null > | null,
  or?: Array< ModelAssetGroupFilterInput | null > | null,
  not?: ModelAssetGroupFilterInput | null,
};

export type CreateAssetLocationMutationVariables = {
  input: CreateAssetLocationInput,
  condition?: ModelAssetLocationConditionInput | null,
};

export type CreateAssetLocationMutation = {
  createAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAssetLocationMutationVariables = {
  input: UpdateAssetLocationInput,
  condition?: ModelAssetLocationConditionInput | null,
};

export type UpdateAssetLocationMutation = {
  updateAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAssetLocationMutationVariables = {
  input: DeleteAssetLocationInput,
  condition?: ModelAssetLocationConditionInput | null,
};

export type DeleteAssetLocationMutation = {
  deleteAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAssetStatusMutationVariables = {
  input: CreateAssetStatusInput,
  condition?: ModelAssetStatusConditionInput | null,
};

export type CreateAssetStatusMutation = {
  createAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAssetStatusMutationVariables = {
  input: UpdateAssetStatusInput,
  condition?: ModelAssetStatusConditionInput | null,
};

export type UpdateAssetStatusMutation = {
  updateAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAssetStatusMutationVariables = {
  input: DeleteAssetStatusInput,
  condition?: ModelAssetStatusConditionInput | null,
};

export type DeleteAssetStatusMutation = {
  deleteAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAssetMutationVariables = {
  input: CreateAssetInput,
  condition?: ModelAssetConditionInput | null,
};

export type CreateAssetMutation = {
  createAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAssetMutationVariables = {
  input: UpdateAssetInput,
  condition?: ModelAssetConditionInput | null,
};

export type UpdateAssetMutation = {
  updateAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAssetMutationVariables = {
  input: DeleteAssetInput,
  condition?: ModelAssetConditionInput | null,
};

export type DeleteAssetMutation = {
  deleteAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAssetTypeMutationVariables = {
  input: CreateAssetTypeInput,
  condition?: ModelAssetTypeConditionInput | null,
};

export type CreateAssetTypeMutation = {
  createAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAssetTypeMutationVariables = {
  input: UpdateAssetTypeInput,
  condition?: ModelAssetTypeConditionInput | null,
};

export type UpdateAssetTypeMutation = {
  updateAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAssetTypeMutationVariables = {
  input: DeleteAssetTypeInput,
  condition?: ModelAssetTypeConditionInput | null,
};

export type DeleteAssetTypeMutation = {
  deleteAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAssetLogMutationVariables = {
  input: CreateAssetLogInput,
  condition?: ModelAssetLogConditionInput | null,
};

export type CreateAssetLogMutation = {
  createAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAssetLogMutationVariables = {
  input: UpdateAssetLogInput,
  condition?: ModelAssetLogConditionInput | null,
};

export type UpdateAssetLogMutation = {
  updateAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAssetLogMutationVariables = {
  input: DeleteAssetLogInput,
  condition?: ModelAssetLogConditionInput | null,
};

export type DeleteAssetLogMutation = {
  deleteAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAssetGroupMutationVariables = {
  input: CreateAssetGroupInput,
  condition?: ModelAssetGroupConditionInput | null,
};

export type CreateAssetGroupMutation = {
  createAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAssetGroupMutationVariables = {
  input: UpdateAssetGroupInput,
  condition?: ModelAssetGroupConditionInput | null,
};

export type UpdateAssetGroupMutation = {
  updateAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAssetGroupMutationVariables = {
  input: DeleteAssetGroupInput,
  condition?: ModelAssetGroupConditionInput | null,
};

export type DeleteAssetGroupMutation = {
  deleteAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAssetLocationQueryVariables = {
  id: string,
};

export type GetAssetLocationQuery = {
  getAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAssetLocationsQueryVariables = {
  filter?: ModelAssetLocationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAssetLocationsQuery = {
  listAssetLocations?:  {
    __typename: "ModelAssetLocationConnection",
    items:  Array< {
      __typename: "AssetLocation",
      id: string,
      locationName: string,
      locationID?:  {
        __typename: "ModelAssetConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAssetStatusQueryVariables = {
  id: string,
};

export type GetAssetStatusQuery = {
  getAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAssetStatusesQueryVariables = {
  filter?: ModelAssetStatusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAssetStatusesQuery = {
  listAssetStatuses?:  {
    __typename: "ModelAssetStatusConnection",
    items:  Array< {
      __typename: "AssetStatus",
      id: string,
      statusName: string,
      assetStatusID?:  {
        __typename: "ModelAssetConnection",
        nextToken?: string | null,
      } | null,
      groupStatusID?:  {
        __typename: "ModelAssetGroupConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAssetQueryVariables = {
  id: string,
};

export type GetAssetQuery = {
  getAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAssetsQueryVariables = {
  filter?: ModelAssetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAssetsQuery = {
  listAssets?:  {
    __typename: "ModelAssetConnection",
    items:  Array< {
      __typename: "Asset",
      id: string,
      assetName: string,
      QRCode?: string | null,
      description?: string | null,
      currentEvent?: string | null,
      typeID?: string | null,
      AssetEvents?:  {
        __typename: "ModelAssetLogConnection",
        nextToken?: string | null,
      } | null,
      groupID?: string | null,
      statusID?: string | null,
      imageLink?: string | null,
      assetlocaID?: string | null,
      assetTypeData?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAssetTypeQueryVariables = {
  id: string,
};

export type GetAssetTypeQuery = {
  getAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAssetTypesQueryVariables = {
  filter?: ModelAssetTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAssetTypesQuery = {
  listAssetTypes?:  {
    __typename: "ModelAssetTypeConnection",
    items:  Array< {
      __typename: "AssetType",
      id: string,
      typeName: string,
      dataTemplate?: string | null,
      typeID?:  {
        __typename: "ModelAssetConnection",
        nextToken?: string | null,
      } | null,
      logTemplate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAssetLogQueryVariables = {
  id: string,
};

export type GetAssetLogQuery = {
  getAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAssetLogsQueryVariables = {
  filter?: ModelAssetLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAssetLogsQuery = {
  listAssetLogs?:  {
    __typename: "ModelAssetLogConnection",
    items:  Array< {
      __typename: "AssetLog",
      id: string,
      assetID: string,
      borrowDate?: number | null,
      returnDate?: number | null,
      assetLogData?: string | null,
      borrowerUsername?: string | null,
      borrowerSignature?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAssetGroupQueryVariables = {
  id: string,
};

export type GetAssetGroupQuery = {
  getAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAssetGroupsQueryVariables = {
  filter?: ModelAssetGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAssetGroupsQuery = {
  listAssetGroups?:  {
    __typename: "ModelAssetGroupConnection",
    items:  Array< {
      __typename: "AssetGroup",
      id: string,
      name: string,
      template?: string | null,
      groupID?:  {
        __typename: "ModelAssetConnection",
        nextToken?: string | null,
      } | null,
      numAssets?: number | null,
      assetstatusID?: string | null,
      description?: string | null,
      imageLink?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAssetLocationSubscription = {
  onCreateAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAssetLocationSubscription = {
  onUpdateAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAssetLocationSubscription = {
  onDeleteAssetLocation?:  {
    __typename: "AssetLocation",
    id: string,
    locationName: string,
    locationID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAssetStatusSubscription = {
  onCreateAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAssetStatusSubscription = {
  onUpdateAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAssetStatusSubscription = {
  onDeleteAssetStatus?:  {
    __typename: "AssetStatus",
    id: string,
    statusName: string,
    assetStatusID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupStatusID?:  {
      __typename: "ModelAssetGroupConnection",
      items:  Array< {
        __typename: "AssetGroup",
        id: string,
        name: string,
        template?: string | null,
        numAssets?: number | null,
        assetstatusID?: string | null,
        description?: string | null,
        imageLink?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAssetSubscription = {
  onCreateAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAssetSubscription = {
  onUpdateAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAssetSubscription = {
  onDeleteAsset?:  {
    __typename: "Asset",
    id: string,
    assetName: string,
    QRCode?: string | null,
    description?: string | null,
    currentEvent?: string | null,
    typeID?: string | null,
    AssetEvents?:  {
      __typename: "ModelAssetLogConnection",
      items:  Array< {
        __typename: "AssetLog",
        id: string,
        assetID: string,
        borrowDate?: number | null,
        returnDate?: number | null,
        assetLogData?: string | null,
        borrowerUsername?: string | null,
        borrowerSignature?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    groupID?: string | null,
    statusID?: string | null,
    imageLink?: string | null,
    assetlocaID?: string | null,
    assetTypeData?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAssetTypeSubscription = {
  onCreateAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAssetTypeSubscription = {
  onUpdateAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAssetTypeSubscription = {
  onDeleteAssetType?:  {
    __typename: "AssetType",
    id: string,
    typeName: string,
    dataTemplate?: string | null,
    typeID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    logTemplate?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAssetLogSubscription = {
  onCreateAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAssetLogSubscription = {
  onUpdateAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAssetLogSubscription = {
  onDeleteAssetLog?:  {
    __typename: "AssetLog",
    id: string,
    assetID: string,
    borrowDate?: number | null,
    returnDate?: number | null,
    assetLogData?: string | null,
    borrowerUsername?: string | null,
    borrowerSignature?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAssetGroupSubscription = {
  onCreateAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAssetGroupSubscription = {
  onUpdateAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAssetGroupSubscription = {
  onDeleteAssetGroup?:  {
    __typename: "AssetGroup",
    id: string,
    name: string,
    template?: string | null,
    groupID?:  {
      __typename: "ModelAssetConnection",
      items:  Array< {
        __typename: "Asset",
        id: string,
        assetName: string,
        QRCode?: string | null,
        description?: string | null,
        currentEvent?: string | null,
        typeID?: string | null,
        groupID?: string | null,
        statusID?: string | null,
        imageLink?: string | null,
        assetlocaID?: string | null,
        assetTypeData?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAssets?: number | null,
    assetstatusID?: string | null,
    description?: string | null,
    imageLink?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
