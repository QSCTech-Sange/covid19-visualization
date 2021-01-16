import dynamic from "next/dynamic";
import {useState} from "react";

// disable ssr on AntV
const MapboxScene = dynamic(() => import("@antv/l7-react/lib/component/MapboxScene"), {ssr: false});
const LineLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.LineLayer), {ssr: false});
const PointLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.PointLayer), {ssr: false});

import data from './huge_json2.json'
// import hospitals from './hospital_json.json'

export default function Migration(props) {
    const [showMigrate, setShowMigrate] = useState(false)
    const [showHospitals, setShowHospitals] = useState(true)

    const hospitals = [
        {lng1: 116.395645, lat1: 39.929986, value: 106}
        ]


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
                {showMigrate && hospitals && <LineLayer
                    source={{
                        hospitals,
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
                {showHospitals && hospitals && <PointLayer
                    source={{
                        hospitals,
                        parser: {
                            type: "json",
                            x: 'lng1',
                            y: 'lat1',
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