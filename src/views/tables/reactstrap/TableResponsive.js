

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
import { toast } from "react-toastify";
import { errorToast , successToast } from '../../../@core/components/toastify';
import { useEffect, useState } from 'react';
import { hardRequest, softRequest } from "../../../@core/auth/request";
import { PRODUCER_TYPE } from "../../../@core/auth/req.config";

const TableResponsive = () => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope='col' className='text-nowrap'>
            #
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 1
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 2
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 3
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 4
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 5
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 6
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 7
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 8
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 9
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 10
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 11
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 12
          </th>
          <th scope='col' className='text-nowrap'>
            Heading 13
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='text-nowrap'>1</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
          <td className='text-nowrap'>Table cell</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableResponsive



const CustomTableResponsive2 = ({Title, list,PostUrl,getUrl}) => {

  const [id, setid]=useState()
  const [listofUser ,setlistofUser]=useState([list])
  

  async function DeleteConsumer(){
        const deletePost=await hardRequest(PostUrl,listofUser, "DEL",true,true)
        console.log(deletePost)
        setlistofUser((data) => data.filter((_, i) => i !== id))
        


        // const againFetchNewData=await softRequest(getUrl,"GET",  
        // true,
        // true)
       



  }

  useEffect(()=>{
    console.log(id)
  },[id])


  
console.log(listofUser)

  useEffect(()=>{
    setlistofUser(list)
  },[list])


  return (
    <Table responsive>
      <thead>
        <tr>
          
          {/* <th scope='col' className='text-nowrap'>
        Producer  Id 
          </th> */}
          
          <th scope='col' className='text-nowrap'>
            Title
          </th>
          <th scope='col' className='text-nowrap mx-2'>
          Actions
          </th>
         
        </tr>
      </thead>
      <tbody>


        {/* {listofUser.map((user)=>{ */}

         {/* <tr>    */}
                                {/* This will get fetch  from api*/}
          {listofUser.map(({title, _id}, i )=>{
            
              return (
                <>
                
                <tr key={i}>

                {/* <td className='text-nowrap'>  {_id} </td> */}
                <td className='text-nowrap'> {title} </td>

                <Button.Ripple
                      color="danger"
                      onClick={() =>{
                        setid(i)
                        DeleteConsumer()
                          }}
                    >
                      Delete{" "}
                    </Button.Ripple>


                    
                    {/* <Button.Ripple className=" mx-5 bg-primary text-light " outline >
            Update
          </Button.Ripple> */}
                </tr>
                </>
              )
          })} 
          
        
        {/* </tr>  */}
      {/* //  })}  */}
       
      </tbody>
    </Table>
  )
}

export  {CustomTableResponsive2}
