// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AssetLocation, Asset, AssetLog, AssetStatus, AssetType, SimpleAssetGroup } = initSchema(schema);

export {
  AssetLocation,
  Asset,
  AssetLog,
  AssetStatus,
  AssetType,
  SimpleAssetGroup
};