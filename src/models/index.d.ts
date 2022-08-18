import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AssetLocationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssetLogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssetStatusMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssetGroupMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssetTypeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class AssetLocation {
  readonly id: string;
  readonly locationName?: string | null;
  readonly locationID?: (Asset | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AssetLocation, AssetLocationMetaData>);
  static copyOf(source: AssetLocation, mutator: (draft: MutableModel<AssetLocation, AssetLocationMetaData>) => MutableModel<AssetLocation, AssetLocationMetaData> | void): AssetLocation;
}

export declare class Asset {
  readonly id: string;
  readonly assetName: string;
  readonly description?: string | null;
  readonly currentEvent?: string | null;
  readonly typeID: string;
  readonly AssetEvents?: (AssetLog | null)[] | null;
  readonly groupID: string;
  readonly statusID: string;
  readonly imageLink?: string | null;
  readonly assetlocaID: string;
  readonly assetTypeData?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Asset, AssetMetaData>);
  static copyOf(source: Asset, mutator: (draft: MutableModel<Asset, AssetMetaData>) => MutableModel<Asset, AssetMetaData> | void): Asset;
}

export declare class AssetLog {
  readonly id: string;
  readonly borrowDate?: number | null;
  readonly returnDate?: number | null;
  readonly assetLogData?: string | null;
  readonly assetID: string;
  readonly borrowerUsername?: string | null;
  readonly borrowerSignature?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AssetLog, AssetLogMetaData>);
  static copyOf(source: AssetLog, mutator: (draft: MutableModel<AssetLog, AssetLogMetaData>) => MutableModel<AssetLog, AssetLogMetaData> | void): AssetLog;
}

export declare class AssetStatus {
  readonly id: string;
  readonly statusName?: string | null;
  readonly assetStatusID?: (Asset | null)[] | null;
  readonly groupStatusID?: (AssetGroup | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AssetStatus, AssetStatusMetaData>);
  static copyOf(source: AssetStatus, mutator: (draft: MutableModel<AssetStatus, AssetStatusMetaData>) => MutableModel<AssetStatus, AssetStatusMetaData> | void): AssetStatus;
}

export declare class AssetGroup {
  readonly id: string;
  readonly name?: string | null;
  readonly template: string;
  readonly groupID?: (Asset | null)[] | null;
  readonly numAssets?: number | null;
  readonly assetstatusID: string;
  readonly description?: string | null;
  readonly imageLink?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AssetGroup, AssetGroupMetaData>);
  static copyOf(source: AssetGroup, mutator: (draft: MutableModel<AssetGroup, AssetGroupMetaData>) => MutableModel<AssetGroup, AssetGroupMetaData> | void): AssetGroup;
}

export declare class AssetType {
  readonly id: string;
  readonly typeName: string;
  readonly dataTemplate: string;
  readonly typeID?: (Asset | null)[] | null;
  readonly logTemplate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AssetType, AssetTypeMetaData>);
  static copyOf(source: AssetType, mutator: (draft: MutableModel<AssetType, AssetTypeMetaData>) => MutableModel<AssetType, AssetTypeMetaData> | void): AssetType;
}