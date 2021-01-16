import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import TopTen from "../components/TopTen";
import ProvinceGDP from "../components/ProvinceGDP";
import Migration from "../components/Migration";
import GlobalTrend from "../components/GlobalTrend";

export default function Home() {
    const layout = [
        {i: 'a', x: 0, y: 0, w: 9, h: 20, minH: 20, maxH: 20, minW: 9},
        {i: 'b', x: 10, y: 0, w: 10, h: 20, minH: 20, maxH: 20,},
        {i: 'c', x: 10, y: 10, w: 10, h: 10},
        {i: 'd', x: 10, y: 10, w: 10, h: 10}
    ];

    const style = {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        position: 'absolute'
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        {/*<script src="https://api.map.baidu.com/api?v=2.0&ak=Ydf7D0t1RNspYfkLRvGmOs0BPQrDU4Ar"/>*/}
      </Head>

      <main className={styles.main}>
          <div style={style}>
              <GridLayout className="layout" layout={layout} cols={30} rowHeight={30} width={3000}>
                  <div key="a">
                      <TopTen />
                  </div>
                  <div key="b">
                      <ProvinceGDP />
                  </div>
                  <div key="c">
                      <Migration />
                  </div>
                  <div key="d">
                      <GlobalTrend />
                  </div>
              </GridLayout>
          </div>
      </main>
    </div>
  )
}
