import JwtService from './jwtService'
// ** JWT Service Import
// ** Export Service as useJwt
export default function useJwt(jwtOverrideConfig) {
  const jwt = new JwtService(jwtOverrideConfig)
  return {
    jwt
  }
}
