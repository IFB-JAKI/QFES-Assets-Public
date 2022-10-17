import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSplitPane, IonBackButton, IonCardContent, IonIcon, IonLabel, useIonRouter } from '@ionic/react';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';

interface HomeProps {
  user: any;
}

const Home = ({ user }: HomeProps) => {

  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState({ id: undefined });
  const [searchStatus, setSearchStatus] = useState({ id: undefined });
  const [searchLocation, setSearchLocation] = useState({ id: undefined });


  const router = useIonRouter();

  const listAsset = async (allStatus: any[], allLocations: any[], allTypes: any[]): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      let formatted = result.data.listAssets.items.map((asset: any) => {

        const validateID = (id: string, name: string, input: any[]) => {
          let data = null;
          try {
            data = input.find(({ id: itemID }) => itemID === id)[name]
          } catch {
            console.warn(`Invalid ${name} found for ${id} in:`)
            console.warn(input)
          }
          return data;
        }

        return {
          id: asset.id,
          name: asset.assetName,
          statusID: asset.statusID,
          status: (asset.statusID) ? validateID(asset.statusID, 'statusName', allStatus) : null,
          assetlocaID: asset.assetlocaID,
          location: (asset.assetlocaID) ? validateID(asset.assetlocaID, 'locationName', allLocations) : null,
          typeID: asset.typeID,
          type: (asset.typeID) ? validateID(asset.typeID, 'typeName', allTypes) : null,
          updated: asset.updatedAt
        }
      });
      setAssets(formatted);
    } catch (e) {
      console.log(e);
    }
    return;
  };

  const getData = async (queryType: any, array: any): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: queryType,
        authMode: 'AWS_IAM'
      });
      result.data[Object.keys(result.data)[0]].items.forEach((item: any) => {
        array.push(item);
      });
    } catch (e) {
      console.log(e);
    }
    return;
  };

  // const showAsset = async (): Promise<void> => {

  //   // return {
  //   //   filteredAssets.map()
  //   // }
  // }

  useEffect(() => {
    let allStatus: any[] = [];
    let allTypes: any[] = [];
    let allLocations: any[] = [];
    Promise.all([
      getData(listAssetStatuses, allStatus),
      getData(listAssetTypes, allTypes),
      getData(listAssetLocations, allLocations),
    ]).then(
      () => { listAsset(allStatus, allLocations, allTypes) }
    );
  }, []);

  useEffect(() => {
    if (assets && assets.length > 0) {
      let filtered = assets.filter((asset: any) => {
        if (search !== '' && !(asset.name.toLowerCase().includes(search.toLowerCase()) || (('QRCode' in asset) ? asset.QRCode.includes(search) : false))) {
          return false;
        } else {
          if (searchType !== undefined && searchType.id !== undefined && asset.typeID !== searchType.id) {
            return false;
          } else {
            if (searchStatus !== undefined && searchStatus.id !== undefined && asset.statusID !== searchStatus.id) {
              return false;
            } else {
              if (searchLocation !== undefined && searchLocation.id !== undefined && asset.assetlocaID !== searchLocation.id) {
                return false;
              } else {
                return true;
              }
            }
          }
        }
      });
      setFilteredAssets(filtered);
    }
  }, [search, searchStatus, searchType, searchLocation, assets]);


  return (
    <IonPage>
      <Header title={"HOME"} user={user} />


      <div className="grid grid-cols-1">
        <div className="h-full bg-white p-4 m-4 rounded-lg shadow col-span-2" key={1}>
          <IonButton routerLink='/Search' size="large">Search Assets</IonButton>
          <IonButton routerLink='/Groups' size="large">Search Types</IonButton>
          <IonButton routerLink='/Types' size="large">Search Groups</IonButton>
          <IonButton routerLink='/Reports' size="large">Reports</IonButton>
        </div>
      </div>
      <IonContent>
        {
          assets.map((asset: any) => {
            return (
              <div key={asset.id}>
                <IonCard>
                  <IonItem detail routerLink={"/asset/" + asset.id}>

                    <IonThumbnail slot="start">
                      <img src="https://www.australiancomputertraders.com.au/assets/full/HP850G5i52-r.jpg?20220226055643" />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardSubtitle color="danger">On Loan</IonCardSubtitle>
                      <IonCardTitle>{asset.name}</IonCardTitle>
                      {/* <IonIcon name="arrow-dropright" size="large" color="white" slot="end"></IonIcon> */}
                    </IonCardHeader>

                  </IonItem>
                </IonCard>
              </div>
            )
          })
        }
        <BackButton text="back" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
