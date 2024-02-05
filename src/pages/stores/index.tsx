import { useRouter } from "next/router";
import { StoreApiResponse, StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import Loding from "@/component/Loding";
import Link from "next/link";
import Paginnation from "@/component/Paginnation";
import React, { useCallback, useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/component/Loader";

export default function StoreListPage() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const { page = "1" }: any = router.query;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/stores?page=` + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });
    return data;
  };
  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery("stores", fetchStores, {
    getNextPageParam: (lastPage) => {
      return lastPage.data?.length > 0 ? lastPage.page + 1 : undefined;
    },
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.error) {
      console.log("error", res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [hasNextPage, isPageEnd, fetchNext]);

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-200">
        {isLoading ? (
          <Loding />
        ) : (
          <>
            {stores?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((store: StoreType, i: number) => (
                  <li key={i} className="flex justify-between gap-x-6 py-5">
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
                        {store?.phone || "번호없음"} | {store?.foodCertifyName}{" "}
                        | {store?.category}
                      </div>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10 " ref={ref} />
    </div>
  );
}
