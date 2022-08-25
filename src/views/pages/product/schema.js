// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { MoreVertical, Edit, FileText, Archive, Trash, RefreshCw } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Tooltip } from 'reactstrap'
import { DATA_PER_PAGE } from '../../../configs/constants'
import { convertToBrowserTimezone } from '../../components/common-functions/helper'
import { TooltipUncontrolled } from '../../components/common-functions/tooltip'


const iconStyle = { cursor: 'pointer', marginRight: '7px', }

// ** Vars
const status = {
  'true': { title: 'Active', color: 'light-success' },
  'false': { title: 'Inactive', color: 'light-danger' },
}
const domain = {
  1: { title: 'Active', color: 'light-success' },
  2: { title: 'Inactive', color: 'light-danger' },
}

// ** Table Common Column
export const getColumns = (actionsHandler, currentPage) => {
  const { onEdit, onDelete } = actionsHandler;
  const column = [
    {
      name: 'S.No',
      selector: 'sno',
      minWidth: '50px',
      cell: (row, index) => {
        return (currentPage * DATA_PER_PAGE + index + 1);
      }
    },
    {
      name: 'Company Name',
      selector: 'full_name',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          {/* {(!row.avatar || row.avatar === '') ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )} */}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.companyName}</span>
            <small>{row.post}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Email',
      selector: 'email',
      minWidth: '250px'
    },
    {
      name: 'Date',
      selector: 'createdAt',
      sortable: true,
      minWidth: '120px',
      cell: row => {
        return (
          <div>
            <span className='d-block font-weight-bold text-truncate'>{convertToBrowserTimezone(row.createdAt, true)}</span>
          </div>
        )
      }
    },
    {
      name: 'Company Domain',
      selector: 'domain',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={domain[row.status]?.color} pill>
            {row?.type}
          </Badge>
        )
      }
    },
    {
      name: 'Contact Person Name',
      selector: 'salary',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <div>
            <span className='d-block font-weight-bold text-truncate'>{row.contactPersonName}</span>
            <small>{row.post}</small>
          </div>
        )
      }
    },

    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row.isActive]?.color} pill>
            {status[row.isActive]?.title}
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: (row, index) => {
        return (
          <div className='d-flex'>
            {TooltipUncontrolled("Status", `status${index}`)}
            <RefreshCw style={iconStyle} size={15} onClick={(e) => onEdit(e, row, index)} id={`status${index}`} />

            {TooltipUncontrolled("Edit", `edit${index}`)}
            <Edit style={iconStyle} size={15} id={`edit${index}`} onClick={(e) => onEdit(e, row, index)} />

            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>Details</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <Archive size={15} />
                  <span className='align-middle ml-50'>Archive</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={(e) => onDelete(e, row, index)}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>



          </div>
        )
      }
    }]
  return column
}
