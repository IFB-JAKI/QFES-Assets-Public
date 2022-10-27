import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonButton, useIonRouter, IonCheckbox, useIonToast, IonLabel, IonInput } from '@ionic/react'
import BackButton from '../components/BackButton'
import Header from '../components/Header';
import AssetSelector from '../components/AssetSelector';
import { listAssets, listSimpleAssetGroups, listAssetTypes, listAssetStatuses, listAssetLogs } from '../graphql/queries';
import { API, Storage } from 'aws-amplify';
import Selector from '../components/Selector';

interface ReportProps {
  user: any;
}

const Reports = ({ user }: ReportProps) => {

  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState<string>();
  const [groups, setGroups] = useState([]);
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [type, setType] = useState<any>(undefined);
  const [imageKey, setImageKey] = useState('');
  const [signedURL, setSignedURL] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assetsResult: any = await API.graphql({
          query: listAssets
        });
        setAssets(assetsResult.data.listAssets.items);
      } catch (e: any) {
        console.log("Error fetching Assets:", e);
      }
    }
    const fetchGroups = async () => {
      try {
        const groupsResult: any = await API.graphql({
          query: listSimpleAssetGroups
        });
        setGroups(groupsResult.data.listSimpleAssetGroups.items);
      } catch (e: any) {
        console.log("Error fetching Groups:", e);
      }
    }
    const fetchTypes = async () => {
      try {
        const typesResult: any = await API.graphql({
          query: listAssetTypes
        });
        setTypes(typesResult.data.listAssetTypes.items);
      } catch (e: any) {
        console.log("Error fetching Types:", e);
      }
    }
    const fetchStatuses = async () => {
      try {
        const statusesResult: any = await API.graphql({
          query: listAssetStatuses
        });
        setStatuses(statusesResult.data.listAssetStatuses.items);
      } catch (e: any) {
        console.log("Error fetching Statuses:", e);
      }
    }
    fetchStatuses();
    fetchGroups();
    fetchTypes();
    fetchAssets();
  }, []);

  const exportAllAssetData = () => {
    const data = Array<string>();
    data.push(
      `ID,Name,QRCode,Description,Type,Group,Status,Image,Location,TypeData\n`
    )
    assets.forEach((asset: any) => {
      const type: any = types.find((type: any) => type.id === asset.assetTypeId);
      const group: any = groups.find((group: any) => group.id === asset.assetGroupId);
      const status: any = statuses.find((status: any) => status.id === asset.assetStatusId);
      data.push(
        asset.id + ',' +
        asset.assetName + ',' +
        (asset?.QRCode ?? "") + ',' +
        (asset?.description ?? "") + ',' +
        (type?.typeName ?? "") + ',' +
        (group?.parentAssetID ?? "") + ',' +
        (status?.statusName ?? "") + ',' +
        (asset?.imageLink ?? "") + ',' +
        (asset?.assetlocaID ?? "") + ',' +
        asset.assetTypeData + '\r\n'
      );
    });
    const csvContent = `data:text/csv;charset=utf-8,${data.join("")}`;
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  const exportAssetData = () => {
    const fetchAssetLoans = async () => {
      try {
        const assetResult: any = await API.graphql({
          query: listAssetLogs
        });
        let filteredLogs = assetResult.data.listAssetLogs.items.filter((log: any) => log.assetID === asset)
        let data = '';
        const assetobj: any = assets.find((a: any) => a.id === asset);
        const type: any = types.find((type: any) => type.id === assetobj?.typeID);
        const template = JSON.parse(type.logTemplate);
        let templateString = '';
        template.forEach((field: any) => {
          if (field.type !== 'signature') {
            templateString += ',' + field.name;
          }
        });

        data += `ID,User,Borrowed,Returned,Signature${templateString}\r\n`
        filteredLogs.forEach((log: any) => {
          const logFieldData = JSON.parse(log.assetLogData);
          const borrowDate = log.borrowDate ? new Date(log.borrowDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/') : "";
          const returnDate = log.returnDate ? new Date(log.returnDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/') : "";
          data +=
            log.id + ',' +
            log.borrowerUsername + ',' +
            borrowDate + ',' +
            returnDate + ',' +
            log.borrowerSignature;

          if (logFieldData) {
            logFieldData.forEach((field: any) => {
              if (field.value) {
                data += ',' + field.value;
              }
            });
          }
          data += '\r\n';
          console.log(data);
        });
        const csvContent = `data:text/csv;charset=utf-8,${data}`;
        const encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
      } catch (e: any) {
        console.log("Error fetching Asset:", e);
      }
    }
    fetchAssetLoans();
  }

  const exportTypeData = () => {
    const filteredAssets = assets.filter((asset: any) => asset.typeID === type.id);
    let data = '';
    data += `ID,Name,QRCode,Description,Type,Group,Status,Image,Location`
    if (type) {
      JSON.parse(type.dataTemplate).forEach((field: any) => {
        data += ',' + field.name;
      });
    }
    data+= '\r\n';
    filteredAssets.forEach((asset: any) => {
      data += asset.id + ',' +
        asset.assetName + ',' +
        (asset?.QRCode ?? "") + ',' +
        (asset?.description ?? "") + ',' +
        (type?.typeName ?? "") + ',' +
        (asset?.assetGroupId ?? "") + ',' +
        (asset?.assetStatusId ?? "") + ',' +
        (asset?.imageLink ?? "") + ',' +
        (asset?.assetlocaID ?? "");
      if (asset.assetTypeData) {
        JSON.parse(asset.assetTypeData).forEach((field: any) => {
          if (field.value) {
            data += ',' + field.value;
          }
        });
      }
      data += '\r\n';
    });
    const csvContent = `data:text/csv;charset=utf-8,${data}`;
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  const getImageLink = async () => {
    if (imageKey) {
      setSignedURL(await Storage.get(imageKey, { level: 'protected' }));
    }
  }

  return (
    <IonPage>
      <Header title={"Reports"} user={user} />
      <IonContent>
        <div className="m-4 mb-0">
          <BackButton text="back" />
        </div>
        <div className="bg-white p-4 m-4 rounded-lg shadow">
          <IonButton className='mb-6' onClick={exportAllAssetData}>Export All Asset Data</IonButton>
          <hr></hr>
          <p className='ml-1 mt-6 mb-2'>Export loan data for an asset</p>
          <AssetSelector assets={assets} parentAsset={asset} setParentAsset={setAsset} childAssets={[]} ignoreGroup={true} />
          <IonButton className='mt-4 mb-6' disabled={!asset} onClick={exportAssetData}>Export Asset Data</IonButton>
          <hr></hr>
          <p className='ml-1 mt-6 mb-2'>Export Asset Data based on type</p>
          <Selector queryType={listAssetTypes} handleChange={setType} label="" nameKey="typeName"/>
          <IonButton className='mt-4 mb-6' disabled={!type} onClick={exportTypeData}>Export Type Data</IonButton>
          <hr></hr>
          <p className='ml-1 mt-6 mb-2'>Signature / Image Lookup</p>
          <p className='ml-1 text-sm'>Use this to convert any image key into an aws s3 link</p>
          <IonInput className='mt-4' placeholder="Image Key" value={imageKey} onIonChange={e => setImageKey(e.detail.value!)} />
          <IonButton className='mt-4 mb-6' disabled={!imageKey} onClick={getImageLink}>Get Image Link</IonButton>
          {signedURL && <img className="photo ml-1" width="30%" height="auto" src={signedURL} />}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Reports