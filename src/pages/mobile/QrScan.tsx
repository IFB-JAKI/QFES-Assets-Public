import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner';

const QrScan = () => {

  const [data, setData] = useState('No QR code.');

  const openScanner = async () => {
    const scannerOptions: BarcodeScannerOptions = {
      formats: 'QR_CODE',
      preferFrontCamera: true,
      prompt: "Scan Asset QR code"
    }
    const data = await BarcodeScanner.scan(scannerOptions);
    console.log(`Barcode data: ${data.text}`);
  }

  return (
    <IonPage>
      <IonButton onClick={openScanner}>Scan</IonButton>
    </IonPage>
  );
};

export default QrScan;
