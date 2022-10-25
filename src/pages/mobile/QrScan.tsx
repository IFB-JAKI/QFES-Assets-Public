import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonToast } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { API } from 'aws-amplify';
import { getAsset } from '../../graphql/queries';

/*
  * BarcodeScanner is a plugin for Capacitor used here to scan QR Codes
  * Note that this page is mobile only, browser should never redirect here as it is not supported 
*/
const QrScan = () => {

  const router = useIonRouter();
  const [toast] = useIonToast();

  const startScan = async () => {
    
    const result = await BarcodeScanner.scan();
    if (result.text) {
      try {
        const asset: any = await API.graphql({
          query: getAsset,
          variables: {
            input: {
              QRCode: result.text
            }
          }
        });
        if (asset.data.getAsset) {
          router.push(`/mobile/asset/${asset.data.getAsset.id}`);
        }
      } catch (e) {
        const presentToast = () => {
          toast({
            message: 'QR Could not be read',
            duration: 1500,
            position: 'bottom'
          });
        }
        presentToast();
      }
    }
  };

  return (
    <IonPage>
      <IonButton onClick={startScan}>Scan</IonButton>
    </IonPage>
  );
};

export default QrScan;
