import { currentStoreState, locationState, mapState } from "@/atom";
import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface MarkerProps {
  storeDatas: any;
}
export default function Markers({ storeDatas }: MarkerProps) {
  const map = useRecoilValue(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakaMarkers = useCallback(() => {
    if (map) {
      storeDatas.map((store: any) => {
        const imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(40, 40),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);

        const content = `<div class="infowindow">${store?.name}</div>`;

        // 마커 클릭시 인포윈도우
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });
        // 마우스 오버시 인포윈도우
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        // 선택된 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
          setLocation({
            ...location,
            lat: store.lat,
            lng: store.lng,
          });
        });
      });
    }
  }, [map]);

  useEffect(() => {
    loadKakaMarkers();
  }, [map, loadKakaMarkers]);

  return <></>;
}
