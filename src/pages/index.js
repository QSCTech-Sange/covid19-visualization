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
import { Card } from 'antd';

import 'antd/dist/antd.css';

export default function Home() {
    const layout = [
        {i: 'a', x: 0, y: 0, w: 9, h: 20,},
        {i: 'b', x: 10, y: 0, w: 10, h: 20,},
        {i: 'c', x: 10, y: 10, w: 10, h: 10},
        {i: 'd', x: 10, y: 10, w: 10, h: 10},
        {i: 'e', x: 10, y: 10, w: 10, h: 10}
    ];

    const style = {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: "rgb(22, 21, 24)"
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div style={style}>
              <GridLayout className="layout" layout={layout} cols={30} rowHeight={30} width={3000}>
                  <div key="a">
                      <Card title="世界累计感染人数" extra={<a href="#">More</a>} style={{ height: '100%' }} bodyStyle={{ height: '100%'}}>
                          <p style={{ height: '100%' }}>
                              <TopTen />
                          </p>
                      </Card>
                  </div>
                  <div key="b">
                      <Migration />
                  </div>
                  <div key="c" style={{ height: '100%' }}>
                      <Card title="各省份产业结构转变" extra={<a href="#">More</a>} style={{ height: '100%' }} bodyStyle={{ height: '100%'}}>
                          <p style={{ height: '100%' }}>
                              <ProvinceGDP />
                          </p>
                      </Card>
                  </div>
                  <div key="d">
                      <Card title="全球疫情趋势" extra={<a href="#">More</a>} style={{ height: '100%' }} bodyStyle={{ height: '100%'}}>
                          <p style={{ height: '100%' }}>
                            <GlobalTrend />
                          </p>
                      </Card>
                  </div>
              </GridLayout>
          </div>
      </main>
    </div>
  )
}
