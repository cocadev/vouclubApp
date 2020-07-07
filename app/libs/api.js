import globalVals from './global'
import AsyncStorage from '@react-native-community/async-storage';

class API {
    static headers() {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
      }
    }
  
    static get(route, params, headers) {
      return this.xhr(route, params, headers, 'GET'); 
    }
  
    static put(route, params, headers) {
      return this.xhr(route, params, headers, 'PUT')
    }
  
    static post(route, params, headers) {
      return this.xhr(route, params, headers, 'POST')
    }
  
    static delete(route, params, headers) {
      return this.xhr(route, params, headers, 'DELETE')
    }
  
    static xhr(route, params,headers, verb) {
      const url = `${globalVals.baseURL}${route}`

      let param = JSON.stringify(params);
      if(route=='ups/uploadUserPhoto'){
        param = params;
      }
      
      let options = Object.assign({ method: verb }, params ? { body: param } : undefined );
      options.headers = headers

      console.log(url);

      return fetch(url, options).then( resp => {

        console.log(resp);

        let json = resp.json();
        
        // return resp
        
        if (resp.status == 200) {
          return Promise.all([resp.status,json]).then( res => ({ 
            status:res[0],
            response:res[1]
          }));
        }
        
        return json.then(err => {return {"status":resp.status, response:err}});
      }).then( json => json ); 

    }

    static getLocalStorage(key){
      return AsyncStorage.getItem(key).then(val => {
          return val;
      });
    }
  }
  export default API