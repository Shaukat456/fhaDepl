import { useEffect, useRef, useState } from "react";
// ** Third Party Components
import { User } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm } from "react-hook-form";

import {
  Row,
  Col,
  Button,
  Form,
  Card,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { inputTextField } from "../../components/common-functions/input-fields";
import { hardRequest, softRequest } from "../../../@core/auth/request";
import {
  GET_ALL_CONSUMER,
  PRODUCER,
  PRODUCER_TYPE,
} from "../../../@core/auth/req.config";
import { errorToast, successToast } from "../../../@core/components/toastify";
import { CustomTableResponsive2 } from "../../tables/reactstrap/TableResponsive";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";
import PaginationSeparated, {
  CustomPagination,
} from "../../components/pagination/PaginationSeparated";
// import { Spinner } from 'reactstrap'

const demData = [
  { id: 0, key: 0, label: "Consumer" },
  { id: 1, key: 1, label: "Consumer" },
  { id: 2, key: 2, label: "Consumer" },
];

const ProducerType = () => {
  const { register, errors, handleSubmit, control, setValue, trigger, reset } =
    useForm();

  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [loader, setloader] = useState(false);
  const [Prod_typeData, setProd_typeData] = useState([]);

  useEffect(() => {
    getAllProducer();
  }, [page]);

  const getAllProducer = async () => {
    // setloader(true)
    const response = await softRequest(
      `${PRODUCER_TYPE}?page=${page}&limit=${limit}`,
      "GET",  
      true,
      true
    );
    console.log(response);

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

    const { result } = response;
    console.log(result);
    setProd_typeData(result);
  };


  const Save_Producer_type_Data = async (e) => {
    // console.log("save producer type ", e)
    const { title } = e;
    console.log(title.length);
    try {
      if (title.length <= 2) {
        return errorToast(
          "Invalid Input ",
          "input should atleast be of 3 characters"
        );
      }

      if (title.length > 2) {
        const payload = await hardRequest(PRODUCER_TYPE, e, "POST", true);

        const { msg, ok, result, data } = payload;

        if (!ok) return;
      }

      // if ()
      return successToast("Success", "Producer Type Saved");
    } catch (error) {
      console.log("error in producer type", error);

      errorToast("Producer Type Not Saved", error);
    }
  };

  const [formModal, setFormModal] = useState(false);
  const [label, setLabel] = useState("");
  const [ke, setke] = useState("");
  const [data, setdata] = useState();

  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(Save_Producer_type_Data)}>
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start  border-bottom">
            <Row className="mt-1">
              <Col sm="12">
                <h4 className="mb-1">
                  <User size={20} className="mr-50" />
                  <span className="align-middle"> Producer Type </span>
                </h4>
              </Col>
            </Row>
          </CardHeader>

          <Row className="mb-1 m-2">
            {inputTextField("Title", "Title", errors, register, "text")}
          </Row>

          <Col sm="12 " className="mb-2">
            <Button
              type="submit"
              color="primary"
              className="  mb-sm-0  mr-sm-1  mx-1   mb-3"
            >
              Save Changes
            </Button>
          </Col>
          {/* </Row> */}
        </Form>
      </Card>

      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start  border-bottom">
          <CustomTableResponsive2
            list={Prod_typeData}
            PostUrl={PRODUCER_TYPE}
            getUrl={PRODUCER}
          />

          {/* <Button.Ripple
            className="bg-primary text-light "
            outline
            onClick={() => setFormModal(!formModal)}
          >
            Add User
          </Button.Ripple> */}
          <CustomPagination
            page={page}
            inc={() => {
              setpage(page + 1);
            }}
            dec={() => setpage(page - 1)}
          />

          {/* <Button
            type="button"
            color="primary"
            className="  mb-sm-0  mr-sm-1  mx-1   mb-3"
            onClick={getAllProducer}
          >
            Get Producer type data
          </Button> */}

          {loader}
        </CardHeader>
      </Card>

      <Modal
        isOpen={formModal}
        toggle={() => setFormModal(!formModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setFormModal(!formModal)}>
          Add User
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {/* <BasicHookForm2/> */}

            <Form>
              <FormGroup>
                <Label for="label">Title </Label>
                <Input
                  id="label"
                  name="label"
                  innerRef={register({ required: true })}
                  invalid={errors.firstNameBasic && true}
                  placeholder="Enter Name "
                  value={label}
                  onChange={(v) => {
                    setLabel(v.target.value);
                    console.log(label);
                    if (label.length === null) {
                      console.log("no data ");
                    }
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="key">Id </Label>
                <Input
                  id="key"
                  name="key"
                  innerRef={register({ required: true })}
                  invalid={errors.lastNameBasic && true}
                  placeholder="Enter User Id "
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
                      setdata(() => [
                        ...data,
                        {
                          id: data[data.length - 1].id + 1,

                          label: label,
                          key: ke,
                        },
                      ]);
                      toast.success(<SuccessToast2 data={data} />, {
                        hideProgressBar: true,
                      });
                    }
                  }}
                  type="button"
                >
                  {/* { btnstate} */}
                  ADD USER
                </Button.Ripple>
              </FormGroup>
            </Form>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProducerType;
