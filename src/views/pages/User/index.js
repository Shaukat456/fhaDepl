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
  Card,
  CardHeader,
  Container
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import {

  inputSelectFieldAdmin,
  inputTextField,
} from "../../components/common-functions/input-fields";

import {  hardRequest, softRequest } from "../../../@core/auth/request";
import {
    PRODUCER
} from "../../../@core/auth/req.config";
import { errorToast, successToast } from "../../../@core/components/toastify";
import { AsyncSelectProducer } from "../../forms/form-elements/select/SelectOptions";
import { CustomTableResponsive2 } from "../../tables/reactstrap/TableResponsive";
import { CustomPagination } from "../../components/pagination/PaginationSeparated";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";


const User_Demo_Data = [
  { id: 0, key: 0, label: "Bob " },
  { id: 1, key: 1, label: "John" },
  { id: 2, key: 2, label: "David" },
];


const Producer = ()=>{

 
const { register, errors, handleSubmit, control, setValue, trigger, reset } =
useForm();

//   useEffect(() => {
//     getAllProducer();
//   }, [page]);

//   const getAllProducer = async () => {
//     // setloader(true)
//     const response = await softRequest(
//       `${PRODUCER}?page=${page}&limit=${limit}`,
//       "GET",
//       true,
//       true
//     );
//     // console.log(response);

//     setloader(() => {
//       return (
//         <>
//           <ComponentSpinner />
//         </>
//       );
//     });

//     setTimeout(() => {
//       setloader(false);
//     }, 1000);

//     // result= all producer data
//     const { result } = response;
//     const { producerTypeId , title} =result
//     // setProdTitle_Data(title)
//     // console.log(result)
    
//     result.forEach(element => {
//         element.key=element.title
//         element.label=element.title

//         setProdID_Data(element.producerTypeId)
//         setProdTitle_Data(element.title)
        

//         // setProdID_Data(element.)
        
//     });

//     console.log("mutated obj" ,result )
//     // let keyLabel={...result, }
//     // console.log(result);
//     setProd_Data(result);
//     // setProdID_Data(result._id)
  

//   };











// getDataFromServer()

const OnUserSubmit=async(User_Data)=>{
  const { email,first_name,last_name,password}=User_Data;

    const body={firstName:first_name,lastName:last_name, email:email,password:password };

   
//   console.log(body)
//   const postUserData=await hardRequest( ,body
// //     {
// //     title : "title",
// //           producerTypeId  : "producer_id",
// //           address : "address"
// // } 
// , "POST", true , true)


//   console.log("post producer data",postProducerData)
}
   


return (
  <>

      <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        
        <Form  onSubmit={handleSubmit(OnUserSubmit)}>
        <Row className="mt-1">
            <Col sm="12">
              <h4 className="mb-1">
                <User size={20} className="mr-50" />
                <span className="align-middle">   User   </span>
              </h4>
            </Col>
          </Row>
          
          <Row className="">

          {inputTextField(
              "First Name",
                        "First Name",
                        errors,
                        register
                        )}
            
            {inputTextField(
                        "last Name",
                        "last Name",
                        errors,
                        register
                        )}
            {inputTextField(
                        "Email",
                        "Email",
                        errors,
                        register
                        )}
            {inputTextField(
                        "Password",
                        "Password",
                        errors,
                        register
                        )}

            {/* {inputTextField(
                        "User Role ",
                        "User Role ",
                        errors,
                        register
                        )} */}

                 
              {/* <AsyncSelectProducer   title='Select Producer '   api_url={Prod_Data}    /> */}

              {/* <AsyncSelectProducer  title='Select Owner ' demoData={User_Demo_Data}  api_url={User_Demo_Data } /> */}
              

          </Row>
<Row>
<Col sm="12">


       <Button
                type="submit"
                color="primary"
                className="mb-1 mb-sm-0 mr-0 mr-sm-1 "
                >
                Save User
              </Button>
  </Col>
                  </Row>
          </Form>
        </CardHeader>

          </Card>
          {/* <CustomTableResponsive2
            list={Prod_Data}
            PostUrl={PRODUCER}
          />
<CustomPagination
            page={page}
            inc={() => {
              setpage(page + 1);
            }} /> */}
  </>
)


}

export default Producer;