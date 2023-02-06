import jwt_decode from 'jwt-decode'
//const local = require('node-localstorage').LocalStorage;
// JWT exp is in seconds
export function validarToken() {
    
    let token = localStorage.getItem('tokenid');

    let decodedToken = jwt_decode(token);
    
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return false
    } else {
        return true
    }
    
}

