import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonToast } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { API } from 'aws-amplify';
import { getAsset, listAssets } from '../../graphql/queries';

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
        const assets: any = await API.graphql({
          query: listAssets
        });
        let found = assets.data.listAssets.items.find((asset: any) => {
          if (asset.QRCode === result.text) {
            return asset;
          }
        });
        if (found) {
          router.push(`/mobile/asset/${found.id}`);
        } else {
          throw new Error('Asset with id ' + result.text + 'not found');
        }
      } catch (e :any) {
        console.log(e.message);
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
