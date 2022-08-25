
import useJwt from '@src/auth/jwt/useJwt'
// ** UseJWT import to get config
const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = (data) => {

  //call this function on login 
  // in data , we will recieve jwt token 
  // in value  of access token we will pass data value 

  console.log("this is data",data)


  //if no data is receieved it will set Tokens to these 
  data = data || {
    //this is working fine 
    // "accessToken": "random_Token_data_not_recieved",
    // "refreshToken": "random_Token_data_not_recieved",

    // this is not returning the value of data 
    "accessToken":data,
    "refreshToken":data,

    ability: [
      {
        action: 'admin',
        subject: 'all'
      }
    ]
  }
  // data is returning undefined because the handle login is not getting called anywhere.
  console.log("data.....", data);


  
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data))
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data))
  }
}


// set user data

export const setUserData = data => {
  return dispatch => {
    dispatch({
      type: 'SET_USER_DATA',
      data,
    })
  }
}

export const setCountriesData = data => {
  return dispatch => {
    dispatch({
      type: 'SET_COUNTRY_DATA',
      data,
    })
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
