import { useRouter } from "next/router";
import { StoreApiResponse, StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import Loding from "@/component/Loding";
import Link from "next/link";
import Paginnation from "@/component/Paginnation";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery(`stores-${page}`, async () => {
    const { data } = await axios(`/api/stores?page=${page}`);
    return data as StoreApiResponse;
  });

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-200">
        {isLoading ? (
          <Loding />
        ) : (
          <>
            {stores?.data?.map((store, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4 ">
                  <Image
                    src={
                      store?.category
                        ? `/images/markers/${store?.category}.png`
                        : "/images/markers/default.png"
                    }
                    width={48}
                    height={48}
                    alt="store"
                  />
                  <div>
                    <div className="text-sm font-semibold leading-6 text-gray-900 ">
                      {store?.name}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.storeType}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <div className="text-sm font-semibold leading-6 text-gray-900">
                    {store?.address}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
                    {store?.category}
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      {stores?.totalPage && (
        <Paginnation total={stores.totalPage} page={page} />
      )}
    </div>
  );
}
