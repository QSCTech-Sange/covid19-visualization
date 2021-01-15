import dynamic from "next/dynamic";

// disable ssr on AntV
const MapboxScene = dynamic(() => import("@antv/l7-react/lib/component/MapboxScene"), { ssr: false });
const LineLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.LineLayer), { ssr: false });

import {useState, useEffect} from "react";

export default function Migration(props) {
    const [geoData, setGeoData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const [data] = await Promise.all([
                fetch(
                    'https://gw.alipayobjects.com/os/rmsportal/UEXQMifxtkQlYfChpPwT.txt',
                ).then((d) => {
                    return d.text()
                }),
            ]);
            console.log(data)
            setGeoData(data)
            console.log(geoData)
        };
        fetchData().then(() => {
            console.log(geoData)
        })
    }, [])

    return (
        <div className="migration">
            <MapboxScene
                option={{}}
                map={{
                    style: 'dark',
                    center: [112, 20],
                    token: 'pk.eyJ1IjoiemVuZ2Nob25nIiwiYSI6ImNrankxejBrMTA0ajYydXA4eXE4YmhnN2MifQ.0NVFgToOPeT5WKKZjC0--A',
                }}
            >
                {geoData !== undefined && <LineLayer
                    source={{
                        geoData,
                        parser: {
                            type: "csv",
                            x: "lng1",
                            y: "lat1",
                            x1: "lng2",
                            y1: "lat2",
                            // size: "value"
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
                />}
            </MapboxScene>
        </div>
    );
}