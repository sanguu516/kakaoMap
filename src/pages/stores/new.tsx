import AddressSearch from "@/component/AddressSearch";
import { CATECORY_ARR, FOOD_CERTIFY_ARR } from "@/data/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function StoreNewPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8 "
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.post("/api/stores", data);

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
            맛집 등록
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래에 내용을 입력해서 맛집을 등록해주세요
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
          제출하기
        </button>
      </div>
    </form>
  );
}
