"use client";
import React, { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { RegistFormValue } from "./RegistForm";
import RegistErrorMsg from "./RegistErrorMsg";

interface EmailCheckSProps {
  isEmailCheck: string;
  register: UseFormRegister<RegistFormValue>;
  NomalInputStyle: string;
  handleCheckEmail: (step: number) => Promise<void>;
  watchText: (type: string) => string;
  time: number;
  isCounting: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
}
const EmailCheckSection = ({
  isEmailCheck,
  register,
  NomalInputStyle,
  handleCheckEmail,
  watchText,
  time,
  isCounting,
  setTime,
  setIsCounting,
}: EmailCheckSProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCounting && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsCounting(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCounting, time]);

  return (
    <div className="mt-4">
      <div className={`relative`}>
        <input
          {...register("code", {
            required: true,
            maxLength: 6,
            minLength: 6,
          })}
          type="text"
          placeholder="인증코드 6자리"
          className={`${NomalInputStyle} foucs:outline-none ${
            isEmailCheck === "true" && "text-[#D2D5D6] bg-[#F1F3F6]"
          }`}
          autoComplete="off"
          maxLength={6}
          disabled={isEmailCheck === "true"}
        />
        <button
          className={` absolute top-1/4 right-4 ${watchText("code")}`}
          onClick={() => handleCheckEmail(2)}
          disabled={isEmailCheck === "true"}
        >
          인증하기
        </button>
      </div>

      <div className="flex justify-between items-center text-sm mt-[10px]">
        {isEmailCheck === "true" ? (
          <span className="mt-2 text-[#00D900]">인증이 완료되었습니다.</span>
        ) : (
          <>
            <span className="text-[#828A8F] tracking-tighter">
              이메일로 받은 인증코드를 입력해주세요.
            </span>
            <RegistErrorMsg>유효시간 {formatTime(time)}</RegistErrorMsg>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailCheckSection;
