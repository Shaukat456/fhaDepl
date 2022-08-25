import { useContext, useEffect, useRef, useState } from "react";
// ** Third Party Components
import { User } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";
import "cleave.js/dist/addons/cleave-phone.pk";
import {
  Row,
  Col,
  Button,
  Form,
  Card,
  CardHeader,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import {
  inputTextField,
} from "../../components/common-functions/input-fields";
import { useSelector, useDispatch } from "react-redux";
import {
  hardRequest,
} from "../../../@core/auth/request";
import { ADD_CONSUMER } from "../../../@core/auth/req.config";
import { CustomTableResponsive2 } from "../../tables/reactstrap/TableResponsive";
import { CustomPagination } from "../../components/pagination/PaginationSeparated";


const ConsumerType = () => {
  const { register, errors, handleSubmit, control, setValue, trigger, reset } =
    useForm();

 async function onConsumerSubmit(e) {
    const  {
      consumer_id,
      first_name,
      last_name,
      phone_,
      producer_id,
      title,
    } = e;

    // in order to send it to database We will assign destructured properties to that of data base properties
    const body = { title:title, firstName:first_name , lastName:last_name , producerId:producer_id , consumerTypeId:consumer_id , phone:phone_  }



    
    console.log("this body is for database ", body)

    try {
      const response =await hardRequest(ADD_CONSUMER ,body,"POST",true,true )
      console.log("successfully registered " , response)
    
    } catch (error) {
        console.log("error sending consumer data to backend",error )
    }
  }
  return (
    <>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <Row className="mt-1">
            <Col sm="12">
              <h4 className="mb-1">
                <User size={20} className="mr-50" />
                <span className="align-middle">Consumer Information</span>
              </h4>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit(onConsumerSubmit)}>
            <Row>
              {inputTextField("Title", "Title", errors, register)}

              {inputTextField("First Name", "First Name", errors, register)}

              {inputTextField("Last Name", "Last Name", errors, register)}
              {inputTextField("Phone ", "Phone ", errors, register)}
              {inputTextField("Producer Id", "Producer Id", errors, register)}
              {inputTextField("Consumer Id", "Consumer Id", errors, register)}
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
        </CardHeader>
        {/* <CustomTableResponsive2
            list={Consumer_Data}
            PostUrl={GET_ALL_CONSUMER}
          />
          
<CustomPagination
            page={page}
            inc={() => {
              setpage(page + 1);
            }} />
              <Button
            type="button"
            color="primary"
            className="  mb-sm-0  mr-sm-1  mx-1   mb-3"
            onClick={getAllConsumer}
          >
            Get Consumer  type data
          </Button> */}
      </Card>

    </>
  );
};

export default ConsumerType;
