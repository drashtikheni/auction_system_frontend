import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"

import "./UpdatePlace.css"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UIElements/Card"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useForm } from "../../shared/hooks/form-hook"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"

export default function UpdatePlace()
{

    const auth = useContext(AuthContext)
    const history = useHistory()
    const placeId = useParams().placeId
    const [identifiedPlace, setIdentifiedPlace] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            }
        },
        false
    )

    useEffect(() =>
    {

        const searchPlace = async () =>
        {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)

                console.log(formState.inputs)
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    },
                    true
                );
                console.log(formState.inputs)
                setIdentifiedPlace(responseData.place)
            }
            catch (error) {
                console.log(error)
            }
        }
        searchPlace()

    }, [sendRequest, placeId, setFormData])

    async function updatePlaceHandler(event)
    {
        event.preventDefault()

        try {
            console.log(placeId)
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                "PATCH",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token
                }
            )
            console.log("Updated Successfully")
            history.push("/" + auth.userId + "/places")
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

    if (!identifiedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find Auction!</h2>
                </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && identifiedPlace && (
                <form className="place-form" onSubmit={updatePlaceHandler}>
                    <Input
                        id="title"
                        type="text"
                        element="input"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={formState.inputs.title.value}
                        initialValid={formState.inputs.title.isValid}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (at least 5 characters)."
                        onInput={inputHandler}
                        initialValue={formState.inputs.description.value}
                        initialValid={formState.inputs.description.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid} >UPDATE AUCTION</Button>
                </form>
            )}
        </React.Fragment>
    )
}