import React from "react";
import RegistForm from "./RegistForm";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[384px]">
        <h1 className="text-center text-[32px] font-bold mt-[40px]">
          이메일로 회원가입
        </h1>
        <RegistForm />
      </div>
    </div>
  );
};

export default page;
