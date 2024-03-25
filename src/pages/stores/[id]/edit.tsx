import Loader from "@/component/Loader";
import Map from "@/component/Map";
import { StoreType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import Marker from "@/component/Marker";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AddressSearch from "@/component/AddressSearch";
import { CATECORY_ARR, FOOD_CERTIFY_ARR } from "@/data/store";

export default function StoreEditPage() {
  const [map, setMap] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: store,
    isFetching,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    onSuccess(data) {
      setValue("name", data.name);
      setValue("category", data.category);
      setValue("address", data.address);
      setValue("phone", data.phone);
      setValue("storeType", data.storeType);
      setValue("foodCertifyName", data.foodCertifyName);
      setValue("lat", data.lat);
      setValue("lng", data.lng);
      setValue("id", data.id);
    },
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <Loader />;
  }
  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8 "
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.put("/api/stores", { ...data });

          if (result.status === 200) {
            router.replace(`/stores/${result.data.id}`);
          }
        } catch (e) {
          console.log(e);
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            맛집 수정
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래에 내용을 입력해서 맛집을 수정해주세요
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  autoComplete="가게명 입력"
                  {...register("name", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.name?.type === "required" && (
                  <p className="text-xs text-red-500">가게명을 입력해주세요</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register("category", { required: true })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">선택해주세요</option>
                  {CATECORY_ARR.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors?.category?.type === "required" && (
                  <p className="text-xs text-red-500">
                    카테고리를 선택해주세요
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register("phone", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.phone?.type === "required" && (
                  <p className="text-xs text-red-500">
                    휴대폰 번호를 입력해주세요
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <AddressSearch
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  {...register("foodCertifyName")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>식품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR.map((certify, index) => (
                    <option key={index} value={certify}>
                      {certify}
                    </option>
                  ))}
                </select>
                {errors?.foodCertifyName?.type === "required" && (
                  <p className="text-xs text-red-500">주소를 입력해주세요</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                업종구분
              </label>
              <div className="mt-2">
                <input
                  {...register("storeType", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.storeType?.type === "required" && (
                  <p className="text-xs text-red-500">주소를 입력해주세요</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
