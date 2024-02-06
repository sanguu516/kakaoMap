import { AiOutlineGoogle } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-blue-500 text-center text-3xl font-semibold italic">
          Nextmap
        </div>
        <div className="text-center mt-6 text-2xl font-bold text-gray-600">
          SNS 계정으로 로그인 해 주세요.
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          계정이 없다면 자동으로 회원가입이 진행됩니다.
        </p>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-white flex bg-[#4285F4] gap-2 hover:bg-[#357AE8] font-medium items-center justify-center py-5 rounded-md"
          >
            <AiOutlineGoogle className=" w-6 h-6" />
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            className="text-white flex bg-[#2db400] gap-2 hover:bg-[#2db400] font-medium items-center justify-center py-5 rounded-md"
          >
            <SiNaver className=" w-4 h-4" />
            Sign in with Naver
          </button>
          <button
            type="button"
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
            className="text-white flex bg-yellow-300 gap-2 hover:bg-yellow-300 font-medium items-center justify-center py-5 rounded-md"
          >
            <RiKakaoTalkFill className=" w-6 h-6" />
            Sign in with Kakao
          </button>
        </div>
      </div>
    </div>
  );
}
