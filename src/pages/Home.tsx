import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonItem, IonThumbnail, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSplitPane, IonBackButton, IonCardContent, IonIcon, IonLabel, useIonRouter } from '@ionic/react';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import { documentTextOutline, gitNetworkOutline, homeOutline, listOutline, logOutOutline, statsChartOutline } from 'ionicons/icons'

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
          updated: asset.updatedAt,
          QRCode: asset.QRCode
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
          <div className="grid grid-cols-4">
            <div>
              <IonButton routerLink='/Search' expand="block" size="large">
                <IonIcon slot="start" icon={listOutline}></IonIcon>
                Search Assets
              </IonButton>
            </div>
            <div>
              <IonButton routerLink='/Groups' expand="block" size="large">
                <IonIcon slot="start" icon={statsChartOutline}></IonIcon>
                Search Types
              </IonButton>
            </div>
            <div>
              <IonButton routerLink='/Types' expand="block" size="large">
                <IonIcon slot="start" icon={gitNetworkOutline}></IonIcon>
                Search Groups
              </IonButton>
            </div>
            <div>
              <IonButton routerLink='/Reports' expand="block" size="large">
                <IonIcon slot="start" icon={documentTextOutline}></IonIcon>
                Reports
              </IonButton>
            </div>
          </div>
        </div>
      </div>
      {/* <ion-card>
  <ion-card-header>
    <ion-card-title>Card Title</ion-card-title>
    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
  </ion-card-header>

  <ion-card-content>
    Here's a small text description for the card content. Nothing more, nothing less.
  </ion-card-content>
</ion-card> */}
      <IonContent>
        {
          assets.map((asset: any) => {
            return (
              <div key={asset.id}>
                <IonCard>
                  <IonItem detail routerLink={"/asset/" + asset.id}>
                    {/* <div className="grid grid-cols-3 grid-rows-1 gap-4">
                      <div className="col-span-2"> */}
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonCardHeader>
                            <IonCardTitle><h1 className="text-2xl font-montserrat font-bold text-black bg-white md:text-left">{asset.name}</h1></IonCardTitle>

                            <IonCardSubtitle>
                              {asset.QRCode ? (<h1 className="text-2xl font-montserrat text-black bg-white md:text-left">{asset.QRCode}</h1>) : <h1 className="text-2xl font-montserrat text-red bg-white md:text-left">No QR Given</h1>}
                            </IonCardSubtitle>
                          </IonCardHeader>
                        </IonCol>
                        <IonCol>
                          <IonCardContent>
                            {(asset.status === "Available") ? (<h1 className="text-2xl font-montserrat font-bold text-green-600 bg-white md:text-left">{asset.status}</h1>)
                              : (asset.status === 'On Loan') ?
                                (<h1 className="text-2xl font-montserrat font-bold text-red bg-white md:text-left">{asset.status}</h1>)
                                : (asset.status === "Archived") ? <h1 className="text-2xl font-montserrat font-bold text-orange bg-white md:text-left">{asset.status}</h1>
                                  : <h1 className="text-2xl font-montserrat font-bold text-primary-200 text-blue bg-white md:text-left">{asset.status}</h1>}
                          </IonCardContent>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    {/* </div> */}
                    {/* <IonThumbnail slot="start">
                      <img src="https://www.australiancomputertraders.com.au/assets/full/HP850G5i52-r.jpg?20220226055643" />
                    </IonThumbnail> */}
                    {/* <div className="col-auto"> */}
                    {/* </div> */}
                    {/* </div> */}
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

<div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>