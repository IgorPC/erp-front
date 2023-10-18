import axios from "axios"

const defaultUrl = "http://127.0.0.1:8000/api";

const defaultHeaders = {
    'content-type': 'application/json'
}

const post = async (endpoint: string, body: any): Promise<any> => {
    try {
        const data = await axios.post(`${defaultUrl}${endpoint}`, body, {
            headers: defaultHeaders
        })
    
        return data
    } catch (error) {
        return false
    }
}

const get = async (endpoint: string): Promise<any> => {
    try {
        const data = await axios.get(`${defaultUrl}${endpoint}`, {
            headers: defaultHeaders
        })
    
        return data
    } catch (error) {
        return false
    }
}

export default { post, get }