import { useState, useEffect, Fragment } from 'react'
import AVDataTable from '../../tables/data-tables/av_table'
import { useSelector, useDispatch } from 'react-redux'
import { softRequest } from '../../../@core/auth/request'
import { DELET_COMPANY, GET_ALL_COMPANIES } from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { getColumns } from "./schema";
import { DATA_PER_PAGE } from '../../../configs/constants'
import { PopUpAvtModal } from '../../components/modal/modal.controller'
import AddVehicle from './addVehicle'


const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  useEffect(() => {
    getAllVehicles()
  }, [])

  const getAllVehicles = async (page = 1) => {
    try {
      const url = `${GET_ALL_COMPANIES}?page=${page}`;
      const response = await softRequest(url, 'GET', false, true);
      const { result, ok } = response;
      if (!ok) return;
      setVehicles(result.vehicles);
      const total = Math.ceil(result.total / DATA_PER_PAGE);
      setTotalVehicles(total);
    } catch (error) {
      errorToast('Error', 'Network Error')
    }
  }

  const onNewVehicleAdd = (data) => {
    let companiesBackup = [...vehicles];
    companiesBackup.unshift(data);
    setVehicles(companiesBackup);
  }

  const onEditHandler = (e, row, index) => {
    e.preventDefault();
    setSelectedVehicle(row);
    PopUpAvtModal(true);
  };

  const onDeleteHandler = async (e, row, index) => {
    try {
      e.preventDefault();
      const url = `${DELET_COMPANY}/${row._id}`
      const response = await softRequest(url, 'DELETE', true, true);
      if (!response.ok) return;
      const newCompaniesList = [...vehicles];
      newCompaniesList.splice(index, 1);
      setVehicles(newCompaniesList);
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
    ContextBody: AddVehicle,
    ContextTitle: selectedVehicle ? 'Edit Vehicle' : 'Add Vehicle',
    contextCallback: onNewVehicleAdd,
    selectedVehicle: selectedVehicle,
  }

  return (
    <Fragment>
      <AVDataTable cardTitle="Vehicles List" addModal={addModalPayload} data={vehicles} columns={getColumns} getPaginateData={getAllVehicles}
        totalDataCounts={totalVehicles} actionCallBacks={actionCallBacks} />
    </Fragment>
  )
}

export default VehicleDashboard
