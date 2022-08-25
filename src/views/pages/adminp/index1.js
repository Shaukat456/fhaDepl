
// bg to white
// align each component 


// ** React Imports
import { useEffect, useRef, useState } from "react";
// ** Third Party Components
import { User } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm} from "react-hook-form";

import {
  Row,
  Col,
  Button,
  Form,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import {
  inputSelectField,
  inputTextField,
} from "../../components/common-functions/input-fields";
import { convertToKeyValuePair } from "../../components/common-functions/helper";
import { useSelector, useDispatch } from "react-redux";
import { hardRequest, softRequest } from "../../../@core/auth/request";
import {
  ADD_CONSUMER
} from "../../../@core/auth/req.config";
import { errorToast, successToast } from "../../../@core/components/toastify";
import { PopUpAvtModal } from "../../components/modal/modal.controller";
import PhoneMask, {
  PhoneM,
} from "../../forms/form-elements/input-mask/PhoneMask";
import BasicHookForm, { BasicHookForm2 } from "../../forms/validations/react-hook-form/BasicHookForm";

const DataType = [
  { value: "Number", label: "Number" },
  { value: "String", label: "String" },
  { value: "Radio", label: "Radio" },
  { value: "dropdown", label: "Dropdown" },
];

const numopt = [
  { value: "MinValue", label: "Min Value" },
  { value: "MaxValue", label: "Max Value" },
  { value: "Dropdown", label: "Dropdown" },
];

const dropdOpt = [
  { value: "Amount", label: "Amount" },
  { value: "Percentage", label: "Percentage" },
  { value: "None", label: "None" },
];

const AddConsumer = (props) => {
  const [selectFieldData, setSelectFieldData] = useState({});
  const [DataOfFields, setDataofFields] = useState({});
  
  const [extraState, setextraState] = useState();
  const [dropdownState, setdropdownState] = useState();
  const [Amount, setAmount] = useState();
  const [Dstate, setDstate] = useState();
  const [addNew, setAddNew] = useState(false);

  const { register, errors, handleSubmit, control, setValue, trigger, reset } =useForm()
  const storeValuesInState = (data, key) => {
    const { value } = data;
    if (!value) return;
    const newData = { ...selectFieldData ,...DataOfFields};
    newData[key] = value;
    setSelectFieldData(newData);
  };

  const onSubmitCompany = async (consumer_data) => {
    try {
      //trigger validates
      trigger();
      console.log("selectFieldData", selectFieldData, consumer_data);
      if (Object.keys(selectFieldData).length === 0)
        return errorToast("Required Field", ` Portion Required`);
      for (const [key, value] of Object.entries(selectFieldData)) {
        if (!value) return errorToast("Required Field", `${key} is required`);
      }
      
      //returns an array of enumerable values
      if (Object.keys(DataOfFields).length === 0)
        return errorToast("Required Field", ` Portion Required`);
      for (const [key, value] of Object.entries(DataOfFields)) {
        if (!value) return errorToast("Required Field", `${key} is required`);
      }
     
      
      const body = { ...selectFieldData,...DataOfFields, ...consumer_data };
      // console.log(body)
      const response = await hardRequest(
        ADD_CONSUMER,
        body,
        "POST",
        true,
        true
      );
      const { ok, result } = response;
      if (!ok) return;

      //???
      reset();
      successToast("Success", "Consumer  added successfully");
    } catch (error) {
      errorToast("Failure", "Something Went Wrong!");
    }
  };

//make seperate states for types
//make seperate states for dropdown inner values 
// fetch post to the api end point 

  return (
    <Form onSubmit={handleSubmit(onSubmitCompany)}>
      <Row className="mt-1">
        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Consumer Information</span>
          </h4>
        </Col>
      </Row>

      <Row>
        <Col sm="12">
          <h4 className="mb-1 mt-2"></h4>
        </Col>

        {inputSelectField("Type", "type", DataType, (e, key) => {
          storeValuesInState(e, key);
          
           register
          let { value } = e;

          // get data from api
          
          if (value === "Number") {
            // storeValuesInState(value);
            // storeValuesInState
            // register;
            setDstate(false);
            // storeValuesInState
            setextraState(() => {
              return (
                <>
                  {inputTextField("Min Value", "Max value", errors, register)}
                  {inputTextField("Max Value", "Max value", errors, register)}
                  {inputSelectField("Dropdown", "Dropdown", dropdOpt, (am) => {
                    // storeValuesInState(selectedD, `key ${am.label}`);
                    // storeValuesInState
                    // console.log(am.value)
                    register;
                    let selectedD = am.value;
                      // storeValuesInState(...am,9)
                      storeValuesInState((prev)=>{
                        console.log(prev)
                      })
                    // console.log(selectFieldData);
                    // console.log(selectedD);

                    if (selectedD === "Amount") {
                      setAmount(() => {
                        // store phone number in a state ;
                        // send the state here with usecontext
                        return <PhoneM />;
                      });
                    }

                    //what to show in percentage
                    if (selectedD === "Percentage") {
                      
                      setAmount(false);
                    }
                    if (selectedD === "None") {
                      
                      setAmount(false);
                    }
                  })}
                  {/* {inputSelectField("Dropdown", "Dropdown", dropdOpt,storeValuesInState)} */}
                </>
              );
            });
          }

          if (value === "String") {
            
            setextraState('')
            setextraState(false);
            setdropdownState(false);
            setAmount(false);
            setDstate(false);
          }

          if (value === "dropdown") {
            setextraState(false);
            setdropdownState(false);
            setAmount(false);

            setDstate(() => {
              //  register
              return (
                <>
                {/* retrieve form data and send to backend */}
                  <BasicHookForm2 />
                </>
              );
            });
          }
          if (value === "Radio") {
          
            setextraState(false);
            setdropdownState(false);
            setAmount(false);
            setDstate(false);
          }
        })}

        {/* <DropdownAdmin/> */}
        {extraState}
        {dropdownState}
        {Amount}
        {Dstate}
        {addNew}

        {/* <DataTableWithButtons/> */}
        {/* <AddNewModal/> */}
        {/* <Tables/> */}

        <Col className="d-flex flex-sm-row flex-column mt-2">
          <Button
            type="submit"
            color="primary"
            className="mb-1 mb-sm-0 mr-0 mr-sm-1"
          >
            Save Changes
          </Button>
          <Button type="reset" color="secondary" outline>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddConsumer;
