import React, { useEffect, useState } from 'react'
import { IonButton, IonPage, IonBackButton, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonThumbnail, IonSearchbar } from '@ionic/react'
import BackButton from '../components/BackButton'
import { pin, wifi, wine, warning, walk, } from 'ionicons/icons';
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import SearchItem from '../components/SearchItem';
import Header from '../components/Header';
import Selector from '../components/Selector';

interface searchProps {
  user: any;
}

const Search = ({ user }: searchProps) => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  const [allStatus, setAllStatus] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState({ name: '', id: null, dataTemplate: '' });
  const [searchStatus, setSearchStatus] = useState({ name: null, id: null });
  const [searchLocation, setSearchLocation] = useState({ name: null, id: null });

  const listAsset = async (): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      setAssets(result.data.listAssets.items);
    } catch (e) {
      console.log(e);
    }
    return;
  };

  useEffect(() => {
    listAsset();
  } , []);

  useEffect(() => {
    const filtered = assets.filter((asset: any) => {
      if (search !== '' && !asset.assetName.toLowerCase().includes(search.toLowerCase())) {
        return false;
      } else {
        if (searchType.id !== null && asset.typeID !== searchType.id) {
          return false;
        } else {
          if (searchStatus.id !== null && asset.statusID !== searchStatus.id) {
            return false;
          } else {
            if (searchLocation.id !== null && asset.assetlocaID !== searchLocation.id) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    });
    console.log(filtered);
    setFilteredAssets(filtered);
  }, [search, searchStatus, searchType, searchLocation]);

  return (
    <IonPage>
      <Header title={"Search Assets"} user={user}/>
      <IonContent>
        <div className="bg-white p-2 m-4 rounded-lg shadow">
          <div className='flex'>
            <IonSearchbar></IonSearchbar>
            <Selector label="Status" queryType={listAssetStatuses} handleChange={setSearchStatus} nameKey="statusName" />
            <Selector label="Type" queryType={listAssetTypes} handleChange={setSearchType} nameKey="typeName" />
            <Selector label="Location" queryType={listAssetLocations} handleChange={setSearchLocation} nameKey="locationName" />
            
          </div>
        {
          filteredAssets.map((asset: any) => {
            return (
              <SearchItem key={asset.id} asset={asset} />
              )
            })
          }
          </div>
      </IonContent>
    </IonPage>
  )
}


export default Search