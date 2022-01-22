import React from 'react'
import Table from "./Table";
import {Styles} from "./Common/styles";

function DataTable({item}) {

    const data =  item
    const columns = React.useMemo(() => {
        const dataColumns = []
        if(item.length!==0) {
            const headers = Object.keys(data[0])
            headers.forEach(header => {
                if (header === 'imageUrl') {
                    dataColumns.push({
                        Header: header,
                        accessor: (value) => <img style={{width: '50px'}} src={value.imageUrl}/>
                    })
                } else {
                    dataColumns.push({
                        Header: header, accessor: (value) => {
                            if (typeof value[header] === 'boolean') {
                                if (value[header] === true) {
                                    return <p>&#9989;</p>
                                } else {
                                    return <p>&#10060;</p>
                                }
                            } else {
                                return value[header]
                            }
                        }
                    })
                }
            })
            return dataColumns
        }
        }, [])

    return<>
    <div style={{overflowX:'scroll',marginRight:'1rem'}}>
        {item.length!==0 && columns.length!==0 && <Styles><Table columns={columns} data={data} /></Styles>}
    </div>
    </>
}

export default DataTable