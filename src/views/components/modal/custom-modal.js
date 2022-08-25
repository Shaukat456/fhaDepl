import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CustomModalForm = (props) => {
  const { open, handleModal, ComponentContext } = props;
  const { ContextBody, ContextTitle, contextCallback, selectedCompany } = ComponentContext;
  return (
    <div className='demo-inline-spacing'>
      <div>
        <Modal backdrop="static" size="lg" style={{ maxWidth: '700px', width: '100%' }} scrollable isOpen={open} toggle={() => handleModal(!open)}>
          <ModalHeader toggle={() => handleModal(!open)}>{ContextTitle}</ModalHeader>
          <ModalBody>
            <ContextBody contextCallback={contextCallback} selectedCompany={selectedCompany} />
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
export default CustomModalForm
