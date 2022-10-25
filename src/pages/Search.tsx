import { useEffect, useState } from 'react'
import { IonPage, IonContent, IonSearchbar, useIonRouter, IonButton, isPlatform } from '@ionic/react'
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import { AgGridReact } from 'ag-grid-react'
import Header from '../components/Header';
import Selector from '../components/Selector';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory, useLocation } from 'react-router-dom';

interface searchProps {
  user: any;
}

const Search = ({ user }: searchProps) => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState({ id: undefined });
  const [searchStatus, setSearchStatus] = useState({ id: undefined });
  const [searchLocation, setSearchLocation] = useState({ id: undefined });

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 1 },
    { headerName: "Type", field: "type", sortable: true, filter: true, flex: 1 },
    { headerName: "Status", field: "status", sortable: true, filter: true, flex: 1,
      cellStyle: (params: any) => {
        if (params.value === 'Available') {
          return { color: 'green' };
        } else if (params.value === 'On Loan') {
          return { color: 'red' };
        } else if (params.value === 'Archived') {
          return { color: '#bdbdbd' };
        }
      },},
    { headerName: "Location", field: "location", sortable: true, filter: true, flex: 1 },
    { headerName: "Updated", field: "updated", sortable: true, filter: true, flex: 1 }
  ];

  const router = useIonRouter();
  const location = useLocation();

  const listAsset = async (allStatus: any[], allLocations: any[], allTypes: any[]): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: listAssets,
        authMode: 'AWS_IAM'
      });
      let formatted = result.data.listAssets.items.map((asset: any) => {

        const validateID = (id: string, name: string, input: any[]) => {
          let data = null;
          try {
            data = input.find(({ id: itemID }) => itemID === id)[name]
          } catch {
            console.warn(`Invalid ${name} found for ${id} in:`)
            console.warn(input)
          }
          return data;
        }
        var myDate = new Date(asset.updatedAt);

        return {
          id: asset.id,
          name: asset.assetName,
          statusID: asset.statusID,
          status: (asset.statusID) ? validateID(asset.statusID, 'statusName', allStatus) : null,
          assetlocaID: asset.assetlocaID,
          //location: (asset.assetlocaID) ? validateID(asset.assetlocaID, 'locationName', allLocations) : null,
          location: asset.assetlocaID,
          typeID: asset.typeID,
          type: (asset.typeID) ? validateID(asset.typeID, 'typeName', allTypes) : null,
          
          updated: myDate.toLocaleDateString()
        }
      });
      setAssets(formatted);
    } catch (e: any) {
      console.log(e);
    }
    return;
  };

  const getData = async (queryType: any, array: any): Promise<void> => {
    try {
      const result: any = await API.graphql({
        query: queryType,
        authMode: 'AWS_IAM'
      });
      result.data[Object.keys(result.data)[0]].items.forEach((item: any) => {
        array.push(item);
      });
    } catch (e) {
      console.log(e);
    }
    return;
  };

  useEffect(() => {
    let allStatus: any[] = [];
    let allTypes: any[] = [];
    let allLocations: any[] = [];
    Promise.all([
      getData(listAssetStatuses, allStatus),
      getData(listAssetTypes, allTypes),
      getData(listAssetLocations, allLocations),
    ]).then(
      () => { listAsset(allStatus, allLocations, allTypes) }
    );

    if (isPlatform('capacitor') || window.matchMedia('(max-width: 640px)').matches) {
      columnDefs.forEach((column: any) => {
        if (column.headerName === 'Type' || column.headerName === 'Updated' || column.headerName === 'Location') {
          column.hide = true;
        }
      });
    }
  }, [location]);

  useEffect(() => {
    if (assets && assets.length > 0) {
      let filtered = assets.filter((asset: any) => {
        if (search !== '' && !(asset.name.toLowerCase().includes(search.toLowerCase()) || (('QRCode' in asset) ? asset.QRCode.includes(search) : false))) {
          return false;
        } else {
          if (searchType !== undefined && searchType.id !== undefined && asset.typeID !== searchType.id) {
            return false;
          } else {
            if (searchStatus !== undefined && searchStatus.id !== undefined && asset.statusID !== searchStatus.id) {
              return false;
            } else {
              if (searchLocation !== undefined && searchLocation.id !== undefined && asset.assetlocaID !== searchLocation.id) {
                return false;
              } else {
                return true;
              }
            }
          }
        }
      });
      setFilteredAssets(filtered);
    }
  }, [search, searchStatus, searchType, searchLocation, assets]);

  const rowStyle = { cursor: 'pointer' };

  return (
    <IonPage>
      <Header title={"Search Assets"} user={user} />
      <IonContent>
        <div className="bg-white p-2 m-4 rounded-lg shadow">
          <div className='flex'>
            <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)}></IonSearchbar>
            <Selector label="Status" queryType={listAssetStatuses} handleChange={setSearchStatus} nameKey="statusName" placeHolder='All' />
            <Selector label="Type" queryType={listAssetTypes} handleChange={setSearchType} nameKey="typeName" placeHolder='All' />
            <Selector label="Location" queryType={listAssetLocations} handleChange={setSearchLocation} nameKey="locationName" placeHolder='All' />
            <IonButton routerLink='/NewAsset'className="ml-2" expand="block">New Asset</IonButton>
          </div>
          <div className="ag-theme-alpine m-2" style={{ height: 500 }}>
            <AgGridReact
              domLayout={'autoHeight'}
              columnDefs={columnDefs}
              rowData={filteredAssets}
              pagination={true}
              paginationPageSize={25}
              onRowClicked={(row: any) => { router.push(`/asset/${row.data.id}`) }}
              rowStyle={rowStyle}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}


export default Search