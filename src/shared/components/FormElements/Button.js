import React from "react"
import { Link } from "react-router-dom"

import "./Button.css"

export default function Button(props) {
    if (props.href) {
        return (
            <a
                onClick={props.onClick}
                style={props.style}
                className={`button button--${props.size || "default"} ${props.inverse && "button--inverse"} ${props.danger && "button--danger"}`}
                href={props.href}
            >
                {props.children}
            </a>
        )
    }

    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                style={props.style}
                onClick={props.onClick}
                className={`button button--${props.size || "default"} ${props.inverse && "button--inverse"} ${props.danger && "button--danger"}`}
            >
                {props.children}
            </Link>
        )
    }

    return (
        <button onClick={props.onClick} disabled={props.disabled} type={props.type} style={props.style}
            className={`button button--${props.size || "default"} ${props.inverse && "button--inverse"} ${props.danger && "button--danger"}`}
        >
            {props.children}
        </button>
    )
}