// ** Router Import
import { useEffect } from 'react'
import { softRequest } from './@core/auth/request'
import Router from './router/Router'
import { useSelector, useDispatch } from 'react-redux'
import { ADMIN_PROFILE, GET_ALL_COUNTRY } from './@core/auth/req.config'
import { setUserData, setCountriesData } from '@store/actions/auth'

const App = (props) => {
  // const userData = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    getUserProfileData();
    getAllCountries()
  }, [])

  const getUserProfileData = async () => {
    const response = await softRequest(ADMIN_PROFILE, 'GET', false, true);
    const { ok, result, } = response;
    if (!ok) {
      return
    }
    dispatch(setUserData(result))
  }

  const getAllCountries = async () => {
    const response = await softRequest(GET_ALL_COUNTRY, 'GET', false, true);
    const { ok, result, } = response;
    if (!ok) {
      return
    }
    dispatch(setCountriesData(result))
  }

  return <Router />
}

export default App
