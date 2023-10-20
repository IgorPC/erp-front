import Cookies from "js-cookie"

const setJwtToken = (token: string) => {
    Cookies.set('jwtToken', token);
}

const setUserData = (userData: object) => {
    Cookies.set('userData', JSON.stringify(userData));
}

const getJwtToken = () => {
    return Cookies.get('jwtToken')
}

const getUserData = () => {
    const data = Cookies.get('userData');
    if (data) {
        return JSON.parse(data)
    }
}

const setLastInteraction = (time: string) => {
    Cookies.set('lastInteraction', time);
}

const getLastInteraction = ():string => {
    const data = Cookies.get('lastInteraction')
    if (data) {
        return data
    }
    
    return '00:00:00'
}

const setTokenTime = (time: string) => {
    Cookies.set('tokenTime', time);
}

const getTokenTime = ():string => {
    const data = Cookies.get('tokenTime')
    if (data) {
        return data
    }

    return '00:00:00'
}

const clearSessionData = () => {
    Cookies.remove('jwtToken')
    Cookies.remove('userData')
    Cookies.remove('tokenTime')
    Cookies.remove('lastInteraction')
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