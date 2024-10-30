'use client'

export default function LoginPage() {
  const goLoginPage = (provider: string) => {
    window.open(`http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/${provider}`, '_self');
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center h-20 border-b border-[#E8E9EB]">
        <div className="mx-auto w-full max-w-[1200px] px-[120px] flex flex-row gap-5">
          <div className="w-[152px] h-10 bg-[#E8E9EB] flex items-center justify-center">
          </div>
          <span className="text-sm">로그인 및 회원가입</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 mt-[60px] ">
        <h1 className="text-center text-lg mb-[40px]">
          일본 여행을 위한<br />
          리뷰 서비스, 피크니
        </h1>

        {/* Form */}
        <form className="w-full max-w-[393px] space-y-4">
          <input
            type="email"
            placeholder="이메일"
            className="w-full h-[47px] px-4 border border-[#E8E9EB] rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full h-[47px] px-4 border border-[#E8E9EB] rounded-lg focus:outline-none"
          />

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 border border-[#697175] rounded"
            />
            <label htmlFor="remember" className="text-sm text-[#697175]">
              로그인 유지
            </label>
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="w-full h-12 bg-[#E8E9EB] rounded-lg text-black"
          >
            로그인
          </button>

          {/* Find ID/PW */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-[#697175] hover:underline"
            >
              아이디 및 비밀번호 찾기
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-[#E8E9EB]"></div>
            <div className="px-4 text-sm text-[#697175]">또는</div>
            <div className="flex-grow h-px bg-[#E8E9EB]"></div>
          </div>
          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              className="flex h-12 py-[11px] justify-center items-center gap-2.5 w-full text-sm text-[#697175] hover:underline rounded-lg border border-[#E8E9EB]"
            >
              이메일로 회원가입
            </button>
          </div>
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => goLoginPage('kakao')}
              className="w-full h-12 bg-[#E8E9EB] hover:bg-[#FEE500] rounded-lg transition-colors"
            >
              카카오로 계속하기
            </button>
            <button
              type="button"
              onClick={() => goLoginPage('naver')}
              className="w-full h-12 bg-[#E8E9EB] hover:bg-[#03C75A] rounded-lg hover:text-white transition-colors"
            >
              네이버로 계속하기
            </button>
            <button
              type="button"
              onClick={() => goLoginPage('google')}
              className="w-full h-12 bg-[#E8E9EB] hover:bg-[#3367D6] rounded-lg transition-colors hover:text-white"
            >
              구글로 계속하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}