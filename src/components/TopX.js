import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import moment from "moment";
import data from "./topten.json";

let countries;
let countryColors;
let length;
let timeTicket;
let i;

export default function TopX(props) {
  let [option, setOption] = useState(undefined);

  const animationInterval = props.interval ?? 300;
  const number = props.number ?? 10;

  const getOption = (date, data) => ({
    title: {
      // text: '世界累计感染人数',
      subtext: date,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "#FFF",
        },
      },
    },
    yAxis: {
      type: "category",
      data: data.map((v) => v[0]),
      animationDuration: animationInterval,
      animationDurationUpdate: animationInterval,
      axisLabel: {
        textStyle: {
          color: "#FFF",
        },
      },
    },
    series: [
      {
        type: "bar",
        data: data.map((v) => ({
          value: v[1],
          itemStyle: {
            color: v[2],
          },
        })),
        realtimeSort: true,
        seriesLayoutBy: "column",
        label: {
          normal: {
            show: true,
            textBorderColor: "#333",
            textBorderWidth: 2,
            position: "right",
          },
        },
        itemStyle: { opacity: 0.7 },
      },
    ],
    animationDurationUpdate: animationInterval,
    animtaionEasing: "linear",
    animationEasingUpdate: "linear",
  });

  useState(() => {
    try {
      countries = Object.keys(data);
      countryColors = countries.map(
        () => "#" + Math.random().toString(16).substr(2, 6)
      );
      length = data[countries[0]].length;

      i = 0;
      let dayRank = countries
        .map((v, j) => [v, data[v][i][1], countryColors[j]])
        .sort((a, b) => b[1] - a[1]);
      setOption(
        getOption(
          moment(data[countries[0]][i][0]).format("ll"),
          dayRank.slice(0, number).reverse()
        )
      );
      ++i;

      timeTicket = setInterval(() => {
        let dayRank = countries
          .map((v, j) => [v, data[v][i][1], countryColors[j]])
          .sort((a, b) => b[1] - a[1]);
        setOption(
          getOption(
            moment(data[countries[0]][i][0]).format("ll"),
            dayRank.slice(0, number).reverse()
          )
        );
        ++i;
        if (i === length - 1) {
          clearInterval(timeTicket);
        }
      }, animationInterval);
    } catch (e) {}
  }, []);

  return (
    <div className="top-ten-comp" style={{ height: "100%" }}>
      {option && (
        <ReactEcharts option={option} style={{ height: "calc(100% - 40px)" }} />
      )}
    </div>
  );
}
