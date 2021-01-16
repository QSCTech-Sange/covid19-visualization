import dynamic from "next/dynamic";

// disable ssr on AntV
const MapboxScene = dynamic(() => import("@antv/l7-react/lib/component/MapboxScene"), {ssr: false});
const LineLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.LineLayer), {ssr: false});

import data from './huge_json2.json'

export default function Migration(props) {
    // const data = [
    //     {
    //         lng1: 114.345,
    //         lat1: 31.455,
    //         lng2: 112.345,
    //         lat2: 30.455,
    //         value: 10,
    //     },
    //     {
    //         lng1: 134.345,
    //         lat1: 31.455,
    //         lng2: 132.345,
    //         lat2: 30.455,
    //         value: 10,
    //     },
    //     {
    //         lng1: 132.345,
    //         lat1: 37.455,
    //         lng2: 112.345,
    //         lat2: 30.455,
    //         value: 10,
    //     },
    // ];

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
                {data && <LineLayer
                    source={{
                        data,
                        parser: {
                            type: "json",
                            x: 'lng1',
                            y: 'lat1',
                            x1: 'lng2',
                            y1: 'lat2',
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
            </MapboxScene>
        </div>
    );
}