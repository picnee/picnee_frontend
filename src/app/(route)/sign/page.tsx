//공통 사용시 파일위치이동
import SignUpForm from "./SignUpForm"



export default function SignPage() {
  return (
    <>

      <div className="flex flex-col w-full h-screen contain items-center  justify-center gap-5">
        <h2>회원 가입 </h2>
        <SignUpForm />
      </div>
    </>
  )
}

