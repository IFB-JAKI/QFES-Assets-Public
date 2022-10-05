import { IonButton, IonContent, IonPage, IonSearchbar, useIonRouter } from '@ionic/react'
import { AgGridReact } from 'ag-grid-react';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Selector from '../components/Selector';
import { listAssets, listAssetStatuses, listAssetTypes, listAssetLocations, listSimpleAssetGroups } from '../graphql/queries';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { group } from 'console';

interface GroupsProps {
  user: any;
}

const Groups = ({ user }: GroupsProps) => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState(Array<any>());
  const [assets, setAssets] = useState(Array<any>());

  const [search, setSearch] = useState('');

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 1 },
    { headerName: "Description", field: "description", sortable: true, filter: true, flex: 1 }
  ];

  const router = useIonRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsResult: any = await API.graphql({
          query: listSimpleAssetGroups,
          variables: { limit: 1000 }
        });
        setGroups(groupsResult.data.listSimpleAssetGroups.items);
      } catch (e: any) {
        console.log("Error fetching Groups:", e);
      }
    }
    const fetchAssets = async () => {
      try {
        const assetsResult: any = await API.graphql({
          query: listAssets,
          variables: { limit: 1000 }
        });
        setAssets(assetsResult.data.listAssets.items);
      } catch (e: any) {
        console.log("Error fetching Assets:", e);
      }
    }
    fetchGroups();
    fetchAssets();
  }, []);

  useEffect(() => {
    if (groups.length > 0 && assets.length > 0) {
      //setFilteredGroups(groups.filter((group: any) => assets.find((asset: any) => asset.id === group.parentAssetID)?.assetName?.toLowerCase().includes(search.toLowerCase())));
      const filtered = groups.map((group: any) => {
        let asset = assets.find((asset: any) => asset.id === group.parentAssetID);
        if (asset && asset.assetName.toLowerCase().includes(search.toLowerCase())) {
          return {
            name: asset.assetName,
            description: asset.description,
          }
        }
      });
      setFilteredGroups(filtered.filter((group: any) => group !== undefined));
    }
  }, [search, groups, assets]);

  const rowStyle = { cursor: 'pointer' };

  return (
    <IonPage>
      <Header title={"Groups"} user={user} />
      <IonContent>
        <div className="bg-white p-2 m-4 rounded-lg shadow">
          <div className='flex'>
            <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)}></IonSearchbar>
            <IonButton routerLink='/groups/new'className="ml-2" expand="block">New Group</IonButton>
          </div>
          <div className="ag-theme-alpine m-2" style={{ height: 500 }}>
            <AgGridReact
              domLayout={'autoHeight'}
              columnDefs={columnDefs}
              rowData={filteredGroups}
              pagination={true}
              paginationPageSize={25}
              onRowClicked={(row: any) => { router.push(`/group/${row.data.id}`) }}
              rowStyle={rowStyle}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Groups