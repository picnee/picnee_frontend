"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircle, FaSquareFull } from "react-icons/fa6";

interface FormValue {
  nickname: string;
  email: string;
  password: string;
  password_confirm: string;
  code: string;
}
const agreeData = [
  { id: "a1", text: "만 14세 이상입니다", required: true, link: "" },
  { id: "a2", text: "이용약관 동의", required: true, link: "" },
  {
    id: "a3",
    text: "개인정보 수집 및 이용 동의",
    required: true,
    link: "",
  },
  { id: "a4", text: "광고성 정보 수신 동의", required: false, link: "" },
];

const RegistForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });
  //   const [passWordCheck, setPassWordCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [lengthValid, setLengthValid] = useState(false); // 길이 유효성
  const [hasNumbers, setHasNumbers] = useState(false); // 숫자 유효성
  const [hasLetters, setHasLetters] = useState(false); // 영어 유효성
  const [hasSpecialChar, setHasSpecialChar] = useState(false); // 특수문자 유효성
  const [agreeCheckList, setAgreeCheckList] = useState<string[]>([]);
  const [isRequired, setIsRequired] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isduplCheck, setIsDuplCheck] = useState(false);
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");
  const onSubmitHandler = () => {};

  const handleChangeAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const checkListArray: string[] = [];
      agreeData.forEach((data) => checkListArray.push(data.id));
      setAgreeCheckList(checkListArray);
      return;
    } else {
      setAgreeCheckList([]);
    }
  };

  const handleChangeAgree = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked) {
      setAgreeCheckList((prev) => [...prev, id]);
    } else {
      setAgreeCheckList(agreeCheckList.filter((el) => el !== id));
    }
  };

  const handleCheckEmail = () => {
    setIsEmailCheck(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    // 길이 조건 체크
    const isLengthValid = password.length >= 8 && password.length <= 16;
    setLengthValid(isLengthValid);

    // 숫자가 포함되어 있는지 체크
    const hasNum = /\d/.test(password);
    setHasNumbers(hasNum);

    // 영어가 포함되어 있는지 체크
    const hasEng = /[a-zA-Z]/.test(password);
    setHasLetters(hasEng);

    // 특수문자가 포함되어 있는지 체크
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setHasSpecialChar(hasSpecial);
  };

  const validateEmail = () => {
    const data = watch("email");
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return pattern.test(data);
  };

  const watchText = (type: string) => {
    switch (type) {
      case "code":
        const code = watch("code");
        if (code && code.length === 6) {
          return "font-semibold text-black";
        }
        return "text-gray-400";
      case "nickname":
        const nickname = watch("nickname");
        if (nickname && nickname.length >= 2 && nickname.length <= 20) {
          return "font-semibold text-black";
        }
        return "text-gray-400";
      default:
        break;
    }
  };

  useEffect(() => {
    const requiredIds = ["a1", "a2", "a3"];
    let value = true;
    for (const id of requiredIds) {
      if (!agreeCheckList.includes(id)) {
        value = false;
        break;
      }
    }
    setIsRequired(value);
  }, [agreeCheckList]);
  const inputStyle =
    "border rounded-sm border-zinc-300 w-[384px] h-[48px] px-6 py-4 ";
  const labelStyle = "mb-2 text-[14px] font-semibold ";

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-16">
      <div className="flex flex-col">
        <label htmlFor="email" className={labelStyle}>
          이메일
        </label>
        <div className="flex justify-between ">
          <input
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            type="email"
            id="email"
            className={`border rounded-sm border-zinc-300 w-[280px] h-[48px] px-6 py-4 ${
              errors.email &&
              errors.email.type === "pattern" &&
              "border-[#ff0000] focus:outline-none"
            }`}
            placeholder="이메일 입력"
            autoComplete="off"
          />
          <button
            onClick={handleCheckEmail}
            disabled={!validateEmail()}
            className={`w-[96px] bg-[#e8e9eb] rounded-sm text-[#B8BFC2] ${
              validateEmail() && "bg-black text-[#ffffff]"
            }`}
          >
            인증하기
          </button>
        </div>
        {errors.email && errors.email.type === "pattern" && (
          <span className="text-[#ff0000] mt-2">
            올바른 이메일 형식이 아닙니다
          </span>
        )}

        {isEmailCheck && (
          <div className="mt-4">
            <div className={`relative`}>
              <input
                {...register("code")}
                type="text"
                placeholder="인증코드 6자리"
                className={`${inputStyle} foucs:outline-none`}
                autoComplete="off"
                maxLength={6}
              />
              <button
                className={` absolute top-1/4 right-4 ${watchText("code")}`}
                onClick={() => alert("인증이 완료되었습니다.")}
              >
                인증하기
              </button>
            </div>
            <div className="flex justify-between items-center text-sm mt-[10px]">
              <span className="text-[#828A8F] tracking-tighter">
                이메일로 받은 인증코드를 입력해주세요.
              </span>
              <span className="text-[#ff0000]">유효시간 {"05:00"}</span>
            </div>
          </div>
        )}
      </div>
      <div className="my-8 flex flex-col">
        <label htmlFor="nickname" className={labelStyle}>
          닉네임
        </label>
        <div className={`relative`}>
          <input
            {...register("nickname", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
            type="text"
            id="nickname"
            className={`${inputStyle}  focus:outline-none ${
              errors.nickname &&
              ["maxLength", "minLength"].includes(errors.nickname.type) &&
              "border-[#ff0000] "
            } ${
              !isduplCheck &&
              watch("nickname")?.length >= 2 &&
              watch("nickname")?.length <= 20 &&
              "border-[#ff0000]"
            }`}
            placeholder="닉네임 입력"
            autoComplete="off"
            maxLength={21}
          />
          <button
            className={` absolute top-1/4 right-4 ${watchText("nickname")}`}
            onClick={() => {
              setIsDuplCheck(true);
              return alert("사용가능한 닉네임 입니다.");
            }}
          >
            중복확인
          </button>
        </div>
        {errors.nickname &&
          ["maxLength", "minLength"].includes(errors.nickname.type) && (
            <span className="text-[#ff0000] mt-2">
              닉네임은 2~20자 사이로 입력해주세요.
            </span>
          )}
        {!isduplCheck &&
          watch("nickname")?.length >= 2 &&
          watch("nickname")?.length <= 20 && (
            <span className="pl-1 mt-2 text-[#ff0000]">
              중복 확인 후 진행해주세요
            </span>
          )}
        {/*  */}
        {/*  */}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className={labelStyle}>
          비밀번호
        </label>
        <input
          {...register("password", {
            required: true,
            maxLength: 16,
            minLength: 8,
            pattern:
              /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
          })}
          type="password"
          id="password"
          className={inputStyle}
          onChange={handlePasswordChange}
          placeholder="비밀번호 입력"
          disabled={!isduplCheck}
        />
        {password && (
          <ul className="flex flex-row gap-2 mt-2 mb-4 pl-1 text-[14px] text-[#828A8F]">
            <li className="flex items-center gap-2">
              {/* D2D5D6 */}
              <FaCircle
                width={18}
                height={18}
                color={`${lengthValid ? "00D900" : "FF0000"}`}
              />
              <span>8~16자</span>
            </li>
            <li className="flex items-center gap-2 ">
              <FaCircle
                width={18}
                height={18}
                color={`${hasLetters ? "00D900" : "FF0000"}`}
              />
              <span>영문</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCircle
                width={18}
                height={18}
                color={`${hasNumbers ? "00D900" : "FF0000"}`}
              />
              <span>숫자</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCircle
                width={18}
                height={18}
                color={`${hasSpecialChar ? "00D900" : "FF0000"}`}
              />
              <span>특수 문자</span>
            </li>
          </ul>
        )}
        <input
          {...register("password_confirm", {
            required: true,
            validate: (value) =>
              value === passwordRef.current || "비밀번호가 일치하지 않습니다.",
          })}
          type="password"
          id="checkPassword"
          className={`${inputStyle} ${!password && "mt-4"}`}
          placeholder="비밀번호 확인"
          disabled={!isduplCheck}
        />
        {errors.password_confirm && (
          <span className="text-[#ff0000] mt-2">
            {errors.password_confirm.message}
          </span>
        )}
      </div>

      <div className="mt-12">
        <h1 className={labelStyle}>약관 동의</h1>
        <div className="rounded-sm px-6 py-4 border">
          <input
            type="checkbox"
            id="allAgree"
            checked={agreeCheckList.length === agreeData.length ? true : false}
            onChange={(e) => handleChangeAllAgree(e)}
          />
          <label
            htmlFor="allAgree"
            className="mb-4 inline-block px-2 font-semibold"
          >
            전체 동의하기
          </label>
          <ul className="flex flex-col gap-4 pt-4 border-t border-zinc-200">
            {agreeData.map((data) => (
              <li key={data.id} className="flex justify-between">
                <div>
                  <input
                    type="checkbox"
                    id={data.id}
                    onChange={(e) => handleChangeAgree(e, data.id)}
                    checked={agreeCheckList.includes(data.id) ? true : false}
                  />
                  <label htmlFor={data.id} className="px-2">
                    {data.text}
                  </label>
                  {data.required ? (
                    <span className="text-[#FF0000]">(필수)</span>
                  ) : (
                    <span className="text-[#B8BFC2]">(선택)</span>
                  )}
                </div>
                <FaSquareFull
                  width={18}
                  height={18}
                  color="E8E9EB"
                  className="cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <input
        className={`mt-6 bg-[#e8e9eb] rounded-sm text-[#B8BFC2] w-full h-[56px] ${
          isRequired && "cursor-pointer bg-black text-[#ffffff]"
        }`}
        type="submit"
        disabled={!isRequired}
        value={"회원가입하기"}
      />
    </form>
  );
};

export default RegistForm;
