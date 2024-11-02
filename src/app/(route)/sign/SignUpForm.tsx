"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FieldValue {
  email: string;
  username: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  isMarketing: boolean;
  isAlarm: boolean;
}


export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValue>();

  const [data, setData] = useState("");
  const SERVER_URL = 'http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080'


  async function submit(data: FieldValue) {
    try {
      const response = await axios.post(`${SERVER_URL}/users`, data);
      console.log(response.data)
      setData(JSON.stringify(response.data));
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다:', error);
      setData(JSON.stringify({ error: '회원가입에 실패했습니다.' }));
    }
  }

  const inputClassName = "w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700"
  const labelClassName = "block text-sm font-medium text-gray-700 mb-2"
  const errorClassName = "mt-1 text-red-500 text-xs"

  return (
    <form onSubmit={handleSubmit((data) => submit(data))}
      className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">회원가입</h2>

      {data && (
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          {data}
        </div>
      )}

      <div className="space-y-1">
        <label className={labelClassName}>이메일</label>
        <input {...register("email", {
          required: '이메일은 필수값입니다.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "올바른 이메일 형식이 아닙니다"
          }
        })}
          type="email"
          placeholder="example@email.com"
          className={inputClassName}
        />
        {errors?.email && <p className={errorClassName}>{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>사용자 이름</label>
        <input {...register("username", { required: '사용자 이름은 필수값입니다.' })}
          type="text"
          placeholder="사용자 이름을 입력하세요"
          className={inputClassName}
        />
        {errors?.username && <p className={errorClassName}>{errors.username.message}</p>}
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>닉네임</label>
        <input {...register("nickname", { required: '닉네임은 필수값입니다.' })}
          type="text"
          placeholder="닉네임을 입력하세요"
          className={inputClassName}
        />
        {errors?.nickname && <p className={errorClassName}>{errors.nickname.message}</p>}
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>비밀번호</label>
        <input {...register("password", {
          required: '비밀번호는 필수값입니다.',
          minLength: { value: 8, message: '비밀번호는 최소 8자 이상이어야 합니다' }
        })}
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={inputClassName}
        />
        {errors?.password && <p className={errorClassName}>{errors.password.message}</p>}
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>전화번호</label>
        <input {...register("phoneNumber", {
          required: '전화번호는 필수값입니다.',
          pattern: {
            value: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
            message: "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)"
          }
        })}
          type="tel"
          placeholder="010-1234-5678"
          className={inputClassName}
        />
        {errors?.phoneNumber && <p className={errorClassName}>{errors.phoneNumber.message}</p>}
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>성별</label>
        <select {...register("gender", { required: '성별은 필수값입니다.' })}
          className={inputClassName}>
          <option value="">선택해주세요</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        {errors?.gender && <p className={errorClassName}>{errors.gender.message}</p>}
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>생년월일</label>
        <input {...register("birthDate", { required: '생일은 필수값입니다.' })}
          type="date"
          className={inputClassName}
        />
        {errors?.birthDate && <p className={errorClassName}>{errors.birthDate.message}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input {...register("isMarketing")}
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            마케팅 정보 수신 동의
          </label>
        </div>

        <div className="flex items-center">
          <input {...register("isAlarm")}
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            알림 수신 동의
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
      >
        가입하기
      </button>
    </form>
  );
}
