import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { Controller } from 'react-hook-form'
import { Row, Col, Label, FormGroup, Input, CustomInput, InputGroup, InputGroupAddon, InputGroupText, Form } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Fragment } from 'react'
import 'cleave.js/dist/addons/cleave-phone.us'
import 'cleave.js/dist/addons/cleave-phone.pk';

export const PhoneMaskField = () => {

  const options = { phone: true, phoneRegionCode: 'PK' }
  return (
    <Fragment>
      <label htmlFor='phone-number'>Phone Number</label>
      <InputGroup className='input-group-merge'>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>PK (+92)</InputGroupText>
        </InputGroupAddon>
        <Cleave className='form-control' placeholder='0311 8219348' options={options} id='phone-number' />
      </InputGroup>
    </Fragment>
  )
}

export const inputNumberFields = (label, placeholder, data, ...params) => {
  const [control, errors, register] = params;
  const key = (String(label).toLowerCase()).replace(/\s/g, '_');
  return (
    <Col lg='6' md='6'>
      <FormGroup>
        <Label for={key}>{label}</Label>
        <Input
          type={'number'}
          id={key}
          name={key}
          placeholder={placeholder}
          invalid={errors[key] && true}
          innerRef={register({ required: true })}
        />
      </FormGroup>
    </Col>
  )
}

export const inputTextField = (label, placeholder, errors, register, type = 'text') => {
  const key = (String(label).toLowerCase()).replace(/\s/g, '_');
  return (
    <Col lg='6' md='6'>
      <FormGroup>
        <Label for={key}> {label} </Label>
        <Input
          type={type}
          id={key}
          name={key}
          placeholder={placeholder}
          invalid={errors[key] && true}
          innerRef={register({ required: true })}
        />
      </FormGroup>
    </Col>
  )
}

export const Propless_inputTextField = (label, placeholder, callback) => {
  const key = (String(label).toLowerCase()).replace(/\s/g, '_');
  return (
    <Col lg='6' md='6'>
      <FormGroup>
        <Label for={key}> {label} </Label>
        <Input
          type='text'
          id={key}
          name={key}
          placeholder={placeholder} 
          onChange={(e) => {
            callback(e, key)
            // console.log(e.target.value)
          }}
        />
      </FormGroup>
    </Col>
  )
}






export const  ReadOnlySlug=(slug )=> {
  return (
        
        <Col lg='6' md='6'>
      <FormGroup>
        <Label >Slug </Label>
        <Input  plaintext readOnly defaultValue="Slug from Backend " />
       
      </FormGroup>
    </Col>
 


  );

  
}

export const inputSelectField = (label, key, options, callback) => {
  return (
    <Col className='mb-1' md='6' sm='12'>
      <Label>{label}</Label>
      <Select
        theme={selectThemeColors}
        className='react-select'
        classNamePrefix='select'
        defaultValue={options[0]}
        options={options}
        isClearable={false}
        onChange={(e) => callback(e, key)}
      />
    </Col>
  )
}

//Custom Component 
export const inputSelectFieldAdmin = (label, key, options,defaultV, callback) => {
  return (
    <Col className='mb-1' md='6'   sm='12'>
      <Label>{label}</Label>
      <Select
        theme={selectThemeColors}
        className='react-select'
        classNamePrefix='select'
        defaultValue={defaultV}
        options={options}
        isClearable={false}
        onChange={(e) => callback(e, key)}
      />
    </Col>
  )
}

export const inputRadioSelection = (label, key, options = [], data, setValue, control, register) => {
  return (
    <Col lg='6' md='6'>
      <FormGroup>
        <label className='d-block mb-1'>{label}</label>
        <FormGroup>
          {options.map((option, index) => (
            <Controller key={index} name={key} control={control}
              render={props => {
                return (
                  <CustomInput
                    inline
                    defaultChecked={index === 1}
                    type='radio'
                    label={option}
                    value={option}
                    id={`${key}-${option}`}
                    name={props.name}
                    // invalid={data !== null} // (data[key] === undefined || data[key] === null)
                    // innerRef={register({ required: true })}
                    onChange={() => setValue(key, option)}
                  />
                )
              }}
            />
          ))}
        </FormGroup>
      </FormGroup>
    </Col>
  )
}

export const inputCustomSelectField = (label, key, options = [], control, data, callback) => {
  return (
    <Col lg='6' md='6'>
      <FormGroup>
        <Label for={key}>{label}</Label>
        <Controller
          as={Input}
          type='select'
          name={key}
          id={key}
          control={control}
          invalid={data !== null && (data[key] === undefined || data[key] === null)}
        >
          <option value={null}>{`Select ${label}`}</option>
          {options.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </Controller>
      </FormGroup>
    </Col>
  )
}

export const SelectFileInput = (label, placeholder, errors, register, type = 'text') => {
  const key = (String(label).toLowerCase()).replace(/\s/g, '_');
  return (
    <Col lg='6' md='6'>
      <FormGroup>
        <Label for={key}>{label}</Label>
        <CustomInput
          type={type}
          id={key}
          name={key}
          placeholder={placeholder}
          invalid={errors[key] && true}
          innerRef={register({ required: true })}
        />
      </FormGroup>
    </Col>
  )
}