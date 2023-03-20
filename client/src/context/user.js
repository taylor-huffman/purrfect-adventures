import React, { useEffect, useState } from 'react'

const UserContext = React.createContext()

function UserProvider({ children }) {

    const [user, setUser] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [authErrors, setAuthErrors] = useState([])

    useEffect(() => {
        fetch('/auth')
        .then(r => {
            if (r.ok) {
                r.json().then(user => {
                    setUser(user)
                    setIsAuth(true)
                    setIsLoading(false)
                })
            } else {
                r.json().then(errors => {
                    console.log(errors)
                    setAuthErrors(errors.errors)
                    setIsLoading(false)
                })
            }
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, isLoading, authErrors, setAuthErrors }}>{children}</UserContext.Provider>
    )
}

export { UserContext, UserProvider }