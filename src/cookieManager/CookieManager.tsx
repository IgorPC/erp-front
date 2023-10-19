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

export default { setJwtToken, setUserData, getJwtToken, getUserData }