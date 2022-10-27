import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonToast, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { API } from 'aws-amplify';
import { getAsset, listAssets } from '../../graphql/queries';
import { qrCodeOutline } from 'ionicons/icons';

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
          router.push(`/asset/${found.id}`);
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
      <div className='flex justify-center items-center h-full'>
          <div className='text-2xl rounded-lg cursor-pointer bg-orange drop-shadow-sm flex justify-center items-center text-center flex-col' style={{width: "50vw", height: "50vw"}} onClick={startScan}>
            <IonIcon icon={qrCodeOutline} style={{fontSize: '6rem'}} />
            <p className='mt-1'>Scan QR Code</p>
          </div>
      </div>
    </IonPage>
  );
};

export default QrScan;
