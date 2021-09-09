import React from "react"
import UserItem from "./UserItem"

import "./UsersList.css"

export default function UsersList(props)
{
    return (
        <>
            {props.users.length === 0 && <h1>No Auction Data Found.</h1>}
            {props.users.length > 0 &&

                <ul className="users-list">
                    {props.users.map((user) => (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            placeCount={user.auctions.length}
                        />
                    ))}
                </ul>
            }
        </>
    )
}