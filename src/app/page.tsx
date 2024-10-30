"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  // 사용자 정보
  const { data: session } = useSession();
  // 페이지 이동
  const navigator = useRouter();

  const handleLogin = () => {
    navigator.push("/login");
  };
  return (
    <div>
      {session ? (
        <>
          <p>안녕하세요, {session.user!.name}님!</p>
          <button
            className="border border-black rounded-md p-[5px]"
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          >
            로그아웃
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="border border-black rounded-md p-[5px]"
        >
          로그인하기
        </button>
      )}
    </div>
  );
}
