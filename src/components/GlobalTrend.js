import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from './globalTrend.json';

export default function GlobalTrend(props) {
  let [option, SetOption] = useState(undefined);

  const initOption = () => ({
    title: {
      text: '全球疫情趋势',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['累计确诊', '新增确诊'],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom: 30,
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
        // axisLabel: {
        // }
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '人数',
      },
      {
        type: 'value',
        name: '人数',
      },
    ],
    series: [
      {
        name: '累计确诊',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default',
            },
          },
        },
        data: (() => {
          return data.date.map((v, i) => [v, data.acc[i]]);
        })(),
      },
      {
        name: '新增确诊',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default',
            },
          },
        },
        data: (() => {
          return data.date.map((v, i) => [v, data.new[i]]);
        })(),
      },
    ],
  });

  useEffect(() => {
    SetOption(initOption());
  }, []);

  return (
    <div className="global-trend-comp">
      {option && (<ReactEcharts 
        option={option}
        style={{height: props.height ?? 400}} />)
      }
    </div>
  );
}
