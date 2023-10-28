import axios from "axios"
import CookieManager from "../cookieManager/CookieManager";

const defaultUrl = "http://127.0.0.1:8000/api";

const getHeaders = async (auth: boolean = false) => {
    const token = await CookieManager.getJwtToken()

    if (auth) {
        return {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    return {
        'content-type': 'application/json'
    }
}

const post = async (endpoint: string, body: any, auth: boolean = false): Promise<any> => {
    try {
        const data = await axios.post(`${defaultUrl}${endpoint}`, body, {
            headers: await getHeaders(auth)
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

const put = async (endpoint: string, body: any, auth: boolean = false): Promise<any> => {
    try {
        const data = await axios.put(`${defaultUrl}${endpoint}`, body, {
            headers: await getHeaders(auth)
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
        const data = await axios.get(`${defaultUrl}${endpoint}`, {
            headers: await getHeaders(auth)
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

const multiPartPutSendFile = async (endpoint: string, file: any) => {
    try {
        const token = await CookieManager.getJwtToken()

        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('_method', 'PUT');

        const data = await axios.put(`${defaultUrl}${endpoint}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
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

export default { post, get, put, multiPartPutSendFile }