import Head from "next/head";
import {Responsive as ResponsiveGridLayout} from "react-grid-layout";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TopX from "../components/TopX";
import ProvinceGDP from "../components/ProvinceGDP";
import Migration from "../components/Migration";
import GlobalTrend from "../components/GlobalTrend";
import AgePatients from "../components/AgePatients";
import ProvinceCase from "../components/ProvinceCase";
import {Card, PageHeader} from "antd";

import "antd/dist/antd.dark.css";
import styles from "../styles/Home.module.css";

export default function Home() {
    const layout = [
        {i: "a", x: 12, y: 0, w: 10, h: 13},
        {i: "b", x: 0, y: 0, w: 12, h: 19, static: true},
        {i: "c", x: 0, y: 20, w: 8, h: 13},
        {i: "d", x: 8, y: 20, w: 4, h: 13},
        {i: "e", x: 12, y: 13, w: 10, h: 9},
        {i: "f", x: 12, y: 22, w: 10, h: 10},
    ];

    const bodyStyle = {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
    };

    const cardStyle = {
        height: "calc(100% - 55px)",
        background: "#242a38"
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div style={bodyStyle}>
                    <PageHeader
                        className="site-page-header"
                        title="产业结构与人口迁徙"
                        subTitle="新冠疫情潜在影响与次生灾害分析"
                        style={{fontcolor: "white"}}
                    />
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={30}
                        rowHeight={30}
                        width={3000}
                    >
                        <div key="a">
                            <Card
                                title="世界累计感染人数"
                                extra={<a href="/tests/TopX">More</a>}
                                style={{height: "100%"}}
                                bodyStyle={cardStyle}
                            >
                                <p style={{height: "100%"}}>
                                    <TopX/>
                                </p>
                            </Card>
                        </div>
                        <div key="b">
                            <Migration/>
                        </div>
                        <div key="c" style={{height: "100%"}}>
                            <Card
                                title="各省份产业结构转变"
                                extra={<a href="/tests/ProvinceGDP">More</a>}
                                style={{height: "100%"}}
                                bodyStyle={cardStyle}
                            >
                                <p style={{height: "100%"}}>
                                    <ProvinceGDP/>
                                </p>
                            </Card>
                        </div>
                        <div key="d">
                            <Card
                                title="全球疫情趋势"
                                extra={<a href="/tests/GlobalTrend">More</a>}
                                style={{height: "100%"}}
                                bodyStyle={cardStyle}
                            >
                                <p style={{height: "100%"}}>
                                    <GlobalTrend/>
                                </p>
                            </Card>
                        </div>
                        <div key="e">
                            <Card
                                title="患者随时间的年龄段比例"
                                extra={<a href="/tests/AgePatients">More</a>}
                                style={{height: "100%"}}
                                bodyStyle={cardStyle}
                            >
                                <p style={{height: "100%"}}>
                                    <AgePatients/>
                                </p>
                            </Card>
                        </div>
                        <div key="f">
                            <Card
                                title="各地区感染人数"
                                extra={<a href="/tests/ProvinceCase">More</a>}
                                style={{height: "100%"}}
                                bodyStyle={cardStyle}
                            >
                                <p style={{height: "100%"}}>
                                    <ProvinceCase/>
                                </p>
                            </Card>
                        </div>
                    </GridLayout>
                </div>
            </main>
        </div>
    );
}
