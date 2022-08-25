// ** Table Columns
import { data, basicColumns, ColumnType } from '../data'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTablesBasic = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Zero Configuration</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        columns={basicColumns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  )
}

export default DataTablesBasic



export const SearchData = ({dataFromServer, title }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'> {title} </CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={dataFromServer}
        columns={ColumnType}
        
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  )
}

