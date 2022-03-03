import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import * as React from 'react';
import '../css/map.css';

const center = {
  lat: 51.505,
  lng: -0.09,
}

const Map = props => {

    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const [map, setMap] = useState(null);


    useEffect(() => {
        if (!map) return;
    
        map.addEventListener("click", (e) => {
          setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
        });
      }, [map]);

    const markerEventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    return (
        <div>
            <MapContainer center={center} zoom={13} id="map" whenCreated={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        draggable={true}
                        eventHandlers={markerEventHandlers}
                        position={position}
                        ref={markerRef}>
                    </Marker>
            </MapContainer>
            <p id='coords' style={{display:'none'}}>{`${position.lat} ${position.lng}`}</p>
        </div>
        
    );
  
}
export default Map;