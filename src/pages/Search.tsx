import React, { useEffect, useState } from 'react'
import { IonButton, IonPage, IonBackButton, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonThumbnail, IonSearchbar, useIonRouter } from '@ionic/react'
import BackButton from '../components/BackButton'
import { pin, wifi, wine, warning, walk, } from 'ionicons/icons';
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import SearchItem from '../components/SearchItem';
import Header from '../components/Header';
import Selector from '../components/Selector';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 1 },
    { headerName: "Type", field: "type", sortable: true, filter: true, flex: 1 },
    { headerName: "Status", field: "status", sortable: true, filter: true, flex: 1 },
    { headerName: "Location", field: "location", sortable: true, filter: true, flex: 1 },
    { headerName: "Updated", field: "updated", sortable: true, filter: true, flex: 1 }
  ]);

  const router = useIonRouter();

  const listAsset = async (): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      let formatted = result.data.listAssets.items.map((asset: any) => {
        return {
          id: asset.id,
          name: asset.assetName,
          type: asset.typeID,
          status: asset.statusID,
          location: asset.assetlocaID,
          updated: asset.updatedAt
        }
      });
      setAssets(formatted);
      console.log(formatted);
    } catch (e) {
      console.log(e);
    }
    return;
  };

  useEffect(() => {
    listAsset();
  }, []);

  useEffect(() => {
    if (assets && assets.length > 0) {
      let filtered = assets.filter((asset: any) => {
        if (search !== '' && !asset.name.toLowerCase().includes(search.toLowerCase())) {
          return false;
        } else {
          if (searchType.id !== null && asset.type !== searchType.id) {
            return false;
          } else {
            if (searchStatus.id !== null && asset.status !== searchStatus.id) {
              return false;
            } else {
              if (searchLocation.id !== null && asset.location !== searchLocation.id) {
                return false;
              } else {
                return true;
              }
            }
          }
        }
      });
      console.log(filtered)
    }
  }, [search, searchStatus, searchType, searchLocation, assets]);

  const rowStyle = { cursor: 'pointer' };

  return (
    <IonPage>
      <Header title={"Search Assets"} user={user} />
      <IonContent>
        <div className="bg-white p-2 m-4 rounded-lg shadow">
          <div className='flex'>
            <IonSearchbar></IonSearchbar>
            <Selector label="Status" queryType={listAssetStatuses} handleChange={setSearchStatus} nameKey="statusName" />
            <Selector label="Type" queryType={listAssetTypes} handleChange={setSearchType} nameKey="typeName" />
            <Selector label="Location" queryType={listAssetLocations} handleChange={setSearchLocation} nameKey="locationName" />

          </div>
          <AgGridReact
            domLayout={'autoHeight'}
            columnDefs={columnDefs}
            rowData={filteredAssets}
            pagination={true}
            paginationPageSize={10}
            onRowClicked={(row) => {console.log(row)}}
            rowStyle={rowStyle}
            />
        </div>
      </IonContent>
    </IonPage>
  )
}


export default Search