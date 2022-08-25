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

  inputSelectField,
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
import { BasicHookForm2 } from "../../forms/validations/react-hook-form/BasicHookForm";


const User_Demo_Data = [
  { id: 0, key: 0, label: "Bob " },
  { id: 1, key: 1, label: "John" },
  { id: 2, key: 2, label: "David" },
];


const Producer = ()=>{

 
const { register, errors, handleSubmit, control, setValue, trigger, reset } =
useForm();


  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [loader, setloader] = useState(false);
  const [Prod_Data, setProd_Data] = useState([]);
  const [ProdID_Data, setProdID_Data] = useState();
  const [ProdTitle_Data, setProdTitle_Data] = useState();
  const [RecFormData, setRecFormData] = useState();


  useEffect(() => {
    getAllProducer();
  }, [page]);

  const getAllProducer = async () => {
    // setloader(true)
    const response = await softRequest(
      `${PRODUCER}?page=${page}&limit=${limit}`,
      "GET",
      true,
      true
    );
    // console.log(response);

    setloader(() => {
      return (
        <>
          <ComponentSpinner />
        </>
      );
    });

    setTimeout(() => {
      setloader(false);
    }, 1000);

    // result= all producer data
    const { result } = response;
    const { producerTypeId , title} =result
    // setProdTitle_Data(title)
    // console.log(result)
    

    result.forEach(element => {
        element.key=element.title
        element.label=element.title

        setProdID_Data(element.producerTypeId)
        setProdTitle_Data(element.title)
        

        // setProdID_Data(element.)
        
    });

    console.log("mutated obj" ,result )
    // let keyLabel={...result, }
    // console.log(result);
    setProd_Data(result);
    // setProdID_Data(result._id)
  

  };









const Producer_Data = [
    { id: 1, key: 1, label: "Restaurant" },
    { id: 2, key: 2, label: "Mart" },
    { id: 3, key: 3, label: "Distributor (oil supply)" },
    { id: 4, key: 4, label: "Pharmasutical" },
  ];



// getDataFromServer()

const OnProducerSubmit=async(prod_Data)=>{
  const { title,address}=prod_Data;
  console.log(address)
 
  const body={title:title ,address:address, address:address,producerTypeId:ProdID_Data}
  console.log(body)
  const postProducerData=await hardRequest(PRODUCER ,body, "POST", true , true)


  console.log("post producer data",postProducerData)
}
   
const getData = (data) => {
  //  console.log( "get data",data)
  setRecFormData(data);
};


// ?? add actions 
// populate add consumer form
// fix async select 
return (
  <>

      <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        
        <Form  onSubmit={handleSubmit(OnProducerSubmit)}>
        <Row className="mt-1">
            <Col sm="12">
              <h4 className="mb-1">
                <User size={20} className="mr-50" />
                <span className="align-middle">   Producer  </span>
              </h4>
            </Col>
          </Row>
          
          <Row className="">

          {inputTextField(
              "Title",
                        "Title",
                        errors,
                        register
                        )}
            
            {inputTextField(
                        "Address",
                        "Address",
                        errors,
                        register
                        )}

                  {/* On selecting producer we will fetch the selected producer id and send it to backend in the post request ?? */}

                  {/* {inputSelectFieldAdmin(
                    "Select Producer ",
                    "Select Producer ",
                    Prod_Data,
                    Prod_Data,


                  )} */}
              {/* <AsyncSelectProducer   title='Select Producer '   api_url={Prod_Data}    /> */}
              {/* {inputSelectField()} */}
              
              {/* {inputSelectField("Select Producer type", "Select Producer type", Prod_Data, (e, key) => {
                  const { producerTypeId , _id }=e;
                  console.log(producerTypeId)

                  setProdID_Data(producerTypeId);
                  

              })} */}

              <AsyncSelectProducer  title='Select Producer ' demoData={Prod_Data}  api_url={PRODUCER} />
              

          </Row>
<Row>
<Col sm="12">


       <Button
                type="submit"
                color="primary"
                className="mb-1 mb-sm-0 mr-0 mr-sm-1 "
                >
                Save Producer 
              </Button>
  </Col>
                  </Row>
          </Form>
        </CardHeader>

          </Card>

          <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start  border-bottom">
          <CustomTableResponsive2
            list={Prod_Data}
            PostUrl={PRODUCER}
          />


<CustomPagination
            page={page}
            inc={() => {
              setpage(()=>{
                if (page.length ===0 ){
                  return 
                }
                return page + 1 
              });
            }}
            dec={() => {
              setpage(()=>{
                return page - 1 > 0
              });
            }}
            
            />
            </CardHeader>
            </Card>

  </>
)


}

export default Producer;