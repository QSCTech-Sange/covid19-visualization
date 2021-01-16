import dynamic from "next/dynamic";
import {useState} from "react";

// disable ssr on AntV
const MapboxScene = dynamic(() => import("@antv/l7-react/lib/component/MapboxScene"), {ssr: false});
const LineLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.LineLayer), {ssr: false});
const PointLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.PointLayer), {ssr: false});

import data from './huge_json2.json'
// import hospitals from './hospital_json.json'

export default function Migration(props) {
    const [showMigrate, setShowMigrate] = useState(true)
    const [showHospitals, setShowHospitals] = useState(false)

    const new_test_data = [
        {
            lng: 114.345,
            lat: 31.455,
            lng2: 112.345,
            lat2: 30.455,
            value: 10,
        },
        {
            lng: 134.345,
            lat: 31.455,
            lng2: 132.345,
            lat2: 30.455,
            value: 10,
        },
        {
            lng: 132.345,
            lat: 37.455,
            lng2: 112.345,
            lat2: 30.455,
            value: 10,
        },
    ];
    // const hospitals = [
    //     {
    //         lng: 114.345,
    //         lat: 31.455,
    //     }
    // ]
    const new_data = [
        {
            lng: 114.345,
            lat: 31.455,
            value: 10,
        },
        {
            lng: 134.345,
            lat: 31.455,
            value: 10,
        },
        {
            lng: 132.345,
            lat: 37.455,
            value: 10,
        },
    ];

    return (
        <div className="migration">
            <MapboxScene
                option={{}}
                map={{
                    style: 'dark',
                    center: [112, 40],
                    pitch: 45,
                    zoom: 3,
                    token: 'pk.eyJ1IjoiemVuZ2Nob25nIiwiYSI6ImNrankxejBrMTA0ajYydXA4eXE4YmhnN2MifQ.0NVFgToOPeT5WKKZjC0--A',
                }}
            >
                {showMigrate && data && <LineLayer
                    source={{
                        new_test_data,
                        parser: {
                            type: "json",
                            x: 'lng',
                            y: 'lat',
                            x1: 'lng',
                            y1: 'lat',
                        }
                    }}
                    color={{
                        values: '#34781e',
                    }}
                    shape={{
                        values: 'arc3d',
                    }}
                    style={{
                        opacity: 0.8,
                    }}
                    active={{
                        option: {
                            color: 'red',
                        },
                    }}
                    animate={{
                        duration: 4,
                        interval: 0.2,
                        trailLength: 0.3,
                    }}
                />}
                {showHospitals && new_data && <PointLayer
                    source={{
                        new_test_data,
                        parser: {
                            type: "json",
                            x: 'lng',
                            y: 'lat',
                        }
                    }}
                    shape={{
                        values: 'circle',
                    }}
                    color={{
                        values: 'white'
                    }}
                    style={{
                        opacity: 0.8,
                    }}
                    size={{
                        values: 10,
                    }}
                    animate={{
                        option: true,
                    }}
                />}
            </MapboxScene>
        </div>
    );
}