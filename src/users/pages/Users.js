import React, { useEffect, useState } from "react"

import UsersList from "../components/UsersList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"
import "./Users.css"

export default function Users() {

    const [loadedUsers, setLoadedUsers] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users`)
                setLoadedUsers(responseData.users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [sendRequest])

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (<div className="center"><LoadingSpinner /></div>)}

        {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </React.Fragment>
}