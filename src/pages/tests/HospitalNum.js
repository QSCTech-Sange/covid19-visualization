import HospitalNum from "components/HospitalNum";
import Head from "next/head";

export default function HospitalNumTest() {
  return (
    <div style={{ height: "1000px" }}>
      <Head>
        <script src="https://api.map.baidu.com/api?v=2.0&ak=Ydf7D0t1RNspYfkLRvGmOs0BPQrDU4Ar"/>
      </Head>
      <HospitalNum />
    </div>
  );
}
