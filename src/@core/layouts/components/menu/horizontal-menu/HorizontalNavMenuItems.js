// ** React Imports
import { useContext } from 'react'

// ** Ability Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Menu Components Imports
import HorizontalNavMenuLink from './HorizontalNavMenuLink'
import HorizontalNavMenuGroup from './HorizontalNavMenuGroup'
import {
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent,
  CanViewMenuGroup,
  CanViewMenuItem
} from '@layouts/utils'

const HorizontalNavMenuItems = props => {
  // ** Context
  const ability = useContext(AbilityContext)

  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink
  }

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return CanViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    }
    return CanViewMenuItem(item) && <TagName item={item} index={index} key={item.id} {...props} />
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
