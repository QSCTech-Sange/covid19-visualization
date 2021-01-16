import dynamic from "next/dynamic";

// disable ssr on AntV
const MapboxScene = dynamic(() => import("@antv/l7-react/lib/component/MapboxScene"), {ssr: false});
const LineLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.LineLayer), {ssr: false});

export default function Migration(props) {
    const data = [
        {
            id: '1',
            coordinates: [
                [101.953125, 50.51342652633956],
                [119.17968749999999, 33.137551192346145],
            ],
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
                {data && <LineLayer
                    source={{
                        data,
                        parser: {
                            type: "json",
                            coordinates: 'coordinates',
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