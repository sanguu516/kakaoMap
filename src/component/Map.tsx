/** global kakao */
import Script from "next/script";
import * as stores from "@/data/store_data.json";
import { Dispatch, SetStateAction } from "react";
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
}
const EDFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;
export default function Map({ setMap }: MapProps) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(EDFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />

      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
