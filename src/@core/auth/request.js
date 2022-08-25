import { errorToast } from "../components/toastify";
import axios from  'axios'

// GET DELETE
export const softRequest = async (URL, method = 'GET', showError = true, auth = false) => {
  try {
    const header = {
      'content-type': 'application/json'
    }    
    if (auth) {
      const token = JSON.parse(localStorage.getItem('accessToken'));
      header['authorization'] =token;
    }
    const response = await fetch(URL, { method: method, headers: header });
    if (response.status !== 200) {      
      throw response;
    }
    const result = await response.json();
    return { result: result.data, msg: result.msg, ok: true }

  } catch (error) {
    const { status, statusText } = error;
    if (showError) {
      errorToast(status, statusText);
    }
    return { data: null, msg: error, ok: false }
  }
}

//  POST PUT PATCH
export const hardRequest = async (URL, body, method = 'POST', showError = true, auth = true) => {

  console.log(  'parameters of hard request => ' + URL, body, method , showError , auth )
  try {
    const header = {
      'content-type': 'application/json'
    }
    if (auth) {
      const token = JSON.parse(localStorage.getItem('accessToken'));


      console.log("token from request js ", token)
      
      header['authorization'] =token


      // header['Authorization'] = `Bearer ${token}`;

      
      // header['uthorization'] = `Bearer ${token}`;
      // header['Authorization'] = `Bearer isdjfdsjfds44363ksfjdkf`;


    }
    const response = await fetch(URL, { method: method, headers: header, body: JSON.stringify(body) });
    if (response.status !== 200) {
      throw response;
    }
    console.log(response, '=========> response')

    const result = await response.json();
    return { result: result.data, msg: result.msg, ok: true }
  } 
  catch (error) {
    const { status, statusText } = error;
    console.log("error login ", error )
    console.log("status text",statusText)


    if (showError) {
      errorToast(status, statusText);
    }

   return { data: null, msg: error, ok: false }

  }
}
export const hardRequestViaAxios = async (URL, body, method = 'POST', showError = true, auth = false) => {
  
  console.log(  'parameters of Axios hard request  => ' + URL, body, method , showError , auth )
  try {
    const header = {
      'content-type': 'application/json'
    }
    if (auth) {
      const token = JSON.parse(localStorage.getItem('accessToken'));
      header['authorization'] = `Bearer ${token}`;
    }
    const response = await axios.post(URL, JSON.stringify(body),  { method: method, headers: header});



   console.log( "\n this is response =>", JSON.parse(response))



    if (response.status !== 200) {
      console.log(response)
      throw response;
    }
    const result = await response.json();
    return { result: result.data, msg: result.msg, ok: true }

  } catch (error) {
    const { status, statusText } = error;
    if (showError) {
      errorToast(status, statusText);
    }
    // return { data: null, msg: error, ok: false }
  }
}


