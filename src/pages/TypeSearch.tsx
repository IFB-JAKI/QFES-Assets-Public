import { useEffect, useState } from 'react'
import { IonPage, IonContent, IonSearchbar, useIonRouter, IonButton } from '@ionic/react'
import { listAssetLocations, listAssets, listAssetStatuses, listAssetTypes } from '../graphql/queries';
import { API } from 'aws-amplify';
import { AgGridReact } from 'ag-grid-react'
import Header from '../components/Header';
import Selector from '../components/Selector';
import BackButton from '../components/BackButton';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

interface searchProps {
    user: any;
}

const TypeSearch = ({ user }: searchProps) => {
    const [types, setTypes] = useState([]);
    const [filteredTypes, setFilteredTypes] = useState([]);

    const [search, setSearch] = useState('');

    const columnDefs = [
        { headerName: "Type ID", field: "id", sortable: true, filter: true, flex: 1 },
        { headerName: "Type Name", field: "typeName", sortable: true, filter: true, flex: 1 }
    ];

    const router = useIonRouter();

    const listType = async (allTypes: any[]): Promise<void> => {
        try {
            const result: any = await API.graphql({
                query: listAssetTypes,
                authMode: 'AWS_IAM'
            });
            let formatted = result.data.listAssetTypes.items.map((type: any) => {

                const validateID = (id: string, typeName: string, input: any[]) => {
                    let data = null;
                    try {
                        data = input.find(({ id: typeID }) => typeID === id)[typeName]
                    } catch {
                        console.warn(`Invalid ${typeName} found for ${id} in:`)
                        console.warn(input)
                    }
                    return data;
                }

                return {
                    id: type.id,
                    typeName: type.typeName
                }
            });
            setTypes(formatted);
        } catch (e) {
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
        let allTypes: any[] = [];
        getData(listAssetTypes, allTypes);
        listType(allTypes);
    }, []);

    useEffect(() => {
        if (types && types.length > 0) {
            let filtered = types.filter((type: any) => {
                if (search !== '' && !(type.typeName.toLowerCase().includes(search.toLowerCase()))) {
                    return false;
                } else {
                    return true;
                }
            })
            setFilteredTypes(filtered);
        }
    }, [search, types]);

    const rowStyle = { cursor: 'pointer' };

    return (
        <IonPage>
            <Header title={"Search Types"} user={user} />
            <IonContent>
                <>
                    <div className="bg-white p-2 m-4 rounded-lg shadow">
                        <div className='flex'>
                            <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)}></IonSearchbar>
                            <IonButton routerLink='/NewType' className="ml-2" expand="block">New Type</IonButton>
                        </div>
                        <div className="ag-theme-alpine m-2" style={{ height: 500 }}>
                            <AgGridReact
                                domLayout={'autoHeight'}
                                columnDefs={columnDefs}
                                rowData={filteredTypes}
                                pagination={true}
                                paginationPageSize={25}
                                onRowClicked={(row: any) => { router.push(`/Type/${row.data.id}`) }}
                                rowStyle={rowStyle}
                            />
                        </div>
                    </div>
                </>
            </IonContent>
        </IonPage>
    )
}


export default TypeSearch