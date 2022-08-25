import { Fragment } from 'react'
import Avatar from '@components/avatar'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import { toast, Slide } from 'react-toastify'

const ToastContent = ({ title, message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>{title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

export const successToast = (title, message) => {
  toast.success(
    <ToastContent title={title} message={message} />,
    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
  )
}

export const errorToast = (title, message) => {
  toast.error(
    <ToastContent title={title} message={message} />,
    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
  )
}
