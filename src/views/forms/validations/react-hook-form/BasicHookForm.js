import {
  Fragment,
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Check } from "react-feather";
import { toast } from "react-toastify";

import Avatar from "@components/avatar";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  errorToast,
  successToast,
} from "../../../../@core/components/toastify";

const SuccessToast = ({ data }) => {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Check size={12} />} />
          <h6 className="toast-title">Form Submitted!</h6>
        </div>
      </div>
      <div className="toastify-body">
        <ul className="list-unstyled mb-0">
          <li>
            <strong>firstName</strong>: {data.firstName}
          </li>
          <li>
            <strong>lastName</strong>: {data.lastName}
          </li>
          <li>
            <strong>email</strong>: {data.email}
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

const BasicHookForm = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    toast.success(<SuccessToast data={data} />, { hideProgressBar: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="firstNameBasic">First Name</Label>
            <Input
              id="firstNameBasic"
              name="firstNameBasic"
              innerRef={register({ required: true })}
              invalid={errors.firstNameBasic && true}
              placeholder="Bruce"
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastNameBasic">Last Name</Label>
            <Input
              id="lastNameBasic"
              name="lastNameBasic"
              innerRef={register({ required: true })}
              invalid={errors.lastNameBasic && true}
              placeholder="Wayne"
            />
          </FormGroup>
          <FormGroup>
            <Label for="emailBasic">Email</Label>
            <Input
              type="email"
              name="emailBasic"
              id="emailBasic"
              innerRef={register({ required: true })}
              invalid={errors.emailBasic && true}
              placeholder="bruce.wayne@email.com"
            />
          </FormGroup>
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mr-1" color="primary" type="submit">
              Submit
            </Button.Ripple>
            <Button.Ripple outline color="secondary" type="reset">
              Reset
            </Button.Ripple>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BasicHookForm;











const SuccessToast2 = ({ data }) => {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Check size={12} />} />
          <h6 className="toast-title">Form Submitted!</h6>
        </div>
      </div>
      <div className="toastify-body">
        <ul className="list-unstyled mb-0">
          <li>
            <strong>Label</strong>:
            {data.forEach((element) => {
              console.log(element.id);
            })}
          </li>
          <li>
            <strong>Key</strong>:
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

// const formdataContext=useContext()

const BasicHookForm2 = ({getData ,  Form_data  } ) => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("data");
    //  setdata([...demData,data])
    data.preventDefault();

    toast.success(<SuccessToast data={data} />, { hideProgressBar: true });
  };

  //data
  // const demData = [
  //   { id: 1, key: 1, label: "Consumer" },
  //   { id: 2, key: 2, label: "Consumer" },
  //   { id: 3, key: 3, label: "Consumer" },
  // ];

  //state
  const [btnstate, setBtnState] = useState(false);
  const [data, setdata] = useState(Form_data);
  const [nodata, setNodata] = useState(false);

  const [label, setLabel] = useState("");
  const [ke, setke] = useState("");

  //updated states
  const [Updatedlabel, setUpdatedlabel] = useState("");
  const [Updatedkey, setUpdatedkey] = useState("");

  const [formModal, setFormModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [IsEditedConsumer, setIsEditedConsumer] =useState();



  const [EditLabel , setEditLabel ] = useState()
  const [Editkey , setEditkey ] = useState()
  const [SavebtnState, setSavebtnState] = useState(false);


 


  const DeleteRow = (id) => {

    const myData = data.filter((_, i) => i !== id)
    setdata(myData);


  };

  const ToParent=(id)=>{
    const incomingdata = data.filter((_, i) => i !== id)
   console.log("from basic hook form  " + incomingdata)
   //data is being sent to getdata prop
  //  getData(incomingdata)
   
  }


  useEffect(()=>{
    UpdateBtn
  },[SavebtnState])

  const UpdateBtn = (id) => {
    console.log(id);
    setUpdateModal(!UpdateModal);
    const { label, key } = data[id];
    // console.log(label)
    setSavebtnState(true)

    setBtnState(true);

  };




   useEffect(()=>{
  setUpdatedlabel('')
  setUpdatedkey('')
   },[data])

  function EditConsumer(id){
    let newEditedConsumer=data.find((cons)=>{
    return   cons.id===id
    })

    console.log(newEditedConsumer.label)
    setEditLabel(newEditedConsumer.label)
    setEditkey(newEditedConsumer.key)
    setIsEditedConsumer(id)

    console.log(newEditedConsumer)
  }


  // (state at which data will be stored)
// const SendFormData=( )=>{ 
//   //this data will be stored

//   incomingData==[...data]
//   console.log(incomingData)
//   // return incomingData;
// }

  useEffect(() => {
    setLabel("");
    setke("");

    console.log("Refresh");
  }, [data]);
  return (
    <>
      {/* <Context.Provider  value={Form_data_context}> */}

    <Col className='flex'>
      <Button color="primary" outline onClick={() => setFormModal(!formModal)}>
        ADD 

      </Button>
    </Col>
      <Modal
        isOpen={formModal}
        toggle={() => setFormModal(!formModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setFormModal(!formModal)}>
          ADD 
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {/* <BasicHookForm2/> */}

            <Form>
              <FormGroup>
                <Label for="label">Label</Label>
                <Input
                  id="label"
                  name="label"
                  innerRef={register({ required: true })}
                  invalid={errors.firstNameBasic && true}
                  placeholder="Bruce"
                  value={label}
                  onChange={(v) => {
                    setLabel(v.target.value);
                    console.log(label);
                    if (label === null) {
                      console.log("no data ");
                    }
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="key">Key </Label>
                <Input
                  id="key"
                  name="key"
                  innerRef={register({ required: true })}
                  invalid={errors.lastNameBasic && true}
                  placeholder="Enter Key (number )"
                  value={ke}
                  type="number"
                  onChange={(keyV) => {
                    // console.log(ke)
                    // setinput({  key: keyV.target.value})
                    setke(keyV.target.value);
                  }}
                />
              </FormGroup>

              <FormGroup className="d-flex mb-0   ">
                <Button.Ripple color="danger" className=" mx-auto" type="reset">
                  Reset list
                </Button.Ripple>

                <Button.Ripple
                  outline
                  color="primary"
                  className=" mx-auto bg-primary text-light"
                  onClick={() => {
                    if (label.length === 0 || ke.length === 0) {
                      return errorToast(
                        " Fill all fields ",
                        ` Label or Key not populated`
                      );
                    } else {
                    // SendFormData()
                      setdata(()=>[
                        ...data,
                        { id: data[data.length - 1].id + 1  
                    
                         , label: label, key: ke },
                      ]);
                      toast.success(<SuccessToast2 data={data} />, {
                        hideProgressBar: true,
                      });
                    }
                  }}
                  type="button"
                >
                  {/* { btnstate} */}
                  ADD ROW
                </Button.Ripple>
              </FormGroup>
            </Form>
          </FormGroup>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={UpdateModal}
        toggle={() => setUpdateModal(!UpdateModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setUpdateModal(!UpdateModal)}>
          Update Consumer
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {/* <BasicHookForm2/> */}

            <Form>
              <FormGroup>
                <Label for="label">Label</Label>
                <Input
                  id="Edit label"
                  name="label"
                  innerRef={register({ required: true })}
                  invalid={errors.firstNameBasic && true}
                  placeholder={EditLabel} 
                  value={EditLabel}
                    onChange={(v) => {
                    setEditLabel(v.target.value)
                    
                    // setUpdatedkey()
                    setUpdatedlabel(v.target.value);

                    // console.log(label)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="key">Key </Label>
                <Input
                  id="key"
                  name="key"
                  innerRef={register({ required: true })}
                  invalid={errors.lastNameBasic && true}
                  placeholder={Editkey} 
                  value={Editkey}
                  type="number"
                  onChange={(keyV) => {
                    setEditkey(keyV.target.value)
                    setUpdatedkey(keyV.target.value);
                  }}
                />
              </FormGroup>

              <FormGroup className="d-flex mb-0">
                 <Button.Ripple outline color="primary" className=' mx-auto bg-primary text-light' onClick={()=>{

                    // Updating data 
                    setdata(data.map((cons)=>{
                      if(cons.id===IsEditedConsumer){
                        
                        
                        let UpdatedObj= {...cons, label:Updatedlabel.length < 1 ? cons.label : Updatedlabel  , key:Updatedkey.length < 1 ? cons.key : Updatedkey  }
                        
                       
                          successToast("Updated","Form Value Updated")
                          return UpdatedObj;
                        }
                      return cons
                    }))

                  }}> Save Edited </Button.Ripple> 
                
                            
              </FormGroup>
            </Form>
          </FormGroup>
        </ModalBody>
      </Modal>

      <Table responsive>
        <thead >
          <tr>
            <th scope='col' className='text-nowrap'>LABEL</th>
            <th scope='col' className='text-nowrap' >KEY</th>
            <th scope='col' className='text-nowrap'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => {
            
            ToParent(index)
            // setuId(index + 1 )
            // console.log(e.length)
            return (
              <>
                <tr key={e.id}>
                  <td> {e.label} </td>
                  <td>{e.key} </td>
                  <td>
                    <Button.Ripple
                      color="danger"
                      onClick={() => DeleteRow(index)}
                    >
                      Delete{" "}
                    </Button.Ripple>
                  </td>
                  <td>
                      <td>
                    <Button.Ripple
                      color="success"
                      onClick={() => {          
                        UpdateBtn(index)
                        EditConsumer(index)
                        // console.log(data)
                      }}
                    >
                      Update
                    </Button.Ripple>
                
                      
                        </td>
                        
                        
                  </td>
                </tr>
              </>
            );
          })}
          {nodata}
          {UpdateModal}
        </tbody>
      </Table>
      {/* </Context.Provider> */}
    </>
  );
};

export { BasicHookForm2 };

