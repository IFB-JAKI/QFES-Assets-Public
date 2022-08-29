import React, {useState, useEffect} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset } from '../graphql/queries';
import BackButton from '../components/BackButton';

interface AssetProps 
  extends RouteComponentProps<{
    id: string;
  }> {}

const EditAsset: React.FC<AssetProps> = ({ match }) => {

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
        {
          (asset) ? (
            <>
              <BackButton text="back" />
              <h1>Edit Information for {asset.assetName}</h1>
      
      
              <IonButton color="primary" href="/Asset/EditAsset">Save</IonButton>
      

            </>
          ) :
          (
            <div>
              <BackButton text="back" />
              <h1>ERROR 404! There is no asset with that ID! Go back</h1>
            </div>
          )
        }
      </IonContent>
    </IonPage>
  )
}

export default EditAsset