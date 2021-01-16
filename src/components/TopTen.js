import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import data from './all_acc.json';

let countries;
let countryColors;
let length;
let timeTicket;
let i;

export default function TopTen(props) {
  let [option, setOption] = useState(undefined);

  const animationInterval = props.interval ?? 300;

  const getOption = (date, data) => ({
    title: {
      // text: '世界累计感染人数',
      subtext: date,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map(v => v[0]),
      animationDuration: animationInterval,
      animationDurationUpdate: animationInterval,
    },
    series: [
      {
        type: 'bar',
        data: data.map(v => ({
          value: v[1],
          itemStyle: {
            color: v[2],
          },
        })),
        realtimeSort: true,
        seriesLayoutBy: 'column',
        label: {
          normal: {
              show: true,
              textBorderColor: '#333',
              textBorderWidth: 2,
              position: 'right',
          },
        },
      },
    ],
    animationDurationUpdate: animationInterval,
    animtaionEasing: 'linear',
    animationEasingUpdate: 'linear',
  });

  useState(() => {
    try {
      countries = Object.keys(data);
      countryColors = countries.map(() => '#' + Math.random().toString(16).substr(2, 6));
      length = data[countries[0]].length;

      i = 0;
      let dayRank = countries.map((v, j) => [v, data[v][i][1], countryColors[j]]).sort((a, b) => b[1] - a[1]);
      dayRank.shift();
      setOption(getOption(moment(data[countries[0]][i][0]).format('ll'), dayRank.slice(0, 10).reverse()));
      ++i;

      timeTicket = setInterval(() => {
        let dayRank = countries.map((v, j) => [v, data[v][i][1], countryColors[j]]).sort((a, b) => b[1] - a[1]);
        dayRank.shift();
        setOption(getOption(moment(data[countries[0]][i][0]).format('ll'), dayRank.slice(0, 10).reverse()));
        ++i;
        // 后面的数据洗错了，干脆不要了 XD
        if (i === length - 5) {
          clearInterval(timeTicket);
        }
      }, animationInterval);
    }
    catch (e) {}
  }, []);

  return (
    <div className="top-ten-comp" style={{ height: '100%' }}>
      {option &&
        (<ReactEcharts
          option={option}
          style={{ height: 'calc(100% - 40px)' }} />
        )}
    </div>
  )
}