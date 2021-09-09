import React from "react"

import "./LoadingSpinner.css"

export default function LoginSpinner(props) {
    return (
        <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}