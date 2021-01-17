import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from "./AgePatients.json";

export default function AgePatients(props) {
  let [option, SetOption] = useState(undefined);

  const initOption = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#FFF",
          width: 1,
          type: "solid",
        },
      },
    },

    legend: {
      data: ["儿童", "青壮年", "中年", "中老年", "老年"],
      textStyle: {
        color: "#FFF"
      },
    },

    singleAxis: {
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      type: "time",
      axisLabel:{
        textStyle: {
          color: "#FFF"
        },
      },
      axisPointer: {
        animation: true,
        label: {
          show: true,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          opacity: 0.2,
        },
      },
    },

    series: [
      {
        type: "themeRiver",
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "#fff",
          },
        },
        data: data,
        textStyle: {
          color: "#FFF"
        },
      },
    ],
  });

  useEffect(() => {
    SetOption(initOption());
  }, []);

  return (
    <div className="age-patients-comp" style={{ height: '100%' }}>
      {option && (
        <ReactEcharts option={option} style={{ height: 'calc(100% - 40px)'}} />
      )}
    </div>
  );
}
