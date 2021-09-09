import React, { useRef, useState, useEffect } from "react"

import "./ImageUpload.css"
import Button from "./Button"

export default function ImageUpload(props) {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) return

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    function pickedHandler(event) {

        let pickedFile;
        let fileIsValid = isValid

        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false
        }

        props.onInput(props.id, pickedFile, fileIsValid)
    }

    function pickImageHandler() {
        filePickerRef.current.click()
    }

    return (
        <div className="form-cotrol">
            <input
                type="file"
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />

            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p className="error-text">{props.errorText}</p>}
        </div >
    )
}