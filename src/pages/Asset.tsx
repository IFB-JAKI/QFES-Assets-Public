import React, {useState, useEffect} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { API } from 'aws-amplify';
import { getAsset } from '../graphql/queries';

interface AssetProps 
  extends RouteComponentProps<{
    id: string;
  }> {}

const Asset: React.FC<AssetProps> = ({ match }) => {

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
              <p>{asset.id}</p>
              <p>{asset.name}</p>
              <p>{asset.description}</p>
            </>
          ) :
          (
            <div>

            </div>
          )
        }
      </IonContent>
    </IonPage>
  )
}

export default Asset