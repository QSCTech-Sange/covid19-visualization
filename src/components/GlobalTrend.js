import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from './globalTrendNew.json';

export default function GlobalTrend(props) {
  let [option, SetOption] = useState(undefined);

  const initOption = () => ({
    // title: {
    //   text: '全球疫情趋势',
    // },
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
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
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
        yAxisIndex: 1,
      },
    ],
  });

  useEffect(() => {
    SetOption(initOption());
  }, []);

  return (
    <div className="global-trend-comp" style={{ height: '100%' }}>
      {option && (<ReactEcharts 
        option={option}
        style={ props.isTest ?? { height: 'calc(100% - 40px)' }} />)
      }
    </div>
  );
}
