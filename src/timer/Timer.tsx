import CookieManager from "../cookieManager/CookieManager";
import Request from "../requests/Request";

const getCurrentTime = () => {
    const currentDate = new Date();
    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
}

const compareTokenTime = async () => {
    return calculateDifferenceFromCurrentTime(await CookieManager.getTokenTime())
}

const compareLastInteraction = async () => {
    return calculateDifferenceFromCurrentTime(await CookieManager.getLastInteraction())
}

const calculateDifferenceFromCurrentTime = (time: string) => {
    const currentDate = getCurrentTime()
  
    const [currentDateHH, currentDateMM, currentDateSS] = currentDate.split(":").map(Number);
    const [timeHH, timeMM, timeSS] = time.split(":").map(Number);

    const totalMinutos1 = currentDateHH * 60 + currentDateMM + currentDateSS / 60;
    const totalMinutos2 = timeHH * 60 + timeMM + timeSS / 60;

    const diferencaMinutos = totalMinutos1 - totalMinutos2;
    return parseFloat(diferencaMinutos.toFixed(2))
}

const validateTokenIntegrity = async () => {
    const tokenCreatedTime = await compareTokenTime()
    const lastInteractionTime = await compareLastInteraction()
    const tokenExpiration = 15
    const InteractionExpiration = 10

    console.log(`Token created time: ${tokenCreatedTime}`)
    console.log(`Last Interaction time: ${lastInteractionTime}`)

    if (tokenCreatedTime <= tokenExpiration && lastInteractionTime < InteractionExpiration) {
        console.log(`Verified at ${getCurrentTime()} - No action required`)
    }

    if (tokenCreatedTime <= tokenExpiration && lastInteractionTime > InteractionExpiration) {
        console.log(`Verified at ${getCurrentTime()} - Logout the user`)
        RedirectToLogin()
    }

    if (tokenCreatedTime >= tokenExpiration && lastInteractionTime < InteractionExpiration) {
        console.log(`Verified at ${getCurrentTime()} - Token must be updated`)
        
        const user = await CookieManager.getUserData()
        const body = {
            email: user.email
        }
    
        const data = await Request.post("/regenerate-token", body, true)
    
        if (data.status === 200) {
            await CookieManager.setJwtToken(data.data.data.message)
            await CookieManager.setTokenTime(getCurrentTime())

            return
        }

        console.log(`Verified at ${getCurrentTime()} - Token invalid or exíred`)
        RedirectToLogin()
    }

    if (tokenCreatedTime <= tokenExpiration && lastInteractionTime > InteractionExpiration) {
        console.log(`Verified at ${getCurrentTime()} - No action required`)
        return
    }
}

function RedirectToLogin() {
    CookieManager.clearSessionData()  
    window.location.href = '/login';
}

export default { getCurrentTime, compareTokenTime, compareLastInteraction, validateTokenIntegrity }