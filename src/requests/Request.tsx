import axios from "axios"
import CookieManager from "../cookieManager/CookieManager";

const defaultUrl = "http://127.0.0.1:8000/api";
const token = CookieManager.getJwtToken()

const defaultHeaders = {
    'content-type': 'application/json'
}

const authHeaders = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
}

const post = async (endpoint: string, body: any, auth: boolean = false): Promise<any> => {
    try {
        const data = await axios.post(`${defaultUrl}${endpoint}`, body, {
            headers: auth ? authHeaders : defaultHeaders
        })
    
        return data
    } catch (error: any) {
        if (error.response.status === 401) {
            CookieManager.clearSessionData()
            window.location.href = '/login';
        }
        return false
    }
}

const get = async (endpoint: string, auth: boolean = false): Promise<any> => {
    try {
        console.log(auth ? authHeaders : defaultHeaders)
        const data = await axios.get(`${defaultUrl}${endpoint}`, {
            headers: auth ? authHeaders : defaultHeaders
        })
    
        return data
    } catch (error: any) {
        if (error.response.status === 401) {
            //CookieManager.clearSessionData()
            //window.location.href = '/login';
        }

        return false
    }
}

export default { post, get }