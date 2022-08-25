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
import { errorToast } from "../../../../@core/components/toastify";

  
  




const CustomBasicHookForm= ({ Form_data }) => {
    const { register, errors, handleSubmit } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
      console.log("data");
      //  setdata([...demData,data])
      data.preventDefault();
  
      toast.success(<SuccessToast data={data} />, { hideProgressBar: true });
    };
  
    //data
    const demData = [
      { id: 1, key: 1, label: "Consumer" },
      { id: 2, key: 2, label: "Consumer" },
      { id: 3, key: 3, label: "Consumer" },
    ];
  
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
  
    const [SavebtnState, setSavebtnState] = useState(false);
  
  
    const Form_data_context=createContext();
    const Provider = ({ children }) => {
      
      return (
        <Form_data_context.Provider value={{ data,setdata,nodata,label,setLabel,ke,setke,Updatedlabel,Updatedkey,setUpdatedlabel,setUpdatedkey,formModal,setFormModal,UpdateModal,setUpdateModal,SavebtnState,setSavebtnState }}>
          {children}
        </Form_data_context.Provider>
      );
    };
    

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
  
    const DeleteRow = (id) => {
      setdata((data) => data.filter((_, i) => i !== id));
    };
  
    useEffect(()=>{
      // UpdateConsumer
      UpdateBtn
    },[SavebtnState])
  
    const UpdateBtn = (id) => {
      console.log(id);
      setUpdateModal(!UpdateModal);
      const { label, key } = data[id];
      // console.log(label)
      setSavebtnState(true)
  
      setBtnState(true);
  
      // for (let index = id; index ==id ; index++) {
      //   const element = data[index];
      //   console.log(element.key)
      // }
      // setdata(data.map((cons)=>{
      // const {Label,key } =cons
      // if (cons.id==id){
      //   const cons={
      //     Label:Updatedlabel,
      //     key:Updatedkey
      //   }
      //   return updateData;
      // }
      //  return Object.entries(cons).map(item=>{
  
      // })
  
      // for (const iterator of cons) {
      //     console.log(iterator)
      // }
      // return id==id;
      // }))
  
      // console.log(label,key)
    };
  
    // useEffect(()=>{
    //   SaveEdit
    // },[Updatedkey,Updatedlabel])
    const SaveEdit = (id) => {
      const { label, key } = data[id];
  
      // let currentObj = data[id];
      // let editedobj = { ...currentObj, label: Updatedlabel, key: Updatedkey };
      // console.log(editedobj);
  
      setdata(()=>{
        // console.log(prev_data)
        return {label:Updatedlabel,key:Updatedkey}
        // return editedData;
      })
  
  
      // setdata(dat=>(dataitems,indx)=>{
      //   // console.log(dat)
      //   // console.log(dataitems)
      //     // if(id===indx){
      //     //   return {
      //     //     ...dataitems,
      //     //     label:Updatedlabel,key:Updatedkey
  
      //     //   }
  
      //     //   // return
      //     // }
      //   return dat
      // })
      //  setdata(d.map((ob)=>{
      //     return obj;
      //  }))
      // console.log(editedobj)
  
      // console.log(currentObj)
      // // let updatedObj={   }
      // console.log(label)
    };
  
    //  useEffect(()=>{
    // setUpdatedlabel('')
    // setUpdatedkey('')
    //  },[data])
  
    useEffect(() => {
      setLabel("");
      setke("");
  
      console.log("Refresh");
    }, [data]);
    return (
      <>
        {/* <Context.Provider  value={Form_data_context}> */}
  
        {/* Form is getting submitted */}
        {/* check if values are going in states  */}
        {/* check why prevent default not working  */}
  
        {/* add buttn modal */}
  
        <Button color="primary" outline onClick={() => setFormModal(!formModal)}>
          Add Consumer
        </Button>
        <Modal
          isOpen={formModal}
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setFormModal(!formModal)}>
            Add Consumer
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
                        setdata([
                          ...data,
                          { id: Form_data.length, label: label, key: ke },
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
                    id="label"
                    name="label"
                    innerRef={register({ required: true })}
                    invalid={errors.firstNameBasic && true}
                    placeholder="" // function that will return the value that needs to be edited
                    value={Updatedlabel}
                    onChange={(v) => {
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
                    placeholder="Edit Key (number )"
                    value={Updatedkey}
                    type="number"
                    onChange={(keyV) => {
                      setUpdatedkey(keyV.target.value);
                    }}
                  />
                </FormGroup>
  
                <FormGroup className="d-flex mb-0">
                  {/* <Button.Ripple outline color="primary" className=' mx-auto bg-primary text-light' onClick={()=>{ */}
  
                  {/* setdata( [...data ,{id:data.length,label:label != Updatedlabel ? Updatedlabel : label ,key:ke !=Updatedkey ? Updatedkey :ke}])
              // setdata( [{id:...data.length,label:label != Updatedlabel ? Updatedlabel : label ,key:ke !=Updatedkey ? Updatedkey :ke}])
              
              successToast("Updated","Form Value")
              
             
            }} type="button" > */}
                  {/* { btnstate} */}
                  {/* </Button.Ripple>
          Save Update */}
  
                  {/* {btnstate  ?(
            <Button.Ripple outline color="primary" className=' mx-auto bg-primary text-light' type="button" onClick={()=>{
              // setdata('')
            }} >
              Save updated
  </Button.Ripple>
           ):!btnstate} */}
  
                  {/* {SavebtnState} */}
                </FormGroup>
              </Form>
            </FormGroup>
          </ModalBody>
        </Modal>
  
        <Table responsive>
          <thead className="">
            <tr>
              <th>LABEL</th>
              <th>KEY</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, index) => {
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
                        }}
                      >
                        Update
                      </Button.Ripple>
  
                       {/* <Button.Ripple
                        // color= { data[index].Label   }
                        onClick={() => {
                          SaveEdit(index);
  
                          // data[index].label=Updatedlabel;
                          // data[index].key=Updatedkey;
                        }}
                      >
                        Save Update
                      </Button.Ripple>  */}
  
                      
        
                           <Button.Ripple
                           outline
                           color="primary"
                           className=" mx-auto bg-primary text-light"
                           type="button"
                           onClick={() => {
                            //get obj by id and compare it to index 
                            //setdata pr object mutate 
                             // SaveEdit(index);
                             const { label, key } = data[index];
                             var LABELL,KEY,
                             LABELL=label;
                             KEY=key
                             console.log(KEY, LABELL)
                             let currentObj = data[index];
                            // console.log(currentObj)
                            //  SaveEdit(index)
                             
                            //  let editedobj = {
                            //    ...currentObj,
                            //    label: Updatedlabel,
                            //    key: Updatedkey,
                            //   };
  
                           
                              // console.log(data)
                              // setdata((data_)=>{
                                // Object.keys(data).filter((filt_obj)=>{
                                  // console.log(filt_obj)
                                // })
                              // })
                             // setdata((prev)=>{
                             //   console.log(prev)
                             // })
                             //data is updating but not in the original array
                            //  console.log(editedobj)
   
   
   
                           
                             // setdata(da=>{
                             //   return 
                             // })
                             // data.map((cons, ind) => {
                             //   let filterobj = data.filter((cons) => {
                             //     return cons.id == index;
                             //   });
                             //   return filterobj;
                             //   // const {id,Label,key}=cons
   
                             //   // return
                             //   // console.log(cons[id])
                             //   // console.log({...cons==index})
                             // }
   
                             // );
                             // let getobj = data.filter((obj) => {
                             //   // let indexObj=obj.id;
                             //   // return indexObj
   
                             //   return obj.key;
                             // });
                             // console.log(getobj);
   
                             // setdata(prev=console.log(prev))
                             //get obj based on its index
                             // thn modify its values not keys
                             // for (let i = index; i <= index; i++) {
                             //   const element = data[i];
                             //   console.log(element)
                             // }
   
                             // let findobj=findIndex(getobj)
                             // console.log(findobj)
   
                             // for (const key in getobj) {
                             //   const element = getobj[key];
                             //   const element2 = getobj[];
                             //   console.log(element2)
                             // }
                             // console.log({...getobj})/
                             // setdata(data.map((cons,i)=>{
   
                             //   if (cons.i==index){
                             //     let updatedvalue={...cons,label:Updatedlabel, key:Updatedkey};
                             //     return updatedvalue
   
                             //   }
                             //   return cons.id;
                             // }))
                           }}
                         >
                           Save edited
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
  

  export default CustomBasicHookForm