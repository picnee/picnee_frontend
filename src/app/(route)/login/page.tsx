"use client";
import React, { useEffect } from "react";

import Image from "next/image";
import { OAuthType } from "@/app/lib/SocialLoginData";
import OAuthBox from "@/app/(route)/login/_components/OAuthBox";
import { fetchData } from "@/app/lib/axios";

const page = () => {
  const handleClickKakao = () => {
    window.open(
      `http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao`
    );
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5 h-[100vh] w-full">
      {OAuthType.map((item) => (
        <OAuthBox key={item.name} name={item.name}>
          <span className="font-medium w-[120px]">Sign Up {item.name}</span>
          <Image
            src={item.iconSrc}
            alt="loginIcon"
            width={40}
            height={40}
            className="object-cover"
            priority
          />
        </OAuthBox>
      ))}
      <button onClick={handleClickKakao}>kakao</button>
    </div>
  );
};

export default page;
