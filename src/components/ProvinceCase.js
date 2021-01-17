import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import mini from "./ProvinceCaseMini.json";
import large from "./ProvinceCaseLarge.json";

export default function ProvinceCase(props) {
  let [option, SetOption] = useState(undefined);
  const big = props.big ?? "0";
  const initOption = () => ({
    backgroundColor:"#242a38",
    visualMap: {
      type: "continuous",
      min: 0,
      max: 200,
      inRange: {
        color: ["#2D5F73", "#538EA6", "#F2D1B3", "#F2B8A2", "#F28C8C"],
      },
    },
    series: {
      type: "sunburst",
      data: mini,
      label:{
        minAngle:big==="1"?20:40},
      radius: [0, "90%"],
      opacity: 0.7,
      }
  });

  useEffect(() => {
    SetOption(initOption());
  }, []);

  return (
    <div className="province-case-comp" style={{ height: "100%" }}>
      {option && (
        <ReactEcharts option={option} style={{ height: "100%" }} />
      )}
    </div>
  );
}
