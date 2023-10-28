import Cookies from "js-cookie"

const setJwtToken = async (token: string) => {
    await Cookies.set('jwtToken', token);
}

const setUserData = async (userData: object) => {
    await Cookies.set('userData', JSON.stringify(userData));
}

const getJwtToken = async () => {
    return await Cookies.get('jwtToken')
}

const getUserData = async () => {
    const data = await Cookies.get('userData');
    if (data) {
        return JSON.parse(data)
    }
}

const setLastInteraction = async (time: string) => {
    await Cookies.set('lastInteraction', time);
}

const getLastInteraction = async () => {
    const data = await Cookies.get('lastInteraction')
    if (data) {
        return data
    }
    
    return '00:00:00'
}

const setTokenTime = async(time: string) => {
    await Cookies.set('tokenTime', time);
}

const getTokenTime = async () => {
    const data = await Cookies.get('tokenTime')
    if (data) {
        return data
    }

    return '00:00:00'
}

const clearSessionData = async () => {
    await Cookies.remove('jwtToken')
    await Cookies.remove('userData')
    await Cookies.remove('tokenTime')
    await Cookies.remove('lastInteraction')
}

export default { 
    setJwtToken, 
    setUserData, 
    getJwtToken, 
    getUserData,
    setLastInteraction,
    getLastInteraction,
    setTokenTime,
    getTokenTime,
    clearSessionData
}