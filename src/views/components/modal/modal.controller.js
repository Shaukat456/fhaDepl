import { useEffect } from 'react'
import { avTableModal } from '@store/actions/layout';
import { useDispatch } from 'react-redux';
import { store } from '../../../redux/storeConfig/store'

export const PopUpAvtModal = (modal) => {
  store.dispatch(avTableModal(modal));
}
