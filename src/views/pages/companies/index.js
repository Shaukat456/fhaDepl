import { useState, useEffect, Fragment } from 'react'
import AVDataTable from '../../tables/data-tables/av_table'
import AddCompany from './addCompany'
import { useSelector, useDispatch } from 'react-redux'
import { softRequest } from '../../../@core/auth/request'
import { DELET_COMPANY, GET_ALL_COMPANIES } from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { getColumns } from "./schema";
import { DATA_PER_PAGE } from '../../../configs/constants'
import { PopUpAvtModal } from '../../components/modal/modal.controller'

const data = [
  {
    companyName:'hello',
    createdAt:'24th march',
    type:'local',


  }
]

const CompanyDashboard = () => {

  const [companies, setCompanies] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);


  useEffect(() => {
    setCompanies(data)
    // getAllCompanies()
  }, [data])

  const getAllCompanies = async (page = 1) => {
    try {
      const url = `${GET_ALL_COMPANIES}?page=${page}`;
      const response = await softRequest(url, 'GET', false, true);
      const { result, ok } = response;
      if (!ok) return;
      setCompanies(result.companies);
      const total = Math.ceil(result.total / DATA_PER_PAGE);
      setTotalCompanies(total);
    } catch (error) {
      errorToast('Error', 'Network Error')
    }
  }

  const onNewCompanyAdd = (data) => {
    let companiesBackup = [...companies];
    companiesBackup.unshift(data);
    setCompanies(companiesBackup);
  }

  const onEditHandler = (e, row, index) => {
    e.preventDefault();
    setSelectedCompany(row);
    PopUpAvtModal(true);
  };

  const onDeleteHandler = async (e, row, index) => {
    try {
      e.preventDefault();
      const url = `${DELET_COMPANY}/${row._id}`
      const response = await softRequest(url, 'DELETE', true, true);
      if (!response.ok) return;
      const newCompaniesList = [...companies];
      newCompaniesList.splice(index, 1);
      setCompanies(newCompaniesList);
      successToast('Success', 'Deleted Successfully');
    } catch (error) {
      errorToast('Error', 'Something Went Wrong!')
    }
  };

  const actionCallBacks = {
    onEdit: onEditHandler,
    onDelete: onDeleteHandler,
  }
  const addModalPayload = {
    ContextBody: AddCompany,
    ContextTitle: selectedCompany ? 'Edit Company' : 'Add Company',
    contextCallback: onNewCompanyAdd, 
    selectedCompany: selectedCompany,
  }

  return (
    <Fragment>
      <AVDataTable cardTitle="Company List" addModal={addModalPayload} data={companies} columns={getColumns} getPaginateData={getAllCompanies}
        totalDataCounts={totalCompanies} actionCallBacks={actionCallBacks} />
      
    </Fragment>
  )
}

export default CompanyDashboard
