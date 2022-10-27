import { IonContent, IonGrid, IonRow, IonCol, IonPage, IonButton, IonCard, IonItem, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, useIonRouter } from '@ionic/react';
import Header from '../components/Header';
import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import { documentTextOutline, gitNetworkOutline, listOutline, statsChartOutline } from 'ionicons/icons'

interface HomeProps {
  user: any;
}

const Home = ({ user }: HomeProps) => {

  const [assets, setAssets] = useState([]);

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

  return (
    <IonPage>
      <Header title={"HOME"} user={user} />
      <div className="grid grid-cols-1">
        <div className="h-50 bg-white p-4 m-4 rounded-lg shadow" key={1}>
          <div className="grid grid-cols-4">
            <div>
              <IonButton routerLink='/Search' expand="block" size="large">
                <IonIcon slot="start" icon={listOutline}></IonIcon>
                Search Assets
              </IonButton>
            </div>
            <div>
              <IonButton routerLink='/Types' expand="block" size="large">
                <IonIcon slot="start" icon={statsChartOutline}></IonIcon>
                Search Types
              </IonButton>
            </div>
            <div>
              <IonButton routerLink='/Groups' expand="block" size="large">
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
      <h1 className="text-3xl font-montserrat font-bold text-black bg-white md:text-left pt-3 pl-5">Assets</h1>
      <IonContent>
        {
          assets.map((asset: any) => {
            return (
              <div key={asset.id}>
                <IonCard>
                  <IonItem detail routerLink={"/asset/" + asset.id}>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonCardHeader>
                            <IonCardTitle><h1 className="text-2xl font-montserrat font-bold text-black bg-white md:text-left">{asset.name}</h1></IonCardTitle>

                            <IonCardSubtitle>
                              {asset.QRCode ? (<h1 className="text-1xl font-montserrat text-black bg-white md:text-left">{asset.QRCode}</h1>) : <h1 className="text-2xl font-montserrat text-red bg-white md:text-left">No QR Given</h1>}
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