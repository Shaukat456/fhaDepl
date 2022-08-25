import { Fragment, useState,createContext } from 'react'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import 'cleave.js/dist/addons/cleave-phone.pk';
import { InputGroup, InputGroupAddon, InputGroupText ,Col, Button} from 'reactstrap'
import countries  from './countryListCode' 
import {successToast ,errorToast } from "../../../../@core/components/toastify";


const PhoneMask = () => {
  const options = { phone: true, phoneRegionCode: 'PK' }
  return (
    <Fragment>
      <label htmlFor='phone-number'>Phone Number</label>
      <InputGroup className='input-group-merge'>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText> PK (+92)</InputGroupText>
        </InputGroupAddon>
        <Cleave className='form-control' placeholder='0311 8219348' options={options} id='phone-number' />
      </InputGroup>
    </Fragment>
  )
}



const PhoneM=()=>{
 
  
  
  
  
  const[ phoneNumber,setPhoneNumber]=useState({
    code:"+92",
    no:0
  })

  const [storePhoneNum, setStorePhoneNum]=useState([])
  // const Phone_States={ phoneNumber ,setPhoneNumber, storePhoneNum,setStorePhoneNum,StoreData}

    function StoreData(prevData,NewData){
      // if(!NewData){
      //   return errorToast("ERROR", 'FILL ALL FIELDS')
      // }
      if(prevData.length===0){
          return setStorePhoneNum([NewData])
        
      }
   
      setStorePhoneNum([...prevData,NewData])
      console.log(storePhoneNum)
      successToast("Submitted" , "Phone number stored")

    }
  const options = { phone: true, phoneRegionCode: 'PK' }
  return (
    <Fragment>
     
     <Col className='mb-1' md='6' sm='12'>
      <label htmlFor='phone-number'>Phone Number  </label>
      <InputGroup className='input-group-merge'>
        <InputGroupAddon addonType='prepend'>
        
        {/* //Fix it later  */}
        <InputGroupText> 
    {phoneNumber.code}    
          </InputGroupText>
        </InputGroupAddon>
        <Cleave className='form-control' placeholder='03** *******'   onChange={(pn)=>{
          setPhoneNumber({...phoneNumber ,no:pn.target.value}) 
          
          // console.log(phoneNumber)
          
          }}  datatype='number'    min={11} max={11} options={options} id='phone-number' />
      </InputGroup>
      {/* <Button
            type="button"
            color="primary"
            className="mb-1 mb-sm-0 mr-0 mr-sm-1"
            onClick={()=>
         {     phoneNumber.no.length  ?  StoreData(storePhoneNum,phoneNumber) :  errorToast("ERROR", 'FILL ALL FIELDS')
              console.log("clicked")}
              
            }
            >
            Save Phone Number
          </Button> */}
          
      </Col>
      
    </Fragment>
 
  )

}

export default PhoneMask
export { PhoneM } ;  
