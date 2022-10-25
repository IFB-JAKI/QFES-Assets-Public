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
        assets.data.listAssets.items.find((asset: any) => {
          if (asset.QRCode === result.text) {
            router.push(`/mobile/asset/${asset.id}`);
          } else {
            throw new Error('No asset found with ' + result.text);
          }
        });
      } catch (e) {
        const presentToast = () => {
          toast({
            message: 'Asset with QR Code ' + result.text + ' not found',
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
