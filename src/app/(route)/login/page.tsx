import React from "react";

import Image from "next/image";
import { OAuthType } from "@/app/lib/SocialLoginData";
import OAuthBox from "@/app/(route)/login/_components/OAuthBox";

const page = () => {
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
    </div>
  );
};

export default page;
