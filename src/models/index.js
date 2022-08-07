// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AssetLocation, Asset, AssetLog, AssetStatus, AssetGroup, AssetType } = initSchema(schema);

export {
  AssetLocation,
  Asset,
  AssetLog,
  AssetStatus,
  AssetGroup,
  AssetType
};