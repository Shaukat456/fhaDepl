import { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import DropdownSizes from './DropdownSizes'




const DropdownAdmin = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const numopt=[
    {
        op1:'Minvalue',
        op2:'MaxValue',
        op3:"Dropdown"
    },


]
  const DataType=[
    {
        op1:'Number',
        op2:'String ',
        op3:"Radio",
        op4:"Dropdown "
    },


]

const dropdOpt=[
    {
        opt1:'Amount',
        opt2:'Percentage',
        opt3:"None "
    }
]
const[ dropdownState,setDropdown]=useState('')
const[ dropNumber,setDropNumber]=useState('')
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <ButtonDropdown isOpen={dropdownOpen}  toggle={toggleDropdown}  >
      <DropdownToggle color='primary' caret>
        TYPE
      </DropdownToggle>
      <DropdownMenu>
      
       { DataType.map((v)=>{
           return (
               <>
               
               <DropdownItem href='#' onClick={
                 ()=>{
                   setDropdown(()=>{

                  return(
                    numopt.map((op)=>{
                      return (
                        <>
                      
                          <ButtonDropdown  isOpen={dropdownOpen}  toggle={toggleDropdown}>
                          <DropdownToggle  color='primary' caret > Number

                             <DropdownMenu >
                              <DropdownItem onClick={
                                ()=>setDropNumber(()=>{
                              return(
                                dropdOpt.map((num)=>{
                                  return(
                                    <>
                                    <ButtonDropdown  isOpen={dropdownOpen}  toggle={toggleDropdown}>
                                    <DropdownToggle  color='primary' caret >
                                      Dropdown 
                                    <DropdownMenu>
                                      <DropdownItem> {num.opt1} </DropdownItem>
                                      <DropdownItem> {num.opt2} </DropdownItem>
                                      <DropdownItem> {num.opt3} </DropdownItem>
                                    </DropdownMenu>

                                    </DropdownToggle>
                                    </ButtonDropdown>
                                    </>
                                  )
                                 })
                              )
                                })
                              }> {op.op3} </DropdownItem>
                              <DropdownItem> {op.op2} </DropdownItem>
                              <DropdownItem> {op.op1} </DropdownItem>
                            </DropdownMenu> 
                          </DropdownToggle>

                          </ButtonDropdown>
                        </>
                      )
                    })
                  )
                   })
                 }

               } > {v.op1} </DropdownItem>




               <DropdownItem href='#' onClick={()=>{
                 setDropNumber(false)
                 setDropdown(false)
               }}> {v.op2} </DropdownItem>
               <DropdownItem href='#'onClick={()=>{
                 setDropNumber(false)
                 setDropdown(false)
               }} > {v.op3} </DropdownItem>
               <DropdownItem href='#'onClick={()=>{
                 setDropNumber(false)
                 setDropdown(false)
               }} > {v.op4} </DropdownItem>
               </>
           )
       }) }

      </DropdownMenu>
   
     {dropdownState}
      {dropNumber}
     
    </ButtonDropdown>
  )
}
export default DropdownAdmin
