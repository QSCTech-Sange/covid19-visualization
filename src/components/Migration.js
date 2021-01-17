import dynamic from "next/dynamic";
import {useState} from "react";

import {Radio, DatePicker, Space} from 'antd';
const { RangePicker } = DatePicker;

// disable ssr on AntV
const MapboxScene = dynamic(() => import("@antv/l7-react/lib/component/MapboxScene"), {ssr: false});
const LineLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.LineLayer), {ssr: false});
const PointLayer = dynamic(() => import("@antv/l7-react/lib/component/Layer").then((mod) => mod.PointLayer), {ssr: false});
const Popup = dynamic(() => import("@antv/l7-react/lib/component/Popup"), {ssr: false});
const LayerEvent = dynamic(() => import("@antv/l7-react/lib/component/LayerEvent").then((mod) => mod.LayerEvent), {ssr: false});

import data from './huge_json2.json'
import hospitals from './hospital_json.json'

export default function Migration(props) {
    const [showMigrate, setShowMigrate] = useState(false)
    const [showHospitals, setShowHospitals] = useState(true)
    const colors = [
        '#732200',
        '#CC3D00',
        '#FF6619',
        '#FF9466',
        '#FFC1A6',
        '#FCE2D7',
        '#ffffff',
    ].reverse();
    const [popupInfo, setPopupInfo] = useState();
    function showPopup(args) {
        // console.log(args)
        setPopupInfo({
            lnglat: args.lngLat,
            feature: args.feature,
        });
    }

    const onChange = e => {
        // console.log('radio checked', e.target.value);
        switch(e.target.value) {
            case 'a':
                setShowMigrate(false);
                setShowHospitals(true);
                break;
            case 'b':
                setShowMigrate(true);
                setShowHospitals(false);
                break;
        }
    };

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
                <Space direction="vertical" size={12}>
                    <Radio.Group defaultValue="a" size="large" onChange={onChange}>
                        <Radio.Button value="a">全国医院数量分布</Radio.Button>
                        <Radio.Button value="b">全国人口流动情况</Radio.Button>
                    </Radio.Group>
                    {showMigrate && <RangePicker />}
                </Space>
                {showHospitals && popupInfo && (
                    <Popup lnglat={popupInfo.lnglat}>
                        <p style={{ color: 'black' }}>{popupInfo.feature.name}</p>
                        <ul
                            style={{
                                margin: 0,
                                color: 'black'
                            }}
                        >
                            <li>现有医院:{popupInfo.feature.value}</li>
                        </ul>
                    </Popup>
                )}
                {showMigrate && data && <LineLayer
                    source={{
                        data: data,
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
                {showHospitals && hospitals && <PointLayer
                    source={{
                        data: hospitals,
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
                        field: 'value',
                        values: (count) => {
                            return count > 100
                                ? colors[6]
                                : count > 50
                                    ? colors[5]
                                    : count > 25
                                        ? colors[4]
                                        : count > 15
                                            ? colors[3]
                                            : count > 10
                                                ? colors[2]
                                                : count > 5
                                                    ? colors[1]
                                                    : colors[0];
                        },
                    }}
                    style={{
                        opacity: 0.8,
                    }}
                    size={{
                        field: 'value',
                        values: [ 3, 20 ]
                    }}
                >
                    <LayerEvent type="mousemove" handler={showPopup} />
                </PointLayer>}
            </MapboxScene>
        </div>
    );
}