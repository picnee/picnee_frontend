"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircle, FaSquareFull } from "react-icons/fa6";

interface FormValue {
  nickname: string;
  email: string;
  password: string;
  password_confirm: string;
  code: string;
  isAge: boolean;
  isUse: boolean;
  isCollection: boolean;
  isMarketing: boolean;
  isAlarm: boolean;
}
const agreeData = [
  { id: "isAge", text: "만 14세 이상입니다", required: true, link: "" },
  { id: "isUse", text: "이용약관 동의", required: true, link: "" },
  {
    id: "isCollection",
    text: "개인정보 수집 및 이용 동의",
    required: true,
    link: "",
  },
  {
    id: "isMarketing",
    text: "광고성 정보 수신 동의",
    required: false,
    link: "",
  },
  {
    id: "isAlarm",
    text: "알람 수신 동의",
    required: false,
    link: "",
  },
];

const labelStyle = "mb-2 text-[14px] font-semibold ";
const NomalInputStyle =
  "rounded-sm w-[384px] h-[48px] px-6 py-4 border border-zinc-300";
const ErrorInputStyle =
  "rounded-sm w-[384px] h-[48px] px-6 py-4 border border-[#ff0000] focus:outline-none";
const RegistForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });
  const [password, setPassword] = useState<string>("");
  const [lengthValid, setLengthValid] = useState(false); // 길이 유효성
  const [hasNumbers, setHasNumbers] = useState(false); // 숫자 유효성
  const [hasLetters, setHasLetters] = useState(false); // 영어 유효성
  const [hasSpecialChar, setHasSpecialChar] = useState(false); // 특수문자 유효성
  const [agreeCheckList, setAgreeCheckList] = useState<string[]>([]);
  const [isRequired, setIsRequired] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState<string>("false");
  const [isduplCheck, setIsDuplCheck] = useState<string>("false");
  const [isMarketing, setIsMarketing] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const nickNameRef = useRef<string | null>(null);
  nickNameRef.current = watch("nickname");

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const onSubmitHandler = async (data: FormValue) => {
    if (isduplCheck === "false" || isduplCheck === "duple") {
      setIsDuplCheck("ing");
      return;
    }
    const submitData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      isMarketing: isMarketing,
      isAlarm: isAlarm,
    };
    try {
      const res = await axios.post(
        "http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/users",
        submitData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const checkListArray: string[] = [];
      agreeData.forEach((data) => checkListArray.push(data.id));
      setAgreeCheckList(checkListArray);
      setIsMarketing(true);
      setIsAlarm(true);
      return;
    } else {
      setAgreeCheckList([]);
    }
  };

  const handleChangeAgree = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    switch (id) {
      case "isMarketing":
        setIsMarketing((prev) => !prev);
        break;
      case "isAlarm":
        setIsAlarm((prev) => !prev);
        break;
      default:
        break;
    }
    if (e.target.checked) {
      setAgreeCheckList((prev) => [...prev, id]);
    } else {
      setAgreeCheckList(agreeCheckList.filter((el) => el !== id));
    }
  };

  const handleCheckEmail = async (step: number) => {
    switch (step) {
      case 1:
        const emailData = watch("email");
        const res = await axios.get(
          "http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/users/email/exists",
          { params: { email: decodeURIComponent(emailData) } }
        );

        if (res.data.exists) {
          return alert("이미 가입된 이메일 입니다");
        } else {
          setIsEmailCheck("ing");
          return alert("이메일로 전송된 인증코드를 입력해주세요");
        }
        break;
      case 2:
        const codeData = watch("code");
        if (codeData && codeData.length !== 6) {
          return alert("인증코드 6자리를 입력해주세요");
        }
        // email 확인 api 호출
        setIsEmailCheck("true");
        return alert("인증이 완료되었습니다.");

      default:
        break;
    }
  };
  // const handleChangeNickName = () => {
  //   if (isduplCheck === "ing" || isduplCheck === "true") {
  //     setIsDuplCheck("false");
  //   }
  // };
  const handleNicknameCheck = async () => {
    // 중복확인 api 호출
    const nickName = watch("nickname");
    const res = await axios.get(
      "http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/users/nickname/exists",
      { params: { nickname: nickName } }
    );
    console.log("res", res.data.exists);
    if (res.data.exists) {
      return setIsDuplCheck("duple");
    } else {
      return setIsDuplCheck("true");
    }
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

  const renderPasswordGuide = () => {
    const passwordGuideArray = [
      { text: "8~16자", isCheck: lengthValid },
      { text: "영문", isCheck: hasLetters },
      { text: "숫자", isCheck: hasNumbers },
      { text: "특수 문자", isCheck: hasSpecialChar },
    ];

    return passwordGuideArray.map((data) => (
      <li className="flex items-center gap-2" key={data.text}>
        {/* D2D5D6 */}
        <FaCircle
          width={18}
          height={18}
          color={`${data.isCheck ? "00D900" : "FF0000"}`}
        />
        <span>{data.text}</span>
      </li>
    ));
  };

  const renderEmailCheckSection = () => {
    if (isEmailCheck === "ing" || isEmailCheck === "true") {
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
              className={`${NomalInputStyle} foucs:outline-none`}
              autoComplete="off"
              maxLength={6}
            />
            <button
              className={` absolute top-1/4 right-4 ${watchText("code")}`}
              onClick={() => handleCheckEmail(2)}
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
      );
    }
  };

  const renderNickNameCheck = (isduplCheck: string) => {
    switch (isduplCheck) {
      case "true":
        return (
          <span className="mt-2 text-[#00D900]">사용 가능한 닉네임입니다.</span>
        );
      case "duple":
        return (
          <span className="mt-2 text-[#FF0000]">사용 중인 닉네임입니다.</span>
        );
      case "ing":
        return (
          isduplCheck === "ing" &&
          watch("nickname")?.length >= 2 &&
          watch("nickname")?.length <= 20 && (
            <span className="pl-1 mt-2 text-[#ff0000]">
              중복여부를 확인해 주세요
            </span>
          )
        );
      default:
        break;
    }
  };

  const renderBorderColor = (section: string) => {
    switch (section) {
      case "nickname":
        if (
          (errors.nickname &&
            ["maxLength", "minLength"].includes(errors.nickname.type)) ||
          isduplCheck === "duple"
        ) {
          return ErrorInputStyle;
        } else {
          return NomalInputStyle;
        }

      case "password":
        if (password.length >= 1) {
          if (lengthValid && hasNumbers && hasLetters && hasSpecialChar) {
            return NomalInputStyle;
          } else {
            return ErrorInputStyle;
          }
        } else {
          return NomalInputStyle;
        }

      case "checkPassword":
        const checkPassword = watch("password_confirm");
        if (
          checkPassword &&
          checkPassword.length >= 2 &&
          errors.password_confirm
        ) {
          return ErrorInputStyle;
        } else {
          return NomalInputStyle;
        }

      default:
        break;
    }
  };

  useEffect(() => {
    let value = true;
    const requiredIds = ["isAge", "isUse", "isCollection"];
    const emailData = watch("email");
    const passWordData = watch("password");
    const nickNameData = watch("nickname");
    for (const id of requiredIds) {
      if (!agreeCheckList.includes(id)) {
        value = false;
        break;
      }
    }

    if (!emailData || !passWordData || !nickNameData) {
      value = false;
      return;
    }

    setIsRequired(value);
  }, [agreeCheckList, watch]);

  useEffect(() => {
    if (isduplCheck === "true") {
      return setIsDuplCheck("false");
    } else if (isduplCheck === "duple") {
      return;
    }
  }, [nickNameRef.current]);

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
              "focus:border-[#ff0000] focus:outline-none"
            }`}
            placeholder="이메일 입력"
            autoComplete="off"
          />
          <button
            onClick={() => handleCheckEmail(1)}
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
        {/*  이메일 중복일 경우
        {isEmailCheck === "duple" && (
          <span className="text-[#ff0000] mt-2">
            이미 가입된 이메일 입니다.
          </span>
        )} 
         */}

        {renderEmailCheckSection()}
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
            className={renderBorderColor("nickname")}
            placeholder="닉네임 입력 (2~20자)"
            autoComplete="off"
            disabled={isEmailCheck !== "true"}
            maxLength={21}
          />
          <input
            type="button"
            className={`absolute top-1/4 right-4 cursor-pointer ${watchText(
              "nickname"
            )}`}
            onClick={handleNicknameCheck}
            value={"중복확인"}
          ></input>
        </div>
        {errors.nickname &&
          ["maxLength", "minLength"].includes(errors.nickname.type) && (
            <span className=" mt-2 text-[#ff0000] ">
              닉네임은 2~20자 사이로 입력해주세요.
            </span>
          )}

        {
          /* 사용가능 or 사용중인 닉네임 일때 나올 텍스트 추가 */
          renderNickNameCheck(isduplCheck)
        }
      </div>
      <div className="flex flex-col gap-4">
        <div>
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
            className={renderBorderColor("password")}
            onChange={handlePasswordChange}
            placeholder="비밀번호 입력"
          />
          {password && (
            <ul className="flex flex-row gap-2 mt-2 mb-4 pl-1 text-[14px] text-[#828A8F]">
              {renderPasswordGuide()}
            </ul>
          )}
        </div>

        <div>
          <input
            {...register("password_confirm", {
              required: true,
              validate: (value) =>
                value === passwordRef.current ||
                "비밀번호가 일치하지 않습니다.",
            })}
            type="password"
            id="checkPassword"
            className={renderBorderColor("checkPassword")}
            placeholder="비밀번호 확인"
            disabled={!password}
          />
          {errors.password_confirm && (
            <span className="text-[#ff0000] mt-2">
              {errors.password_confirm.message}
            </span>
          )}
        </div>
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
