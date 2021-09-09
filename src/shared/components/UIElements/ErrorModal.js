import React from "react"

import Modal from "./Modal"
import Button from "../FormElements/Button"

export default function ErrorModal(props) {

    return <Modal
        style={{ height: "35%", width: "70%" }}
        onCancel={props.onClear}
        header="An Error Occurred!"
        show={!!props.error}
        footer={<Button onClick={props.onClear}>Okay</Button>}
    >
        <p>{props.error}</p>
    </Modal>
}