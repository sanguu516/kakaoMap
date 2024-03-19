/** global kakao */
import Map from "@/component/Map";
import Markers from "@/component/Markers";
import { useState } from "react";
import StoreBox from "@/component/StoreBox";
import axios from "axios";
import { StoreType } from "@/interface";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <>
      <Map />
      <Markers storeDatas={stores} />
      <StoreBox />
    </>
  );
}

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props: {
      stores: stores.data,
    },
    revalidate: 60 * 60,
  };
}
