// ** React Imports
import { useContext } from 'react'

// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Ability Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
  CanViewMenuGroup,
  CanViewMenuItem
} from '@layouts/utils'

const VerticalMenuNavItems = props => {
  // ** Context
  const ability = useContext(AbilityContext)

  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      // return CanViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
      return  <TagName item={item} index={index} key={item.id} {...props} />

    }
    return  <TagName key={item.id || item.header} item={item} {...props} />

    // return CanViewMenuItem(item) && <TagName key={item.id || item.header} item={item} {...props} />
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
