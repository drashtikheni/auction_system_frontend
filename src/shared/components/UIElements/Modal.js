import React from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"

import "./Modal.css"
import Backdrop from "./Backdrop"

function ModalOverlay(props) {

    const content = (
        <div style={props.style}
            className={`modal ${props.className}`}
            style={props.style}
        >
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>

            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>

                <footer className={`modal__footer ${props.footerClass}`} style={{ verticalAlign: true }}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )


    return ReactDOM.createPortal(content, document.getElementById("modal-container"))
}

export default function Modal(props) {

    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}

            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
                <ModalOverlay {...props} style={props.style} />
            </CSSTransition>
        </React.Fragment>
    )

}