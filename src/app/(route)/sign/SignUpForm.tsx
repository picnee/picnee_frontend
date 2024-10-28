"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";


interface FieldValue {
  name: string;
  phonenumber: string;
  birth_date: string;
}


export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm<FieldValue>();

  const [data, setData] = useState("");

  function submit(data: FieldValue) {
    setData(JSON.stringify(data))
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit((data) => submit(data))}
      className="flex flex-col gap-10 border-2 p-5">

      <div>
        <input {...register("name",
          {
            required: '이름은 필수값입니다.'
          })}
          placeholder="이름을 입력해주세요"
          className="p-4 border-4 rounded-[10rem] text-blue-800" />
        {errors?.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("phonenumber",
          {
            required: '전화번호를 입력해주세요',
            maxLength: {
              value: 8,
              message: '전화번호는 8자리 이하로 해주세요'
            }
          })
        }
          placeholder="전화번호를 입력해주세요"
          className="p-4 border-4 rounded-[10rem] text-blue-800" />
        {errors?.phonenumber && <p className="text-red-600 text-xs">{errors.phonenumber.message}</p>}
      </div>

      <input {...register("birth_date")}
        placeholder="생일을 입력해주세요"
        className="p-4 border-4 rounded-[10rem] text-blue-800" />
      <p>{data}</p>
      <input type="submit" className="p-4 border-4  text-blue-800" />
    </form >
  );
}
