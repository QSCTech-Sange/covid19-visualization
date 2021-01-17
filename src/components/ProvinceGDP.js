import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from "./ProvinceGDP.json";

export default function ProvinceGDP(props) {
  let [option, SetOption] = useState(undefined);
  const big = props.big ?? "0";
  const size = props.size ?? "0";
  let itemStyle = {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "rgba(0, 0, 0, 0.5)",
  };

  let sizeFunction;
  if (size === "0") {
    sizeFunction = function (x) {
      let y = Math.sqrt(x / 8e4) + 0.1;
      return y * 90;
    };
  } else {
    sizeFunction = function (x) {
      let y = Math.sqrt(x / 5e3) + 0.1;
      return y * 90;
    };
  }

  // Schema:
  let schema = [
    { name: "Primary", index: 0, text: "地区生产总值-第一产业", unit: "亿元" },
    {
      name: "Secondary",
      index: 1,
      text: "地区生产总值-第二产业",
      unit: "亿元",
    },
    { name: "Tertiary", index: 2, text: "地区生产总值-第三产业", unit: "亿元" },
    { name: "Province", index: 3, text: "省份", unit: "" },
  ];

  const initOption = function () {
    const option = {
      backgroundColor:"#242a38",
      baseOption: {
        timeline: {
          axisType: "category",
          orient: "vertical",
          autoPlay: true,
          inverse: true,
          playInterval: 1000,
          left: null,
          right: 0,
          top: 20,
          bottom: 20,
          width: 55,
          height: null,
          label: {
            color: "#999",
          },
          symbol: "none",
          lineStyle: {
            color: "#555",
          },
          checkpointStyle: {
            color: "#bbb",
            borderColor: "#777",
            borderWidth: 2,
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            color: "#666",
            borderColor: "#666",
          },
          emphasis: {
            label: {
              color: "#fff",
            },
            controlStyle: {
              color: "#aaa",
              borderColor: "#aaa",
            },
          },
          data: [],
        },
        backgroundColor: "#242a38",
        title: [
          {
            text: data.timeline[0],
            textAlign: "center",
            left: big === "1" ? "80%" : "70%",
            top: big === "1" ? "80%" : "70%",
            textStyle: {
              fontSize: big === "1" ? 150 : 50,
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          // {
          //   text: "各省份产业结构转变",
          //   left: "center",
          //   top: 10,
          //   textStyle: {
          //     color: "#aaa",
          //     fontWeight: "normal",
          //     fontSize: 20,
          //   },
          // },
        ],
        tooltip: {
          padding: 5,
          backgroundColor: "#222",
          borderColor: "#777",
          borderWidth: 1,
          formatter: function (obj) {
            var value = obj.value;
            return (
              schema[3].text +
              "：" +
              value[3] +
              "<br>" +
              schema[0].text +
              "：" +
              value[0] +
              schema[0].unit +
              "<br>" +
              schema[1].text +
              "：" +
              value[1] +
              schema[1].unit +
              "<br>" +
              schema[2].text +
              "：" +
              value[2] +
              schema[2].unit +
              "<br>"
            );
          },
        },
        grid: {
          top: 100,
          containLabel: true,
          left: 30,
          right: "110",
        },
        xAxis: {
          type: "value",
          name: "第一产业",
          max: 6000,
          min: 1,
          nameGap: 25,
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 18,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          axisLabel: {
            formatter: "{value} 亿元",
          },
        },
        yAxis: {
          type: "value",
          name: "第二产业",
          max: 45000,
          min: 1,
          nameTextStyle: {
            color: "#ccc",
            fontSize: 18,
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: "{value} 亿元",
          },
        },
        visualMap: [
          {
            show: false,
            dimension: 3,
            categories: data.Province,
            calculable: true,
            precision: 0.1,
            textGap: 30,
            textStyle: {
              color: "#ccc",
            },
            inRange: {
              color: (function () {
                let colors = [
                  "#bcd3bb",
                  "#e88f70",
                  "#edc1a5",
                  "#9dc5c8",
                  "#e1e8c8",
                  "#7b7c68",
                  "#e5b5b5",
                  "#f0b489",
                  "#928ea8",
                  "#bda29a",
                  "#bcd378",
                  "#bc8f70",
                  "#7bb468",
                  "#f0b4bb",
                  "#e1e8a5",
                  "#e8c168",
                  "#e8e1d8",
                ];
                return colors.concat(colors);
              })(),
            },
          },
        ],
        series: [
          {
            type: "scatter",
            itemStyle: itemStyle,
            data: data.series[0],
            symbolSize: function (val) {
              return sizeFunction(val[2]);
            },
          },
        ],
        animationDurationUpdate: 1000,
        animationEasingUpdate: "quinticInOut",
      },
      options: [],
    };

    for (let n = 0; n < data.timeline.length; n++) {
      option.baseOption.timeline.data.push(data.timeline[n]);
      option.options.push({
        title: {
          show: true,
          text: data.timeline[n] + "",
        },
        series: {
          name: data.timeline[n],
          type: "scatter",
          itemStyle: itemStyle,
          data: data.series[n],
          symbolSize: function (val) {
            return sizeFunction(val[2]);
          },
        },
      });
    }
    return option;
  };

  useEffect(() => {
    SetOption(initOption());
  }, []);

  return (
    <div className="Province-GDP-comp" style={{ height: "100%" }}>
      {option && (
        <ReactEcharts option={option} style={{ height: "100%" }} />
      )}
    </div>
  );
}
