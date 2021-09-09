import React from "react"

import "./PlaceList.css"
import Card from "../../shared/components/UIElements/Card"
import Button from "../../shared/components/FormElements/Button"
import PlaceItem from "./PlaceItem"

export default function PlaceList(props)
{

    if (!props.places || props.places.length < 1) {
        return (
            <div className="place-list center">
                <Card>
                    <h2 >No Auctions found. Maybe create one?</h2>
                    <Button to="/auctions/new" >CREATE AUCTION?</Button>
                </Card>
            </div>
        )
    }

    return <ul className="place-list">
        {props.places.map((place) => (
            <PlaceItem key={place.id} place={place} id={place.id} uid={props.uid} onDelete={props.onDelete} />
        ))}
    </ul>
}