import React,{useLayoutEffect,useRef} from "react"
import mapboxgl from 'mapbox-gl';

import "./Map.css"

export default function Map(props){
    const mapRef=useRef()
    const {center,zoom}=props
    mapboxgl.accessToken="pk.eyJ1IjoiZHJhc2h0aWtoZW5pIiwiYSI6ImNrcG53YnQxYTAyNmkycHF4dGZhZzQ4MTMifQ.GRhdzwT8bXNSlYLx7wnPxg"
    useLayoutEffect(()=>{
        
        new mapboxgl.Map({
           container:mapRef.current,
           style:"mapbox://styles/mapbox/dark-v10",
           center:center,
           zoom:zoom,
           pitch:60,
           attributionControl: false
       })
    },[center,zoom])

    return(
        <div
            id="load-map"
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    )

}