// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import { User, MapPin } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { inputNumberFields, inputSelectField, inputTextField, inputRadioSelection, inputCustomSelectField, SelectFileInput } from '../../components/common-functions/input-fields'
import { convertToKeyValuePair } from '../../components/common-functions/helper'
import { useSelector, useDispatch } from 'react-redux'
import { hardRequest, softRequest } from '../../../@core/auth/request'
import { GET_ALL_STATE, GET_ALL_CITY, GET_ALL_AREAS, ADD_COMPANY } from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { avTableModal } from '@store/actions/layout'
import { PopUpAvtModal } from '../../components/modal/modal.controller'

const CompanyTypeList = [
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
  { value: 'local', label: 'Local' },
]

const AddCategory = (props) => {

  const [companydata, setCompanyData] = useState(null);
  const [selectFieldData, setSelectFieldData] = useState({})
  // redux selector
  const userData = useSelector(state => state?.auth?.userData)
  const { contextCallback: onNewCompanyAdd, selectedCategory } = props;

  useEffect(() => {
    const keyPairList = convertToKeyValuePair(userData.countries, 'country_name');
    // setCountriesList(keyPairList);
  }, [userData]);

  console.log("selectedCategory====", selectedCategory)
  const selectedCategoryContext = {
    category_name: selectedCategory?.CategoryName,
    image: selectedCategory?.contactPersonName,
    email: selectedCategory?.email,
  }
  const { register, errors, handleSubmit, control, setValue, trigger, reset } = useForm({
    defaultValues: { gender: 'gender-female', dob: null, ...selectedCategoryContext }
  });

  const STATUS_SELECT = ['Active', 'In-Active'];


  const storeValuesInState = (data, key) => {
    const { value } = data;
    if (!value) return;
    const newData = { ...selectFieldData };
    newData[key] = value;
    setSelectFieldData(newData);
  }

  const onSubmitCategory = async (companydata) => {
    try {
      trigger()
      console.log("selectFieldData", selectFieldData, companydata)
      if (Object.keys(selectFieldData).length === 0) return errorToast('Required Field', `Addess Portion Required`);
      for (const [key, value] of Object.entries(selectFieldData)) {
        if (!value) return errorToast('Required Field', `${key} is required`);
      }
      const body = { ...selectFieldData, ...companydata }
      body.isActive = body.isActive === 'Active' ? true : false;
      const response = await hardRequest(ADD_COMPANY, body, 'POST', true, true);
      const { ok, result } = response;
      if (!ok) return;
      reset();
      onNewCompanyAdd(result)
      PopUpAvtModal(false)
      successToast('Success', 'Comapny added successfully');
    } catch (error) {
      errorToast('Failure', 'Something Went Wrong!');
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitCategory)} >
      <Row className='mt-1'>
        <Col sm='12'>
          <h4 className='mb-1'>
            <User size={20} className='mr-50' />
            <span className='align-middle'>Category Information</span>
          </h4>
        </Col>

        {inputTextField('Category Name', 'Category Name', errors, register)}
        {inputSelectField('Parent Category', 'select', CompanyTypeList, storeValuesInState)}
        {SelectFileInput('Image', 'Choose file', errors, register, 'file')}
      </Row>

      <Row>

        <Col className='d-flex flex-sm-row flex-column mt-2'>
          <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
            Save Changes
          </Button>
          <Button type='reset' color='secondary' outline>
            Reset
          </Button>
        </Col>

      </Row>
    </Form>
  )
}

export default AddCategory
