import React, { useState, useContext, } from "react"

import "./PlaceItem.css"
import Card from "../../shared/components/UIElements/Card"
import Modal from "../../shared/components/UIElements/Modal"
import Button from "../../shared/components/FormElements/Button"
import Map from "../../shared/components/UIElements/Map"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"

export default function PlaceItem(props)
{

    const auth = useContext(AuthContext)
    const placeId = props.id
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [showMap, setShowMap] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    function openMapHandler()
    {
        setShowMap(true)
    }
    function closeMapHandler()
    {
        setShowMap(false)
    }
    function openConfirmDeleteHandler()
    {
        setShowConfirmDelete(true)
    }
    function closeConfirmDeleteHandler()
    {
        setShowConfirmDelete(false)
    }
    async function deletePlaceItemHandler()
    {
        setShowConfirmDelete(false)

        try {
            console.log(placeId)
            const responseData = await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                "DELETE",
                {},
                {
                    Authorization: "Bearer " + auth.token
                }
            )
            console.log(responseData.message)
            props.onDelete(responseData.placeId)
        } catch (error) {
            console.log(error)
        }
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

            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.place.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={
                    <Button onClick={closeMapHandler}>CLOSE</Button>
                }
            >

                <div className="map-container">
                    <Map center={props.place.location} zoom={10} />
                </div>

            </Modal>
            <Modal
                show={showConfirmDelete}
                onCancel={closeConfirmDeleteHandler}
                header={<p>Delete Confirmation</p>}
                style={{ height: "38%" }}
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={closeConfirmDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={deletePlaceItemHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Are you sure to delete? Please note that it can'e be undone afterthat.</p>

            </Modal>

            <li className="place-item">
                <Card className="product_item__content">
                    <div className="place-item__image">
                        <img src={`http://localhost:5000/${props.place.image}`} alt={props.place.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.place.title}</h2>
                        <h3>{props.place.address}</h3>
                        <p>{props.place.description}</p>
                    </div>
                    <div className="place-item__actions" >

                        {auth.isLoggedIn && auth.userId === props.place.creator && <Button to={`/places/${props.place.id}`}>EDIT</Button>}
                        {auth.isLoggedIn && auth.userId === props.place.creator && <Button danger onClick={openConfirmDeleteHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}