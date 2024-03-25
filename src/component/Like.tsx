import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Like() {
  const toggleLike = () => {
    console.log("Like");
  };

  return (
    <button type="button" onClick={toggleLike}>
      {true ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      )}
    </button>
  );
}
