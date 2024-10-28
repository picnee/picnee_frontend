"use client";

import { signIn } from "next-auth/react";
import React from "react";

const OAuthBox = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div
      className="relative flex items-center border-[1px] border-neutral-300 rounded-md px-5 py-2 hover:bg-neutral-300 hover:text-black transition-colors cursor-pointer"
      onClick={() => signIn(name, { redirect: true, callbackUrl: "/" })}
    >
      {children}
    </div>
  );
};

export default OAuthBox;
