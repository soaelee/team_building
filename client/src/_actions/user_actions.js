import axios from 'axios';
import { REGISTER_USER } from './types'
import {USER_SERVER} from '../components/Config.js'

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}