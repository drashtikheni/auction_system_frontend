import { useState, useCallback, useEffect } from "react"

export function useAuth() {
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState()
    const [tokenExpirationDate, setTokenExpirationDate] = useState()

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token)
        setUserId(uid)

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDate)

        localStorage.setItem("userData", JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setTokenExpirationDate(null)
        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))

        if (userData && userData.token && new Date(userData.expiration) > new Date()) login(userData.userId, userData.token, new Date(userData.expiration))
    }, [login])

    useEffect(() => {
        let logoutTimer;
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        }
        else clearTimeout(logoutTimer)
    }, [token, logout, tokenExpirationDate])


    return { token, userId, login, logout }
}