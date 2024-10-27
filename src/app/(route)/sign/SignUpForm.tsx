"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";


interface FieldValue {
  name: string,

}


export default function SignUpForm() {
  const { register, handleSubmit } = useForm<FieldValue>();
  const [data, setData] = useState("");

  function submit(data: FieldValue) {
    setData(JSON.stringify(data))
    console.log(data)
  }
  return (




    <form onSubmit={handleSubmit((data) => submit(data))} className="flex flex-col gap-10">
      <input {...register("name")} placeholder="이름을 입력하세요" className="p-4 border-4 rounded-[10rem] text-blue-800" />
      <input {...register("name")} placeholder="이름을 입력하세요" className="p-4 border-4 rounded-[10rem] text-blue-800" />
      <input {...register("name")} placeholder="이름을 입력하세요" className="p-4 border-4 rounded-[10rem] text-blue-800" />
      <input {...register("name")} placeholder="이름을 입력하세요" className="p-4 border-4 rounded-[10rem] text-blue-800" />



      <p>{data}</p>

      <input type="submit" className="p-4 border-4  text-blue-800" />
    </form >
  );
}
