// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import { User, MapPin } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { inputNumberFields, inputSelectField, inputTextField, inputRadioSelection, inputCustomSelectField } from '../../components/common-functions/input-fields'
import { convertToKeyValuePair } from '../../components/common-functions/helper'
import { useSelector, useDispatch } from 'react-redux'
import { hardRequest, softRequest } from '../../../@core/auth/request'
import { GET_ALL_STATE, GET_ALL_CITY, GET_ALL_AREAS, ADD_PRODUCT} from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { avTableModal } from '@store/actions/layout'
import { PopUpAvtModal } from '../../components/modal/modal.controller'

const ProductTypeList = [
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
  { value: 'local', label: 'Local' },
]

const AddCompany = (props) => {

  const [productdata, setCompanyData] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [areasList, setAreasList] = useState([]);
  const [selectFieldData, setSelectFieldData] = useState({})
  // redux selector
  const userData = useSelector(state => state?.auth?.userData)
  const { contextCallback: onNewProductAdd, selectedProduct } = props;

  useEffect(() => {
    const keyPairList = convertToKeyValuePair(userData.countries, 'country_name');
    setCountriesList(keyPairList);
  }, [userData]);

  console.log("selectedProduct====", selectedProduct)
  const selectedProductContext = {
    company_name: selectedProduct?.companyName,
    contact_person_name: selectedProduct?.contactPersonName,
    contact_person_number: selectedProduct?.contactPersonNumber,
    area: selectedProduct?.area,
    city: selectedProduct?.city,
    state: selectedProduct?.state,
    isActive: selectedProduct?.isActive,
    email: selectedProduct?.email,
  }
  const { register, errors, handleSubmit, control, setValue, trigger, reset } = useForm({
    defaultValues: { gender: 'gender-female', dob: null, ...selectedProductContext }
  });

  const STATUS_SELECT = ['Active', 'In-Active'];

  // const onSelectCountry = async (e, key) => {
  //   const { value } = e;
  //   if (!value) return;
  //   const response = await softRequest(`${GET_ALL_STATE}/${value}`, 'GET', true, true);
  //   if (!response.ok) return;
  //   const keyPairState = convertToKeyValuePair(response.result, 'state_name');
  //   setStatesList(keyPairState);
  //   storeValuesInState(e, 'country')
  // }

  // const onSelectStates = async (e, key) => {
  //   const { value } = e;
  //   if (!value) return;
  //   const response = await softRequest(`${GET_ALL_CITY}/${value}`, 'GET', true, true);
  //   if (!response.ok) return;
  //   const keyPairState = convertToKeyValuePair(response.result, 'city_name');
  //   setCitiesList(keyPairState);
  //   storeValuesInState(e, 'state')
  // }

  // const onSelectCity = async (e, key) => {
  //   const { value } = e;
  //   if (!value) return;
  //   const response = await softRequest(`${GET_ALL_AREAS}/${value}`, 'GET', true, true);
  //   if (!response.ok) return;
  //   const keyPairState = convertToKeyValuePair(response.result, 'area_name');
  //   setAreasList(keyPairState);
  //   storeValuesInState(e, 'city')
  // }

  const storeValuesInState = (data, key) => {
    const { value } = data;
    if (!value) return;
    const newData = { ...selectFieldData };
    newData[key] = value;
    setSelectFieldData(newData);
  }

  const onSubmitProduct = async (productdata) => {
    try {
      trigger()
      console.log("selectFieldData", selectFieldData, productdata)
      if (Object.keys(selectFieldData).length === 0) return errorToast('Required Field', `Addess Portion Required`);
      for (const [key, value] of Object.entries(selectFieldData)) {
        if (!value) return errorToast('Required Field', `${key} is required`);
      }
      const body = { ...selectFieldData, ...productdata }
      body.isActive = body.isActive === 'Active' ? true : false;
      const response = await hardRequest(ADD_PRODUCT, body, 'POST', true, true);
      const { ok, result } = response;
      if (!ok) return;
      reset();
      onNewProductAdd(result)
      PopUpAvtModal(false)
      successToast('Success', 'Product added successfully');
    } catch (error) {
      errorToast('Failure', 'Something Went Wrong!');
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitProduct)} >
      <Row className='mt-1'>
        <Col sm='12'>
          <h4 className='mb-1'>
            <User size={20} className='mr-50' />
            <span className='align-middle'>Product Information</span>
          </h4>
        </Col>

        {inputTextField('title', 'enter a product title...', errors, register)}
        {inputNumberFields('Stock', 'Please enter stock...', productdata, control, errors, register)}
        {inputNumberFields('Dicsount', 'dicsount...', productdata, control, errors, register)}
        {inputTextField('Description', 'Enter Description...', errors, register, 'email')}
        {inputTextField('Manufecturer', 'Enter Manufecturer...', errors, register, 'email')}
        {inputNumberFields('Cost', 'Cost...', productdata, control, errors, register)}
        {inputSelectField('Category', 'product_type', ProductTypeList, storeValuesInState)}
        {/* {inputTextField('Email', 'Company Email', errors, register, 'email')}
        {inputSelectField('Company Type', 'company_type', ProductTypeList, storeValuesInState)}
        {inputTextField('Contact Person Name', 'Contact Person Name', errors, register)}
        {inputNumberFields('Contact Person Number', 'Mobile Number', productdata, control, errors, register)}
        {inputRadioSelection('Status', 'isActive', STATUS_SELECT, productdata, setValue, control, register)} */}
      </Row>

      <Row>
        {/* <Col sm='12'>
          <h4 className='mb-1 mt-2'>
            <MapPin size={20} className='mr-50' />
            <span className='align-middle'>Address</span>
          </h4>
        </Col>

        {inputSelectField('Country', 'country', countriesList, onSelectCountry)}
        {inputSelectField('State', 'state', statesList, onSelectStates)}
        {inputSelectField('City', 'city', citiesList, onSelectCity)}
        {inputSelectField('Area', 'area', areasList, storeValuesInState)} */}

        <Col className='d-flex flex-sm-row flex-column mt-2'>
          <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
            Save Changes
          </Button>
          <Button type='reset' color='secondary' outline>
            Reset
          </Button>
        </Col>

      </Row>
    </Form >
  )
}
export default AddCompany
