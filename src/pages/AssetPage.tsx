import React, { useEffect, useState } from 'react'
import { IonButton, IonPage, IonContent  } from '@ionic/react'
import BackButton from '../components/BackButton'
import { RouteComponentProps } from 'react-router';
import { API } from 'aws-amplify';
import { getAsset } from '../graphql/queries';


interface SpecifiedAssetProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AssetPage: React.FC<SpecifiedAssetProps> = ({ match }) => {
  const [asset, setAsset] = useState<any>();

  useEffect(() => {
    
    const fetchAsset = async (): Promise<void> => {
      try {
        const result: any = await API.graphql({
          query: getAsset,
          variables: {id: match.params.id},
          authMode: 'AWS_IAM'
        });
        console.log(result);
        setAsset(result.data.getAsset);
      } catch (e) {
        console.log(e);
      }
      return;
    }

    fetchAsset();
    
  }, [match.params.id]);
  return (
    <IonPage>
      <IonContent>
      <BackButton text="back" />
      <h1>Asset Page for {asset.id} NOT IN USE!</h1>
      <p>This would be the page of a specfic item, so it would use the get assetquery, 
        or carry the asset info from previous page</p>
      
      
      <IonButton color="primary" href="/AssetPage/EditAsset">Edit Item</IonButton>
      

      </IonContent>
      
    </IonPage>
  )
}

export default AssetPage