import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import PlaceList from "../components/PlaceList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"

export default function UserPlaces() {

    const { isLoading, error, clearError, sendRequest } = useHttpClient()
    const [loadedPlaces, setLoadedPlaces] = useState()
    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places)
                console.log(loadedPlaces)
            } catch (error) {
                console.log(error)
            }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    function deletedPlaceHandler(deletedPlaceId) {
        setLoadedPlaces(prevPlaces => prevPlaces.filter((place) => place.id !== deletedPlaceId))
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {!isLoading && <PlaceList places={loadedPlaces} onDelete={deletedPlaceHandler} />}
        </React.Fragment>
    )
}