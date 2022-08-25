import { useEffect, useState } from 'react'
import { Truck } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm } from 'react-hook-form'
import { Row, Col, Form } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { inputNumberFields, inputTextField, inputRadioSelection } from '../../components/common-functions/input-fields'
import { useSelector } from 'react-redux'
import { hardRequest, softRequest } from '../../../@core/auth/request'
import { ADD_VEHICLE } from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { PopUpAvtModal } from '../../components/modal/modal.controller'


const AddVehicle = (props) => {

  const [vehicleData, setVehicleData] = useState(null);
  const [selectFieldData, setSelectFieldData] = useState({})
  // redux selector
  const userData = useSelector(state => state?.auth?.userData)
  const { contextCallback: onNewVehicleAdd, selectedVehicle } = props;

  useEffect(() => { }, [userData]);

  const selectedCompanyContext = {
    vehicle_name: selectedVehicle?.companyName,
    isActive: selectedVehicle?.isActive,
  }
  const { register, errors, handleSubmit, control, setValue, trigger, reset } = useForm({
    defaultValues: { ...selectedCompanyContext }
  });

  const STATUS_SELECT = ['Active', 'In-Active'];

  const onSubmitVehicle = async (vehciledata) => {
    try {
      trigger()
      console.log("selectFieldData", selectFieldData, vehciledata)
      if (Object.keys(selectFieldData).length === 0) return errorToast('Required Field', `Addess Portion Required`);
      for (const [key, value] of Object.entries(selectFieldData)) {
        if (!value) return errorToast('Required Field', `${key} is required`);
      }
      const body = { ...selectFieldData, ...vehciledata }
      body.isActive = body.isActive === 'Active' ? true : false;
      const response = await hardRequest(ADD_VEHICLE, body, 'POST', true, true);
      const { ok, result } = response;
      if (!ok) return;
      reset();
      onNewVehicleAdd(result)
      PopUpAvtModal(false)
      successToast('Success', 'Vehicle added successfully');
    } catch (error) {
      errorToast('Failure', 'Something Went Wrong!');
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitVehicle)} >
      <Row className='mt-1'>
        <Col sm='12'>
          <h4 className='mb-1'>
            <Truck size={20} className='mr-50' />
            <span className='align-middle'>Vehicle Information</span>
          </h4>
        </Col>

        {inputTextField('Vehicle Name', 'Write Vehicle Name...', errors, register)}
        {inputNumberFields('Min Weight Carry (in kg)', 'weight carry in kg', vehicleData, control, errors, register)}
        {inputNumberFields('Max Weight Carry (in kg)', 'weight carry in kg', vehicleData, control, errors, register)}
        {inputRadioSelection('Status', 'isActive', STATUS_SELECT, vehicleData, setValue, control, register)}
      </Row>
    </Form >
  )
}
export default AddVehicle;
