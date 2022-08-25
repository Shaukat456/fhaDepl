
import { Fragment } from 'react'
import { UncontrolledTooltip } from 'reactstrap'

export const TooltipUncontrolled = (label, id) => {
  return (
    <UncontrolledTooltip placement='top' target={id}>
      {label}
    </UncontrolledTooltip>
  )
}

