/** global kakao */
import Script from "next/script";
import Link from "next/link";
import Map from "@/component/Map";
import Markers from "@/component/Markers";
import * as stores from "@/data/store_data.json";
import { useState } from "react";
import StoreBox from "@/component/StoreBox";

export default function Home({ stores }: { stores: any }) {
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
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: {
      stores,
    },
    revalidate: 60 * 60,
  };
}
