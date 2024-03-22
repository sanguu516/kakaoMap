import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";
interface AddressProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
}

export default function AddressSearch({
  register,
  errors,
  setValue,
}: AddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("address", fullAddress);
  };
  return (
    <>
      <div className="col-span-full">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3  md:grid-cols-6 gap-6">
            <input
              {...register("address", { required: true })}
              readOnly
              placeholder="주소를 검색해주세요"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              주소검색
            </button>
          </div>
          {errors?.address?.type === "required" && (
            <p className="text-xs text-red-500">주소를 입력해주세요</p>
          )}
        </div>
        {isOpen && <DaumPostcodeEmbed onComplete={handleComplete} />}
      </div>
    </>
  );
}
