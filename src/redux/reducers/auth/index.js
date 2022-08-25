
const initialState = {
  userData: {}
}
// **  Initial State
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        userData: action.data,
      }
    }
    case 'SET_COUNTRY_DATA': {
      state.userData['countries'] = action.data
      return {
        userData: state.userData
      }
    }
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
      }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }
    default:
      return state
  }
}

export default authReducer
