/** global kakao */
import Map from "@/component/Map";
import Markers from "@/component/Markers";
import { useState } from "react";
import StoreBox from "@/component/StoreBox";
import axios from "axios";
import { StoreType } from "@/interface";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        storeDatas={stores}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
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
