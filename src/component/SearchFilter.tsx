import { searchState } from "@/atom";
import { DISTRICT_ARR } from "@/data/store";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";

interface SearchFilterProps {
  setQ: (value: string) => void;
  setDistrict: (value: string) => void;
}
export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);
  return (
    <div className="flex md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />
        <input
          type="search"
          placeholder="음식점 검색"
          onChange={(e) => setSearch({ ...search, q: e.target.value })}
          className="block w-full p-3 text-sm text-gray-800 border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-200"
        ></input>
      </div>
      <select
        onChange={(e) => setSearch({ ...search, district: e.target.value })}
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg w-full p-3"
      >
        {DISTRICT_ARR.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}
