// Constants
// export const BASE_URL = 'http://localhost:80';
export const BASE_URL =process.env.REACT_APP_BE_URL ;



// Authentications
// export const ADMIN_LOGIN = `${BASE_URL}/api/v1/a/auth/login`;
export const ADMIN_LOGIN = `${BASE_URL}/api/v1/auth/login`;


export const ADMIN_PROFILE = `${BASE_URL}/api/v1/a/profile`;

// companies
export const GET_ALL_COMPANIES = `${BASE_URL}/api/v1/a/company`;
export const ADD_COMPANY = `${BASE_URL}/api/v1/a/company`;
export const DELET_COMPANY = `${BASE_URL}/api/v1/a/company`;

// vehicles
export const ADD_VEHICLE = `${BASE_URL}/api/v1/a/vehicle`;

// Products
export const GET_ALL_PRODUCTS = `${BASE_URL}/api/v1/a/product`;
export const ADD_PRODUCT = `${BASE_URL}/api/v1/a/company`;
export const DELET_PRODUCTS = `${BASE_URL}/api/v1/a/product`;

// Consumer
// export const ADD_CONSUMER=`localhost:5500/api/v1/consumer/createConsumer`
// export const ADD_CONSUMER=`http://localhost:3000/api/v1/consumerType`
export const ADD_CONSUMER=`${BASE_URL}/api/v1/consumer/createConsumer`
export const GET_ALL_CONSUMER=`${BASE_URL}/api/v1/createConsumer`

export const CONSUMER_TYPE=`${BASE_URL}/api/v1/consumerType`

//Producer 
export const PRODUCER=`${BASE_URL}/api/v1/producer`


//Producer Type
export const PRODUCER_TYPE=`${BASE_URL}/api/v1/producerType`
export const GET_PRODUCER_TYPE=`${BASE_URL}/api/v1/consumerType?page=1&limit=10`



// countries
export const GET_ALL_COUNTRY = `${BASE_URL}/api/v1/a/country`;

// areas
export const GET_ALL_AREAS = `${BASE_URL}/api/v1/a/areas`;

// city
export const GET_ALL_CITY = `${BASE_URL}/api/v1/a/city`;

// state
export const GET_ALL_STATE = `${BASE_URL}/api/v1/a/state`;
