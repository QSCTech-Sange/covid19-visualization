import ReactEcharts from "echarts-for-react";
import {useState} from "react";

export default function Migration(props) {
    let [option, SetOption] = useState(undefined);

    return (
        <div className="migration">
            {option && (
                <ReactEcharts option={option} style={{ height: props.height ?? 400 }} />
            )}
        </div>
    );
}